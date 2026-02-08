const User = require('../models/User')

/**
 * Register a new user
 * @route POST /api/users/register
 * @access Public
 */
const registerUser = async (req, res) => {
  try {
    console.log('Registration request body:', req.body)
    console.log('File info:', req.file)
    
    // Validate file if uploaded
    if (req.file) {
      const allowedExtensions = ['.pdf', '.doc', '.docx']
      const fileExtension = req.file.originalname.toLowerCase().substring(req.file.originalname.lastIndexOf('.'))
      
      if (!allowedExtensions.includes(fileExtension)) {
        return res.status(400).json({
          success: false,
          message: 'Only PDF, DOC, and DOCX files are allowed'
        })
      }
      
      if (req.file.size > 5242880) {
        return res.status(400).json({
          success: false,
          message: 'File size must be less than 5MB'
        })
      }
    }
    
    const { fullName, email, mobileNumber, college, course, currentYear, areaOfInterest, resume } = req.body

    // Parse areaOfInterest if it's a string
    let parsedAreaOfInterest = areaOfInterest
    if (typeof areaOfInterest === 'string') {
      try {
        parsedAreaOfInterest = JSON.parse(areaOfInterest)
      } catch (e) {
        parsedAreaOfInterest = [areaOfInterest]
      }
    }

    // Check if user already exists
    const existingUser = await User.findOne({ 
      email: email.toLowerCase() 
    })
    
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'A user with this email address already exists',
        field: 'email'
      })
    }

    // Check if mobile number already exists
    const existingMobile = await User.findOne({ mobileNumber })
    if (existingMobile) {
      return res.status(409).json({
        success: false,
        message: 'A user with this mobile number already exists',
        field: 'mobileNumber'
      })
    }

    // Create new user
    const user = new User({
      fullName: fullName.trim(),
      email: email.toLowerCase().trim(),
      mobileNumber: mobileNumber.trim(),
      college: college.trim(),
      course: course.trim(),
      currentYear,
      areaOfInterest: parsedAreaOfInterest,
      resume
    })

    // Save user to database
    const savedUser = await user.save()

    // Log successful registration
    console.log(`New user registered: ${savedUser.email} from ${savedUser.college}`)

    // Return success response
    res.status(201).json({
      success: true,
      message: 'Registration successful! Welcome to Cloud Krishna Community.',
      data: {
        id: savedUser._id,
        fullName: savedUser.fullName,
        email: savedUser.email,
        college: savedUser.college,
        course: savedUser.course,
        currentYear: savedUser.currentYear,
        areaOfInterest: savedUser.areaOfInterest,
        registeredAt: savedUser.registeredAt
      }
    })

  } catch (error) {
    console.error('Registration error:', error)

    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => ({
        field: err.path,
        message: err.message
      }))
      
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors
      })
    }

    // Handle duplicate key errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0]
      return res.status(409).json({
        success: false,
        message: `A user with this ${field} already exists`,
        field: field
      })
    }

    // Handle other errors
    res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.'
    })
  }
}

/**
 * Get registration statistics
 * @route GET /api/users/stats
 * @access Public
 */
const getRegistrationStats = async (req, res) => {
  try {
    const [
      totalUsers,
      usersByYear,
      usersByInterest,
      usersByCourse,
      recentRegistrations
    ] = await Promise.all([
      User.countDocuments(),
      User.aggregate([
        { $group: { _id: '$currentYear', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]),
      User.aggregate([
        { $unwind: '$areaOfInterest' },
        { $group: { _id: '$areaOfInterest', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 }
      ]),
      User.aggregate([
        { $group: { _id: '$course', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 }
      ]),
      User.find({}, 'fullName college registeredAt')
        .sort({ registeredAt: -1 })
        .limit(5)
    ])

    res.json({
      success: true,
      data: {
        totalUsers,
        usersByYear,
        usersByInterest,
        usersByCourse,
        recentRegistrations
      }
    })
  } catch (error) {
    console.error('Stats error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch registration statistics'
    })
  }
}

/**
 * Download user resume
 * @route GET /api/users/resume/:userId
 * @access Public (should be protected in production)
 */
const downloadResume = async (req, res) => {
  try {
    const { userId } = req.params

    // Validate userId format
    if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID format'
      })
    }

    const user = await User.findById(userId)
    console.log('User found:', user ? 'Yes' : 'No')
    console.log('Resume data:', user?.resume)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    if (!user.resume || !user.resume.azureUrl) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found for this user'
      })
    }

    // If it's an Azure URL, return the URL for direct access
    if (user.resume.azureUrl.startsWith('https://')) {
      console.log('Returning Azure URL:', user.resume.azureUrl)
      return res.json({
        success: true,
        downloadUrl: user.resume.azureUrl,
        fileName: user.resume.originalName || user.resume.fileName
      })
    }
    
    // If it's a data URL (fallback), serve it directly
    if (user.resume.azureUrl.startsWith('data:')) {
      const base64Data = user.resume.azureUrl.split(',')[1]
      const buffer = Buffer.from(base64Data, 'base64')
      
      res.set({
        'Content-Type': user.resume.fileType,
        'Content-Disposition': `attachment; filename=\"${user.fullName}_resume_${user.resume.originalName}\"`,
        'Content-Length': buffer.length,
        'Cache-Control': 'no-cache'
      })
      
      return res.send(buffer)
    }

    return res.status(500).json({
      success: false,
      message: 'Invalid resume URL format'
    })

  } catch (error) {
    console.error('Resume download error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to download resume'
    })
  }
}

/**
 * Get user profile (for future use)
 * @route GET /api/users/profile/:userId
 * @access Public (should be protected in production)
 */
const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params

    if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID format'
      })
    }

    const user = await User.findById(userId, '-resume.fileData') // Exclude file data for performance
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    res.json({
      success: true,
      data: user
    })
  } catch (error) {
    console.error('Get profile error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user profile'
    })
  }
}

/**
 * Get all users for admin dashboard
 * @route GET /api/users
 * @access Public (should be protected in production)
 */
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, {
      fullName: 1,
      email: 1,
      mobileNumber: 1,
      college: 1,
      course: 1,
      currentYear: 1,
      areaOfInterest: 1,
      registeredAt: 1,
      'resume.fileName': 1,
      'resume.originalName': 1,
      'resume.azureUrl': 1,
      'resume.fileType': 1,
      'resume.fileSize': 1
    }).sort({ registeredAt: -1 })

    res.json({
      success: true,
      data: users
    })
  } catch (error) {
    console.error('Get all users error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users'
    })
  }
}

module.exports = {
  registerUser,
  getRegistrationStats,
  downloadResume,
  getUserProfile,
  getAllUsers
}
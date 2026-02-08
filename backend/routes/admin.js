const express = require('express')
const User = require('../models/User')
const Admin = require('../models/Admin')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const router = express.Router()

// Default admin credentials (fallback)
const DEFAULT_ADMIN = {
  username: 'admin',
  password: 'admin123'
}

// Middleware to verify admin token
const verifyAdminToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '')
  
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No token provided.'
    })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret')
    req.admin = decoded
    next()
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid token.'
    })
  }
}

// @route   POST /api/admin/register
// @desc    Register a new admin
// @access  Public (in production, make this protected)
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, fullName } = req.body
    
    console.log('Admin registration attempt:', { username, email, fullName })

    // Validate required fields
    if (!username || !email || !password || !fullName) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      })
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({
      $or: [{ username }, { email }]
    })

    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: 'Admin with this username or email already exists'
      })
    }

    // Create new admin
    const admin = new Admin({
      username,
      email,
      password,
      fullName
    })

    await admin.save()

    console.log('Admin registered successfully:', username)

    res.status(201).json({
      success: true,
      message: 'Admin registered successfully',
      data: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        fullName: admin.fullName
      }
    })

  } catch (error) {
    console.error('Admin registration error:', error)
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message)
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      })
    }

    res.status(500).json({
      success: false,
      message: 'Server error during registration'
    })
  }
})

// @route   POST /api/admin/login
// @desc    Admin login
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body
    
    console.log('Login attempt:', { username })

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required'
      })
    }

    // First check database for registered admin
    const admin = await Admin.findOne({ username })
    
    if (admin && admin.isActive) {
      const isValidPassword = await admin.comparePassword(password)
      
      if (isValidPassword) {
        // Update last login
        admin.lastLogin = new Date()
        await admin.save()
        
        // Generate JWT token
        const token = jwt.sign(
          { 
            id: admin._id,
            username: admin.username, 
            email: admin.email,
            role: admin.role 
          },
          process.env.JWT_SECRET || 'fallback-secret',
          { expiresIn: '24h' }
        )

        console.log('Database admin login successful:', username)

        return res.json({
          success: true,
          message: 'Login successful',
          token: token,
          admin: {
            username: admin.username,
            email: admin.email,
            fullName: admin.fullName,
            role: admin.role
          }
        })
      }
    }

    // Fallback to default admin credentials
    if (username === DEFAULT_ADMIN.username && password === DEFAULT_ADMIN.password) {
      const token = jwt.sign(
        { 
          username: username, 
          role: 'admin',
          isDefault: true
        },
        process.env.JWT_SECRET || 'fallback-secret',
        { expiresIn: '24h' }
      )

      console.log('Default admin login successful:', username)

      return res.json({
        success: true,
        message: 'Login successful (Demo Account)',
        token: token,
        admin: {
          username: username,
          fullName: 'Demo Admin',
          role: 'admin',
          isDefault: true
        }
      })
    }

    // Invalid credentials
    console.log('Invalid credentials for:', username)
    res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    })

  } catch (error) {
    console.error('Admin login error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
})

// @route   GET /api/admin/users
// @desc    Get all registered users
// @access  Private (Admin only)
router.get('/users', verifyAdminToken, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const search = req.query.search || ''

    // Build search query
    let searchQuery = {}
    if (search) {
      searchQuery = {
        $or: [
          { fullName: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { college: { $regex: search, $options: 'i' } },
          { course: { $regex: search, $options: 'i' } }
        ]
      }
    }

    const users = await User.find(searchQuery, '-resume.fileData')
      .sort({ registeredAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)

    const total = await User.countDocuments(searchQuery)

    res.json({
      success: true,
      data: {
        users,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total
        }
      }
    })

  } catch (error) {
    console.error('Get users error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users'
    })
  }
})

// @route   GET /api/admin/users/:id
// @desc    Get single user details
// @access  Private (Admin only)
router.get('/users/:id', verifyAdminToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    
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
    console.error('Get user error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user'
    })
  }
})

// @route   DELETE /api/admin/users/:id
// @desc    Delete a user
// @access  Private (Admin only)
router.delete('/users/:id', verifyAdminToken, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    res.json({
      success: true,
      message: 'User deleted successfully'
    })

  } catch (error) {
    console.error('Delete user error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to delete user'
    })
  }
})

// @route   GET /api/admin/dashboard-stats
// @desc    Get dashboard statistics
// @access  Private (Admin only)
router.get('/dashboard-stats', verifyAdminToken, async (req, res) => {
  try {
    const [
      totalUsers,
      todayRegistrations,
      usersByYear,
      usersByInterest,
      recentUsers
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({
        registeredAt: {
          $gte: new Date(new Date().setHours(0, 0, 0, 0))
        }
      }),
      User.aggregate([
        { $group: { _id: '$currentYear', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]),
      User.aggregate([
        { $unwind: '$areaOfInterest' },
        { $group: { _id: '$areaOfInterest', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 }
      ]),
      User.find({}, 'fullName email college registeredAt')
        .sort({ registeredAt: -1 })
        .limit(5)
    ])

    res.json({
      success: true,
      data: {
        totalUsers,
        todayRegistrations,
        usersByYear,
        usersByInterest,
        recentUsers
      }
    })

  } catch (error) {
    console.error('Dashboard stats error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard statistics'
    })
  }
})

// @route   GET /api/admin/export-users
// @desc    Export users data as CSV
// @access  Private (Admin only)
router.get('/export-users', verifyAdminToken, async (req, res) => {
  try {
    const users = await User.find({}, '-resume.fileData')

    // Convert to CSV format
    const csvHeader = 'Name,Email,Mobile,College,Course,Year,Interests,Registered Date\n'
    const csvData = users.map(user => {
      return [
        user.fullName,
        user.email,
        user.mobileNumber,
        user.college,
        user.course,
        user.currentYear,
        user.areaOfInterest.join('; '),
        user.registeredAt.toISOString().split('T')[0]
      ].join(',')
    }).join('\n')

    res.setHeader('Content-Type', 'text/csv')
    res.setHeader('Content-Disposition', 'attachment; filename=users-export.csv')
    res.send(csvHeader + csvData)

  } catch (error) {
    console.error('Export users error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to export users'
    })
  }
})

module.exports = router
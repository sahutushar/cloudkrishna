const { sanitizeUserData } = require('../utils/sanitizer')
const { validateResumeFile, validateMobileNumber, validateEmail } = require('../utils/fileValidator')

/**
 * Validation middleware for user registration
 */
const validateUserRegistration = (req, res, next) => {
  try {
    // Sanitize input data first
    const sanitizedData = sanitizeUserData(req.body)
    req.body = sanitizedData

    const errors = []
    const { fullName, email, mobileNumber, college, course, currentYear, areaOfInterest, resume } = req.body

    // Validate required fields
    if (!fullName || fullName.trim().length === 0) {
      errors.push({ field: 'fullName', message: 'Full name is required' })
    } else if (fullName.length > 100) {
      errors.push({ field: 'fullName', message: 'Full name cannot exceed 100 characters' })
    }

    // Email validation
    if (!email || email.trim().length === 0) {
      errors.push({ field: 'email', message: 'Email is required' })
    } else if (!validateEmail(email)) {
      errors.push({ field: 'email', message: 'Please provide a valid email address' })
    }

    // Mobile number validation
    if (!mobileNumber || mobileNumber.trim().length === 0) {
      errors.push({ field: 'mobileNumber', message: 'Mobile number is required' })
    } else if (!validateMobileNumber(mobileNumber)) {
      errors.push({ field: 'mobileNumber', message: 'Please provide a valid 10-digit mobile number starting with 6-9' })
    }

    // College validation
    if (!college || college.trim().length === 0) {
      errors.push({ field: 'college', message: 'College name is required' })
    } else if (college.length > 200) {
      errors.push({ field: 'college', message: 'College name cannot exceed 200 characters' })
    }

    // Course validation
    if (!course || course.trim().length === 0) {
      errors.push({ field: 'course', message: 'Course is required' })
    } else if (course.length > 100) {
      errors.push({ field: 'course', message: 'Course name cannot exceed 100 characters' })
    }

    // Current year validation
    const validYears = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Final Year', 'Graduated']
    if (!currentYear) {
      errors.push({ field: 'currentYear', message: 'Current year is required' })
    } else if (!validYears.includes(currentYear)) {
      errors.push({ field: 'currentYear', message: 'Please select a valid year' })
    }

    // Area of interest validation
    const validInterests = [
      'Cloud Computing', 'Web Development', 'Mobile Development', 'Data Science',
      'Machine Learning', 'AI', 'Cybersecurity', 'DevOps', 'Blockchain',
      'IoT', 'Game Development', 'UI/UX Design', 'Digital Marketing'
    ]
    
    if (!areaOfInterest || !Array.isArray(areaOfInterest) || areaOfInterest.length === 0) {
      errors.push({ field: 'areaOfInterest', message: 'Please select at least one area of interest' })
    } else {
      const invalidInterests = areaOfInterest.filter(interest => !validInterests.includes(interest))
      if (invalidInterests.length > 0) {
        errors.push({ field: 'areaOfInterest', message: 'Invalid area of interest selected' })
      }
    }

    // Resume validation
    if (!resume) {
      errors.push({ field: 'resume', message: 'Resume is required' })
    } else {
      const resumeErrors = validateResumeFile(resume)
      resumeErrors.forEach(error => {
        errors.push({ field: 'resume', message: error })
      })
    }

    // If validation errors exist, return them
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors
      })
    }

    // Validation passed, continue to next middleware
    next()
  } catch (error) {
    console.error('Validation middleware error:', error)
    return res.status(500).json({
      success: false,
      message: 'Server error during validation'
    })
  }
}

/**
 * Rate limiting middleware (basic implementation)
 */
const rateLimitMiddleware = (req, res, next) => {
  // In production, use redis-based rate limiting
  // This is a basic in-memory implementation
  const ip = req.ip || req.connection.remoteAddress
  const now = Date.now()
  const windowMs = 15 * 60 * 1000 // 15 minutes
  const maxRequests = 5 // Max 5 registration attempts per 15 minutes

  if (!global.rateLimitStore) {
    global.rateLimitStore = new Map()
  }

  const userRequests = global.rateLimitStore.get(ip) || []
  const recentRequests = userRequests.filter(timestamp => now - timestamp < windowMs)

  if (recentRequests.length >= maxRequests) {
    return res.status(429).json({
      success: false,
      message: 'Too many registration attempts. Please try again later.'
    })
  }

  recentRequests.push(now)
  global.rateLimitStore.set(ip, recentRequests)
  next()
}

module.exports = {
  validateUserRegistration,
  rateLimitMiddleware
}
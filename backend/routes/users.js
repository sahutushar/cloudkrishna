const express = require('express')
const { validateUserRegistration, rateLimitMiddleware } = require('../middleware/validation')
const { uploadMiddleware } = require('../middleware/azureUpload')
const {
  registerUser,
  getRegistrationStats,
  downloadResume,
  getUserProfile,
  getAllUsers
} = require('../controllers/userController')

const router = express.Router()

// @route   POST /api/users/register
// @desc    Register a new user with file upload to Azure
// @access  Public
router.post('/register', 
  rateLimitMiddleware,
  ...uploadMiddleware, // Azure upload middleware processes file first
  registerUser // Remove validation middleware since it conflicts with file processing
)

// @route   GET /api/users
// @desc    Get all users for admin dashboard
// @access  Public (should be protected in production)
router.get('/', getAllUsers)

// @route   GET /api/users/stats
// @desc    Get registration statistics
// @access  Public
router.get('/stats', getRegistrationStats)

// @route   GET /api/users/resume/:userId
// @desc    Download user resume
// @access  Public (should be protected in production)
router.get('/resume/:userId', downloadResume)

// @route   GET /api/users/profile/:userId
// @desc    Get user profile
// @access  Public (should be protected in production)
router.get('/profile/:userId', getUserProfile)

module.exports = router
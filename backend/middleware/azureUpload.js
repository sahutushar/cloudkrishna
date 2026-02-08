const multer = require('multer')
const azureStorage = require('../config/azureStorage')

/**
 * Memory storage for Azure upload
 */
const storage = multer.memoryStorage()

/**
 * File filter for security validation
 */
const fileFilter = (req, file, cb) => {
  console.log('File upload attempt:', {
    originalname: file.originalname,
    mimetype: file.mimetype,
    size: file.size
  })
  
  // Accept all files, validate in controller
  cb(null, true)
}

/**
 * Multer configuration with security limits
 */
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 1, // Only one file allowed
    fields: 20, // Limit number of form fields
    fieldSize: 1024 * 1024 // 1MB per field
  }
})

/**
 * Error handling middleware for multer
 */
const handleMulterError = (error, req, res, next) => {
  console.log('Multer error:', error.message)
  
  if (error instanceof multer.MulterError) {
    switch (error.code) {
      case 'LIMIT_FILE_SIZE':
        return res.status(400).json({
          success: false,
          message: 'File size too large. Maximum size is 5MB.'
        })
      case 'LIMIT_FILE_COUNT':
        return res.status(400).json({
          success: false,
          message: 'Too many files. Only one resume file is allowed.'
        })
      case 'LIMIT_UNEXPECTED_FILE':
        return res.status(400).json({
          success: false,
          message: 'Unexpected file field.'
        })
      default:
        return res.status(400).json({
          success: false,
          message: 'File upload error: ' + error.message
        })
    }
  }
  
  next(error)
}

/**
 * Middleware to upload file to Azure and process data
 */
const processAzureUpload = async (req, res, next) => {
  if (req.file) {
    try {
      if (azureStorage.isConfigured()) {
        // Upload to Azure Blob Storage
        const uploadResult = await azureStorage.uploadFile(req.file, req.file.originalname)
        
        // Add file data to request body for database storage
        req.body.resume = {
          fileName: uploadResult.fileName,
          originalName: req.file.originalname,
          azureUrl: uploadResult.url,
          fileType: req.file.mimetype,
          fileSize: req.file.size
        }
        
        console.log(`✅ File uploaded to Azure: ${uploadResult.fileName}`)
      } else {
        // Fallback to base64 storage if Azure not configured
        const base64Data = req.file.buffer.toString('base64')
        
        req.body.resume = {
          fileName: req.file.originalname,
          originalName: req.file.originalname,
          azureUrl: `data:${req.file.mimetype};base64,${base64Data}`, // Store as data URL
          fileType: req.file.mimetype,
          fileSize: req.file.size
        }
        
        console.log('⚠️  Azure not configured, using base64 storage')
      }
    } catch (error) {
      console.error('File upload error:', error)
      return res.status(500).json({
        success: false,
        message: 'Error uploading file: ' + error.message
      })
    }
  }
  
  next()
}

/**
 * Complete upload middleware chain
 */
const uploadMiddleware = [
  upload.single('resume'),
  handleMulterError,
  processAzureUpload
]

module.exports = {
  upload,
  uploadMiddleware,
  handleMulterError,
  processAzureUpload,
  azureStorage
}
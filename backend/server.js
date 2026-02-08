const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const helmet = require('helmet')
const fs = require('fs')
const path = require('path')
require('dotenv').config()

const logger = require('./config/logger')
const validateEnv = require('./config/validateEnv')
const connectDB = require('./config/database')
const userRoutes = require('./routes/users')
const adminRoutes = require('./routes/admin')
const errorHandler = require('./middleware/errorHandler')

// Create logs directory if it doesn't exist
const logDir = path.join(__dirname, 'logs')
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir)
}

// Validate environment variables
validateEnv()

const app = express()

// Security middleware
app.use(helmet({
  crossOriginEmbedderPolicy: false // Allow file uploads
}))

// CORS configuration - restrict to specific origins in production
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://yourdomain.com'] // Replace with your production domain
    : ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:3001'], // Added admin dashboard port
  credentials: true,
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

// Body parser middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Database connection check middleware
const checkDatabaseConnection = (req, res, next) => {
  if (!mongoose.connection.readyState) {
    return res.status(503).json({
      success: false,
      message: 'Database not connected. Please check MongoDB Atlas configuration.',
      error: 'SERVICE_UNAVAILABLE'
    })
  }
  next()
}

// Routes
app.use('/api/users', checkDatabaseConnection, userRoutes)
app.use('/api/admin', checkDatabaseConnection, adminRoutes)

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Cloud Krishna API is running',
    timestamp: new Date().toISOString()
  })
})

// Error handling middleware
app.use(errorHandler)

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  })
})

// Start server with proper error handling
const PORT = process.env.PORT || 5555

const startServer = async () => {
  try {
    await connectDB()
    logger.info('Database connected successfully')
    console.log('✅ Database connected successfully')
  } catch (error) {
    logger.error('Failed to connect to database:', error)
    console.error('❌ Failed to connect to database:', error.message)
    
    if (process.env.NODE_ENV === 'production') {
      logger.error('Server cannot start without database connection in production')
      console.error('❌ Server cannot start without database connection in production')
      process.exit(1)
    } else {
      logger.warn('Starting server without database connection (development mode)')
      console.warn('⚠️  Starting server without database connection (development mode)')
      console.warn('⚠️  Please fix MongoDB Atlas IP whitelist to enable database features')
    }
  }
  
  const server = app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`)
    logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`)
    console.log(`\n🚀 Server running on port ${PORT}`)
    console.log(`📦 Environment: ${process.env.NODE_ENV || 'development'}`)
    console.log(`🌐 CORS enabled for: ${corsOptions.origin}\n`)
    
    if (!mongoose.connection.readyState) {
      console.log('⚠️  Database not connected - some features may not work')
    }
  })

  // Graceful shutdown
  process.on('SIGTERM', () => {
    logger.info('SIGTERM received, shutting down gracefully')
    console.log('\n🛑 SIGTERM received, shutting down gracefully')
    server.close(() => {
      if (mongoose.connection.readyState) {
        mongoose.connection.close()
      }
      logger.info('Server shut down complete')
      process.exit(0)
    })
  })
}

startServer()

module.exports = app
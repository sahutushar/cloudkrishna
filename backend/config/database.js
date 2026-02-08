const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    // Validate MongoDB URI
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is required')
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI)

    console.log(`MongoDB Connected: ${conn.connection.host}`)
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err)
    })

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected')
    })

    return conn
  } catch (error) {
    console.error('Database connection failed:', error.message)
    throw error
  }
}

module.exports = connectDB
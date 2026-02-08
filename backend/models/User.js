const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    maxlength: [100, 'Full name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  mobileNumber: {
    type: String,
    required: [true, 'Mobile number is required'],
    trim: true,
    match: [/^[6-9]\d{9}$/, 'Please provide a valid 10-digit mobile number']
  },
  college: {
    type: String,
    required: [true, 'College name is required'],
    trim: true,
    maxlength: [200, 'College name cannot exceed 200 characters']
  },
  course: {
    type: String,
    required: [true, 'Course is required'],
    trim: true,
    maxlength: [100, 'Course name cannot exceed 100 characters']
  },
  currentYear: {
    type: String,
    required: [true, 'Current year is required'],
    enum: ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Final Year', 'Graduated']
  },
  areaOfInterest: [{
    type: String,
    enum: ['Cloud Computing', 'Web Development', 'Mobile Development', 'Data Science', 
           'Machine Learning', 'AI', 'Cybersecurity', 'DevOps', 'Blockchain', 
           'IoT', 'Game Development', 'UI/UX Design', 'Digital Marketing']
  }],
  resume: {
    fileName: {
      type: String,
      required: [true, 'Resume file name is required']
    },
    originalName: {
      type: String,
      required: [true, 'Original file name is required']
    },
    azureUrl: {
      type: String,
      required: [true, 'Azure storage URL is required']
    },
    fileType: {
      type: String,
      required: [true, 'Resume file type is required'],
      enum: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    },
    fileSize: {
      type: Number,
      required: [true, 'Resume file size is required'],
      max: [5242880, 'Resume file size cannot exceed 5MB']
    },
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  },
  registeredAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('User', userSchema)
const validateResumeFile = (resume) => {
  const errors = []
  
  if (!resume || typeof resume !== 'object') {
    errors.push('Resume file is required')
    return errors
  }
  
  if (!resume.fileName) errors.push('Resume file name is required')
  if (!resume.originalName) errors.push('Original file name is required')
  if (!resume.azureUrl) errors.push('Resume file URL is required')
  if (!resume.fileType) errors.push('Resume file type is required')
  if (!resume.fileSize) errors.push('Resume file size is required')
  
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]
  
  if (resume.fileType && !allowedTypes.includes(resume.fileType)) {
    errors.push('Only PDF, DOC, and DOCX files are allowed')
  }
  
  if (resume.fileSize && resume.fileSize > 5242880) {
    errors.push('Resume file size cannot exceed 5MB')
  }
  
  return errors
}

const validateMobileNumber = (mobileNumber) => {
  if (!mobileNumber) return false
  const mobileRegex = /^[6-9]\d{9}$/
  return mobileRegex.test(mobileNumber.toString())
}

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

module.exports = {
  validateResumeFile,
  validateMobileNumber,
  validateEmail
}
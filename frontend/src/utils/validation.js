/**
 * Frontend validation utilities
 * These provide immediate feedback to users but should never replace backend validation
 */

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {Object} Validation result
 */
export const validateEmail = (email) => {
  if (!email || email.trim().length === 0) {
    return { isValid: false, message: 'Email is required' }
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { isValid: false, message: 'Please enter a valid email address' }
  }
  
  if (email.length > 254) {
    return { isValid: false, message: 'Email address is too long' }
  }
  
  return { isValid: true, message: '' }
}

/**
 * Validate mobile number
 * @param {string} mobile - Mobile number to validate
 * @returns {Object} Validation result
 */
export const validateMobile = (mobile) => {
  if (!mobile || mobile.trim().length === 0) {
    return { isValid: false, message: 'Mobile number is required' }
  }
  
  // Remove all non-digit characters for validation
  const cleanMobile = mobile.replace(/\D/g, '')
  
  if (cleanMobile.length !== 10) {
    return { isValid: false, message: 'Mobile number must be exactly 10 digits' }
  }
  
  // Check if it starts with valid digits (6-9 for Indian numbers)
  if (!/^[6-9]/.test(cleanMobile)) {
    return { isValid: false, message: 'Mobile number must start with 6, 7, 8, or 9' }
  }
  
  return { isValid: true, message: '' }
}

/**
 * Validate full name
 * @param {string} name - Name to validate
 * @returns {Object} Validation result
 */
export const validateFullName = (name) => {
  if (!name || name.trim().length === 0) {
    return { isValid: false, message: 'Full name is required' }
  }
  
  if (name.trim().length < 2) {
    return { isValid: false, message: 'Full name must be at least 2 characters' }
  }
  
  if (name.length > 100) {
    return { isValid: false, message: 'Full name cannot exceed 100 characters' }
  }
  
  // Check for valid characters (letters, spaces, hyphens, apostrophes)
  const nameRegex = /^[a-zA-Z\s'-]+$/
  if (!nameRegex.test(name)) {
    return { isValid: false, message: 'Full name can only contain letters, spaces, hyphens, and apostrophes' }
  }
  
  return { isValid: true, message: '' }
}

/**
 * Validate college name
 * @param {string} college - College name to validate
 * @returns {Object} Validation result
 */
export const validateCollege = (college) => {
  if (!college || college.trim().length === 0) {
    return { isValid: false, message: 'College name is required' }
  }
  
  if (college.trim().length < 3) {
    return { isValid: false, message: 'College name must be at least 3 characters' }
  }
  
  if (college.length > 200) {
    return { isValid: false, message: 'College name cannot exceed 200 characters' }
  }
  
  return { isValid: true, message: '' }
}

/**
 * Validate course name
 * @param {string} course - Course name to validate
 * @returns {Object} Validation result
 */
export const validateCourse = (course) => {
  if (!course || course.trim().length === 0) {
    return { isValid: false, message: 'Course is required' }
  }
  
  if (course.trim().length < 2) {
    return { isValid: false, message: 'Course name must be at least 2 characters' }
  }
  
  if (course.length > 100) {
    return { isValid: false, message: 'Course name cannot exceed 100 characters' }
  }
  
  return { isValid: true, message: '' }
}

/**
 * Validate current year selection
 * @param {string} year - Selected year
 * @returns {Object} Validation result
 */
export const validateCurrentYear = (year) => {
  const validYears = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Final Year', 'Graduated']
  
  if (!year) {
    return { isValid: false, message: 'Please select your current year' }
  }
  
  if (!validYears.includes(year)) {
    return { isValid: false, message: 'Please select a valid year' }
  }
  
  return { isValid: true, message: '' }
}

/**
 * Validate area of interest selection
 * @param {Array} interests - Selected interests
 * @returns {Object} Validation result
 */
export const validateAreaOfInterest = (interests) => {
  const validInterests = [
    'Cloud Computing', 'Web Development', 'Mobile Development', 'Data Science',
    'Machine Learning', 'AI', 'Cybersecurity', 'DevOps', 'Blockchain',
    'IoT', 'Game Development', 'UI/UX Design', 'Digital Marketing'
  ]
  
  if (!interests || !Array.isArray(interests) || interests.length === 0) {
    return { isValid: false, message: 'Please select at least one area of interest' }
  }
  
  if (interests.length > 5) {
    return { isValid: false, message: 'Please select maximum 5 areas of interest' }
  }
  
  const invalidInterests = interests.filter(interest => !validInterests.includes(interest))
  if (invalidInterests.length > 0) {
    return { isValid: false, message: 'Invalid area of interest selected' }
  }
  
  return { isValid: true, message: '' }
}

/**
 * Validate terms and conditions acceptance
 * @param {boolean} agreeToTerms - Terms acceptance status
 * @returns {Object} Validation result
 */
export const validateTermsAcceptance = (agreeToTerms) => {
  if (!agreeToTerms) {
    return { isValid: false, message: 'You must agree to the Terms and Conditions and Privacy Policy to continue' }
  }
  
  return { isValid: true, message: '' }
}
export const validateResume = (file) => {
  if (!file) {
    return { isValid: false, message: 'Resume is required' }
  }
  
  return { isValid: true, message: '' }
}

/**
 * Validate entire form data
 * @param {Object} formData - Complete form data
 * @returns {Object} Validation result with field-specific errors
 */
export const validateFormData = (formData) => {
  const errors = {}
  
  const nameValidation = validateFullName(formData.fullName)
  if (!nameValidation.isValid) {
    errors.fullName = nameValidation.message
  }
  
  const emailValidation = validateEmail(formData.email)
  if (!emailValidation.isValid) {
    errors.email = emailValidation.message
  }
  
  const mobileValidation = validateMobile(formData.mobileNumber)
  if (!mobileValidation.isValid) {
    errors.mobileNumber = mobileValidation.message
  }
  
  const collegeValidation = validateCollege(formData.college)
  if (!collegeValidation.isValid) {
    errors.college = collegeValidation.message
  }
  
  const courseValidation = validateCourse(formData.course)
  if (!courseValidation.isValid) {
    errors.course = courseValidation.message
  }
  
  const yearValidation = validateCurrentYear(formData.currentYear)
  if (!yearValidation.isValid) {
    errors.currentYear = yearValidation.message
  }
  
  const interestValidation = validateAreaOfInterest(formData.areaOfInterest)
  if (!interestValidation.isValid) {
    errors.areaOfInterest = interestValidation.message
  }
  
  const resumeValidation = validateResume(formData.resume)
  if (!resumeValidation.isValid) {
    errors.resume = resumeValidation.message
  }
  
  const termsValidation = validateTermsAcceptance(formData.agreeToTerms)
  if (!termsValidation.isValid) {
    errors.agreeToTerms = termsValidation.message
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

/**
 * Format file size for display
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted file size
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
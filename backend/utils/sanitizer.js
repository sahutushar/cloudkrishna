const validator = require('validator')

/**
 * Sanitize string input to prevent XSS attacks
 * @param {string} input - The input string to sanitize
 * @returns {string} - Sanitized string
 */
const sanitizeString = (input) => {
  if (typeof input !== 'string') return input
  
  // Remove HTML tags and escape special characters
  return validator.escape(input.trim())
}

/**
 * Sanitize email input
 * @param {string} email - Email to sanitize
 * @returns {string} - Sanitized email
 */
const sanitizeEmail = (email) => {
  if (typeof email !== 'string') return email
  
  return validator.normalizeEmail(email.trim().toLowerCase()) || email.trim().toLowerCase()
}

/**
 * Sanitize mobile number (remove non-digits)
 * @param {string} mobile - Mobile number to sanitize
 * @returns {string} - Sanitized mobile number
 */
const sanitizeMobile = (mobile) => {
  if (typeof mobile !== 'string') return mobile
  
  // Remove all non-digit characters
  return mobile.replace(/\D/g, '')
}

/**
 * Sanitize array of strings
 * @param {Array} array - Array to sanitize
 * @returns {Array} - Sanitized array
 */
const sanitizeArray = (array) => {
  if (!Array.isArray(array)) return array
  
  return array.map(item => sanitizeString(item))
}

/**
 * Sanitize user registration data
 * @param {Object} userData - User data to sanitize
 * @returns {Object} - Sanitized user data
 */
const sanitizeUserData = (userData) => {
  return {
    fullName: sanitizeString(userData.fullName),
    email: sanitizeEmail(userData.email),
    mobileNumber: sanitizeMobile(userData.mobileNumber),
    college: sanitizeString(userData.college),
    course: sanitizeString(userData.course),
    currentYear: sanitizeString(userData.currentYear),
    areaOfInterest: sanitizeArray(userData.areaOfInterest),
    resume: userData.resume // File data doesn't need string sanitization
  }
}

module.exports = {
  sanitizeString,
  sanitizeEmail,
  sanitizeMobile,
  sanitizeArray,
  sanitizeUserData
}
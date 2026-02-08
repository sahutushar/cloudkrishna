import axios from 'axios'

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5555/api',
  timeout: 30000, // 30 seconds timeout for file uploads
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`)
    return config
  },
  (error) => {
    console.error('Request error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message)
    
    // Handle network errors
    if (error.code === 'ERR_NETWORK') {
      throw new Error('Cannot connect to server. Please check if the backend is running.')
    }
    
    // Handle timeout errors
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout. Please try again.')
    }
    
    // Handle server errors
    if (error.response?.status >= 500) {
      throw new Error('Server error. Please try again later.')
    }
    
    // Return the original error for specific handling
    throw error
  }
)

/**
 * User API service
 */
export const userService = {
  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @returns {Promise} API response
   */
  register: async (userData) => {
    try {
      // Create FormData for file upload
      const formData = new FormData()
      
      // Add all form fields
      formData.append('fullName', userData.fullName)
      formData.append('email', userData.email)
      formData.append('mobileNumber', userData.mobileNumber)
      formData.append('college', userData.college)
      formData.append('course', userData.course)
      formData.append('currentYear', userData.currentYear)
      
      // Add area of interest as JSON string
      userData.areaOfInterest.forEach(interest => {
        formData.append('areaOfInterest[]', interest)
      })
      
      // Add resume file if exists
      if (userData.resume && userData.resumeFile) {
        formData.append('resume', userData.resumeFile)
      }
      
      const response = await api.post('/users/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return response.data
    } catch (error) {
      // Re-throw with user-friendly message
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message)
      }
      throw error
    }
  },

  /**
   * Get registration statistics
   * @returns {Promise} API response
   */
  getStats: async () => {
    try {
      const response = await api.get('/users/stats')
      return response.data
    } catch (error) {
      console.error('Failed to fetch stats:', error)
      throw new Error('Failed to load statistics')
    }
  },

  /**
   * Download user resume
   * @param {string} userId - User ID
   * @returns {Promise} Blob response
   */
  downloadResume: async (userId) => {
    try {
      const response = await api.get(`/users/resume/${userId}`, {
        responseType: 'blob'
      })
      return response
    } catch (error) {
      console.error('Failed to download resume:', error)
      throw new Error('Failed to download resume')
    }
  },

  /**
   * Get user profile
   * @param {string} userId - User ID
   * @returns {Promise} API response
   */
  getProfile: async (userId) => {
    try {
      const response = await api.get(`/users/profile/${userId}`)
      return response.data
    } catch (error) {
      console.error('Failed to fetch profile:', error)
      throw new Error('Failed to load user profile')
    }
  }
}

/**
 * Health check service
 */
export const healthService = {
  /**
   * Check API health
   * @returns {Promise} API response
   */
  check: async () => {
    try {
      const response = await api.get('/health')
      return response.data
    } catch (error) {
      console.error('Health check failed:', error)
      throw new Error('API health check failed')
    }
  }
}

export default api
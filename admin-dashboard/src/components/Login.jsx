import React, { useState } from 'react'
import axios from 'axios'

const Login = ({ onLogin, onShowRegister }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    console.log('Attempting login with:', credentials)

    try {
      const response = await axios.post('http://localhost:5555/api/admin/login', credentials)
      console.log('Login response:', response.data)
      
      if (response.data.success) {
        onLogin(response.data.token, response.data.admin)
      }
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message)
      setError(error.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, var(--primary-blue, #1F4FD8) 0%, var(--dark-blue, #0B1C3D) 100%)',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            boxShadow: '0 8px 25px rgba(31, 79, 216, 0.3)'
          }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
              <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11.5C15.4,11.5 16,12.4 16,13V16C16,17.4 15.4,18 14.8,18H9.2C8.6,18 8,17.4 8,16V13C8,12.4 8.6,11.5 9.2,11.5V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,10V11.5H13.5V10C13.5,8.7 12.8,8.2 12,8.2Z"/>
            </svg>
          </div>
          <h2 style={{
            color: 'var(--dark-blue, #0B1C3D)',
            fontSize: '28px',
            fontWeight: '700',
            margin: '0 0 8px 0'
          }}>Admin Portal</h2>
          <p style={{ 
            color: 'var(--primary-blue, #1F4FD8)', 
            fontSize: '16px',
            fontWeight: '500',
            margin: '0'
          }}>Cloud Krishna Dashboard</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--dark-blue, #0B1C3D)',
              fontWeight: '600'
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
              Username
            </label>
            <input
              type="text"
              className="form-input"
              value={credentials.username}
              onChange={(e) => setCredentials({...credentials, username: e.target.value})}
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--dark-blue, #0B1C3D)',
              fontWeight: '600'
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10A2,2 0 0,1 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z"/>
              </svg>
              Password
            </label>
            <input
              type="password"
              className="form-input"
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              placeholder="Enter your password"
              required
            />
          </div>

          {error && (
            <div className="error-message" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>
              </svg>
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
            style={{ marginBottom: '15px' }}
          >
            {loading ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px', animation: 'spin 1s linear infinite' }}>
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" strokeDasharray="32" strokeDashoffset="32" opacity="0.3"/>
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" strokeDasharray="32" strokeDashoffset="24"/>
                </svg>
                Signing In...
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px' }}>
                  <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"/>
                </svg>
                Sign In
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onShowRegister}
            className="btn-secondary"
            style={{ width: '100%', marginBottom: '20px' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px' }}>
              <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"/>
            </svg>
            Create New Admin Account
          </button>
        </form>

        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>


      </div>
    </div>
  )
}

export default Login
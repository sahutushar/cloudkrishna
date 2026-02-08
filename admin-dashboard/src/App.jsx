import React, { useState, useEffect } from 'react'
import Login from './components/Login'
import AdminRegister from './components/AdminRegister'
import Dashboard from './components/Dashboard'
import './index.css'
import './styles/responsive-admin.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [loading, setLoading] = useState(true)
  const [adminData, setAdminData] = useState(null)
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    // Check if admin is already logged in
    const token = localStorage.getItem('adminToken')
    const storedAdminData = localStorage.getItem('adminData')
    
    if (token && storedAdminData) {
      setIsAuthenticated(true)
      setAdminData(JSON.parse(storedAdminData))
    }
    setLoading(false)
  }, [])

  const handleLogin = (token, admin) => {
    localStorage.setItem('adminToken', token)
    localStorage.setItem('adminData', JSON.stringify(admin))
    setAdminData(admin)
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminData')
    setAdminData(null)
    setIsAuthenticated(false)
  }

  const handleShowRegister = () => {
    setShowRegister(true)
    setSuccessMessage('')
  }

  const handleBackToLogin = () => {
    setShowRegister(false)
    setSuccessMessage('')
  }

  const handleRegisterSuccess = (message) => {
    setSuccessMessage(message)
    setShowRegister(false)
  }

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        fontSize: '18px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>⏳</div>
          <div>Loading Admin Portal...</div>
        </div>
      </div>
    )
  }

  if (isAuthenticated) {
    return <Dashboard onLogout={handleLogout} adminData={adminData} />
  }

  if (showRegister) {
    return (
      <AdminRegister 
        onBackToLogin={handleBackToLogin}
        onRegisterSuccess={handleRegisterSuccess}
      />
    )
  }

  return (
    <div className="App">
      {successMessage && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: 'linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)',
          color: 'white',
          padding: '15px 25px',
          borderRadius: '10px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
          zIndex: 1000,
          animation: 'slideIn 0.3s ease'
        }}>
          ✓ {successMessage}
        </div>
      )}
      <Login onLogin={handleLogin} onShowRegister={handleShowRegister} />
    </div>
  )
}

export default App
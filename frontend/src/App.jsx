import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Benefits from './components/Benefits'
import RegistrationForm from './components/RegistrationForm'
import Footer from './components/Footer'
import './styles/modern.css'
import './styles/responsive-form.css'
import './styles/responsive-footer.css'
import './index.css'

function App() {
  useEffect(() => {
    const adminDashboardUrl = import.meta.env.VITE_ADMIN_URL || 'http://localhost:3001'
    
    // Secret admin access via URL hash
    const checkAdminAccess = () => {
      if (window.location.hash === '#admin-secret-2024') {
        window.open(adminDashboardUrl, '_blank')
        window.location.hash = '' // Clear the hash
      }
    }
    
    // Secret keyboard shortcut: Ctrl + Shift + A
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault()
        window.open(adminDashboardUrl, '_blank')
      }
    }
    
    checkAdminAccess()
    window.addEventListener('hashchange', checkAdminAccess)
    window.addEventListener('keydown', handleKeyPress)
    
    return () => {
      window.removeEventListener('hashchange', checkAdminAccess)
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  return (
    <div className="App">
      <Navbar />
      <Hero />
      <About />
      <Benefits />
      <RegistrationForm />
      <Footer />
    </div>
  )
}

export default App
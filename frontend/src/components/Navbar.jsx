import React, { useState } from 'react'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleNavClick = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <a href="#" className="navbar-brand">
            <img src="/cloud-krishna-logo.jpeg" alt="Cloud Krishna" />
            <span>Cloud Krishna</span>
          </a>
          
          <ul className={`navbar-nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
            <li><a href="#home" className="nav-link" onClick={handleNavClick}>Home</a></li>
            <li><a href="#about" className="nav-link" onClick={handleNavClick}>About</a></li>
            <li><a href="#benefits" className="nav-link" onClick={handleNavClick}>Benefits</a></li>
            <li><a href="#register" className="nav-link" onClick={handleNavClick}>Register</a></li>
            <li>
              <a href="#register" className="btn btn-primary" onClick={handleNavClick}>
                Join Now
              </a>
            </li>
          </ul>

          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
      </div>
      
      {isMobileMenuOpen && (
        <div 
          className="mobile-overlay" 
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </nav>
  )
}

export default Navbar
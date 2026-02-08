import React from 'react'

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-content animate-fadeInUp">
          <h1 className="hero-title" style={{ marginTop: '12rem' }}>
            <span style={{
              background: 'linear-gradient(45deg, #ffffff, #e0f2fe)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 0 20px rgba(255, 255, 255, 0.3)'
            }}>
              Join the Future of
            </span>
            <br />
            <span style={{
              background: 'linear-gradient(45deg, #fbbf24, #f97316)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 0 15px rgba(251, 191, 36, 0.3)',
              fontSize: '1.2em',
              fontWeight: '800'
            }}>
              Cloud Computing
            </span>
          </h1>
          <p className="hero-subtitle" style={{ fontSize: '1.5rem', fontWeight: '400' }}>
            Empowering the next generation of cloud professionals through 
            community-driven learning and hands-on experience.
          </p>
          <div className="hero-buttons" style={{ marginTop: '3rem' }}>
            <a href="#register" className="btn btn-primary" style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)',
              color: '#1e40af',
              padding: '1.3rem 3.5rem',
              fontSize: '1.2rem',
              fontWeight: '800',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              borderRadius: '60px',
              border: '3px solid #1e40af',
              boxShadow: '0 15px 40px rgba(30, 64, 175, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.8)',
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              position: 'relative',
              overflow: 'hidden',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              marginRight: '2rem',
              backdropFilter: 'blur(10px)',
              minWidth: '220px',
              height: '60px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px) scale(1.08)';
              e.currentTarget.style.boxShadow = '0 25px 50px rgba(30, 64, 175, 0.6), inset 0 2px 4px rgba(255, 255, 255, 0.9)';
              e.currentTarget.style.background = 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)';
              e.currentTarget.style.color = 'white';
              e.currentTarget.style.borderColor = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(30, 64, 175, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.8)';
              e.currentTarget.style.background = 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)';
              e.currentTarget.style.color = '#1e40af';
              e.currentTarget.style.borderColor = '#1e40af';
            }}>
              Start Your Journey
            </a>
            <a href="#about" className="btn btn-outline" style={{
              background: 'rgba(255, 255, 255, 0.15)',
              color: 'white',
              padding: '1.3rem 3.5rem',
              fontSize: '1.2rem',
              fontWeight: '700',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              borderRadius: '60px',
              border: '3px solid rgba(255, 255, 255, 0.4)',
              backdropFilter: 'blur(15px)',
              boxShadow: '0 15px 40px rgba(0, 0, 0, 0.2), inset 0 2px 4px rgba(255, 255, 255, 0.3)',
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              minWidth: '220px',
              height: '60px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.7)';
              e.currentTarget.style.transform = 'translateY(-8px) scale(1.08)';
              e.currentTarget.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.3), inset 0 2px 4px rgba(255, 255, 255, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.2), inset 0 2px 4px rgba(255, 255, 255, 0.3)';
            }}>
              Learn More
            </a>
          </div>
          
          {/* Enhanced Stats */}
          <div className="stats-grid" style={{ marginTop: '4rem', marginBottom: '4rem', gap: '3rem', display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
            <div className="stat-card glass-card" style={{
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '20px',
              padding: '1.5rem',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              minWidth: '200px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
            }}>
              <div className="stat-number" style={{
                fontSize: '2.8rem',
                fontWeight: '800',
                background: 'linear-gradient(45deg, #fbbf24, #f97316)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '0.5rem'
              }}>1,500+</div>
              <div className="stat-label" style={{
                color: 'white',
                fontSize: '1.1rem',
                fontWeight: '600',
                opacity: '0.9'
              }}>Active Members</div>
            </div>
            <div className="stat-card glass-card" style={{
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '20px',
              padding: '1.5rem',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              minWidth: '200px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
            }}>
              <div className="stat-number" style={{
                fontSize: '2.8rem',
                fontWeight: '800',
                background: 'linear-gradient(45deg, #fbbf24, #f97316)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '0.5rem'
              }}>150+</div>
              <div className="stat-label" style={{
                color: 'white',
                fontSize: '1.1rem',
                fontWeight: '600',
                opacity: '0.9'
              }}>Partner Colleges</div>
            </div>
            <div className="stat-card glass-card" style={{
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '20px',
              padding: '1.5rem',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              minWidth: '200px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
            }}>
              <div className="stat-number" style={{
                fontSize: '2.8rem',
                fontWeight: '800',
                background: 'linear-gradient(45deg, #fbbf24, #f97316)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '0.5rem'
              }}>500+</div>
              <div className="stat-label" style={{
                color: 'white',
                fontSize: '1.1rem',
                fontWeight: '600',
                opacity: '0.9'
              }}>Job Placements</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Animated Background Elements */}
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '10%',
        width: '100px',
        height: '100px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '50%',
        animation: 'float 6s ease-in-out infinite'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '20%',
        left: '15%',
        width: '80px',
        height: '80px',
        background: 'rgba(255, 255, 255, 0.08)',
        borderRadius: '50%',
        animation: 'float 8s ease-in-out infinite reverse'
      }}></div>
    </section>
  )
}

export default Hero
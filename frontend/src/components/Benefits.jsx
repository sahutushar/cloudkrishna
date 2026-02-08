import React from 'react'

const Benefits = () => {
  const benefits = [
    {
      title: 'Expert-Led Learning',
      description: 'Learn from certified industry professionals with extensive real-world cloud experience and proven track records in enterprise-grade implementations.',
      icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l3.09 6.26L22 9l-5.91.74L12 16l-4.09-6.26L2 9l6.91-.74L12 2z"/>
      </svg>,
      gradient: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)'
    },
    {
      title: 'Career Opportunities',
      description: 'Access exclusive job openings, premium internships, and personalized career guidance from our network of Fortune 500 partner companies.',
      icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M10 16V8a6 6 0 0 1 12 0v8a1 1 0 0 1-1 1H11a1 1 0 0 1-1-1zM6 16a1 1 0 0 1-1-1V9a1 1 0 0 1 2 0v6a1 1 0 0 1-1 1zM4 16a1 1 0 0 1-1-1v-4a1 1 0 0 1 2 0v4a1 1 0 0 1-1 1z"/>
      </svg>,
      gradient: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)'
    },
    {
      title: 'Certification Support',
      description: 'Comprehensive preparation materials, practice exams, and expert guidance for AWS, Azure, GCP, and other leading cloud certifications.',
      icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
      </svg>,
      gradient: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)'
    },
    {
      title: 'Professional Networking',
      description: 'Connect with industry leaders, experienced mentors, and potential collaborators through our exclusive professional networking platform.',
      icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
      </svg>,
      gradient: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)'
    },
    {
      title: 'Hands-On Projects',
      description: 'Work on enterprise-grade cloud projects and build a comprehensive portfolio that demonstrates your technical expertise to employers.',
      icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.5-.5a2 2 0 00-1.806.532L12 16.5l-2.1-1.587a2 2 0 00-1.806-.532l-2.5.5a2 2 0 00-1.022.547A3 3 0 003 18v4a1 1 0 001 1h16a1 1 0 001-1v-4a3 3 0 00-1.572-2.572zM12 13.5a4.5 4.5 0 100-9 4.5 4.5 0 000 9z"/>
      </svg>,
      gradient: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)'
    },
    {
      title: 'Learning Resources',
      description: 'Access our curated library of premium learning materials, video tutorials, and comprehensive documentation for all major cloud platforms.',
      icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
      </svg>,
      gradient: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)'
    }
  ]

  return (
    <section id="benefits" className="section" style={{ 
      background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #f97316 100%)',
      color: 'white'
    }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h2 className="animate-fadeInUp" style={{ 
            color: 'white',
            fontSize: '2.8rem',
            fontWeight: '800',
            marginBottom: '2rem',
            textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
            letterSpacing: '1px'
          }}>
            Why Choose Cloud Krishna?
          </h2>
          <p style={{ 
            fontSize: '1.4rem', 
            opacity: 0.95, 
            maxWidth: '750px', 
            margin: '0 auto',
            fontWeight: '500',
            lineHeight: '1.8',
            letterSpacing: '0.5px'
          }}>
            Unlock your potential with our comprehensive cloud learning ecosystem designed for professional success and career advancement.
          </p>
        </div>
        
        <div className="features-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          margin: '3rem 0'
        }}>
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="glass-card animate-fadeInUp" 
              style={{ 
                animationDelay: `${index * 0.1}s`,
                background: 'rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(25px)',
                border: '2px solid rgba(255, 255, 255, 0.25)',
                borderRadius: '20px',
                padding: '2rem',
                textAlign: 'center',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.2)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.18)'
                e.currentTarget.style.transform = 'translateY(-15px) scale(1.02)'
                e.currentTarget.style.boxShadow = '0 30px 70px rgba(0, 0, 0, 0.3)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)'
                e.currentTarget.style.transform = 'translateY(0) scale(1)'
                e.currentTarget.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.2)'
              }}
            >
              <div style={{
                width: '70px',
                height: '70px',
                background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
                borderRadius: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                fontSize: '2rem',
                color: 'white',
                fontWeight: '900',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 15px 35px rgba(30, 64, 175, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.2)'
              }}>
                {benefit.icon}
              </div>
              <h3 style={{ 
                color: 'white', 
                marginBottom: '1.2rem',
                fontSize: '1.4rem',
                fontWeight: '700',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
              }}>
                {benefit.title}
              </h3>
              <p style={{ 
                color: 'rgba(255, 255, 255, 0.9)', 
                lineHeight: '1.6',
                fontSize: '1rem',
                fontWeight: '400'
              }}>
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
        
        {/* Call to Action */}
        <div style={{ textAlign: 'center', marginTop: '5rem' }}>
          <a href="#register" className="btn btn-primary" style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)',
            color: '#1e40af',
            padding: '1.3rem 3.5rem',
            fontSize: '1.2rem',
            fontWeight: '700',
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
            Start Your Cloud Journey Today
          </a>
        </div>
      </div>
    </section>
  )
}

export default Benefits
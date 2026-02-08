import React from 'react'

const About = () => {
  return (
    <section id="about" className="section" style={{ background: 'rgba(255, 255, 255, 0.95)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="animate-fadeInUp">
            About Cloud Krishna Community
          </h2>
          <p style={{ fontSize: '1.3rem', color: '#2d3748', maxWidth: '700px', margin: '0 auto', lineHeight: '1.8', fontWeight: '600' }}>
            Advancing tomorrow's cloud architects through strategic innovation, 
            collaborative excellence, and unwavering commitment to professional development in digital transformation.
          </p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card animate-fadeInLeft" style={{
            background: 'linear-gradient(135deg, rgba(30, 64, 175, 0.2) 0%, rgba(59, 130, 246, 0.15) 100%)',
            backdropFilter: 'blur(25px)',
            border: '3px solid rgba(30, 64, 175, 0.4)',
            borderRadius: '25px',
            padding: '3rem',
            textAlign: 'center',
            transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(30, 64, 175, 0.2)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-20px) scale(1.05)';
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(30, 64, 175, 0.35) 0%, rgba(59, 130, 246, 0.3) 100%)';
            e.currentTarget.style.boxShadow = '0 25px 50px rgba(30, 64, 175, 0.3)';
            e.currentTarget.style.borderColor = 'rgba(30, 64, 175, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(30, 64, 175, 0.2) 0%, rgba(59, 130, 246, 0.15) 100%)';
            e.currentTarget.style.boxShadow = '0 20px 60px rgba(30, 64, 175, 0.2)';
            e.currentTarget.style.borderColor = 'rgba(30, 64, 175, 0.4)';
          }}>
            <h3 className="feature-title" style={{ fontSize: '1.8rem', marginBottom: '2rem', color: '#1e40af', fontWeight: '800', textShadow: '0 2px 4px rgba(30, 64, 175, 0.2)' }}>Innovation First</h3>
            <p className="feature-description" style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#4b5563', fontWeight: '500' }}>
              Stay ahead with cutting-edge cloud technologies and industry best practices. 
              Learn from real-world projects and hands-on experiences.
            </p>
          </div>
          
          <div className="feature-card animate-fadeInUp" style={{
            background: 'linear-gradient(135deg, rgba(30, 64, 175, 0.2) 0%, rgba(59, 130, 246, 0.15) 100%)',
            backdropFilter: 'blur(25px)',
            border: '3px solid rgba(30, 64, 175, 0.4)',
            borderRadius: '25px',
            padding: '3rem',
            textAlign: 'center',
            transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(30, 64, 175, 0.2)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-20px) scale(1.05)';
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(30, 64, 175, 0.35) 0%, rgba(59, 130, 246, 0.3) 100%)';
            e.currentTarget.style.boxShadow = '0 25px 50px rgba(30, 64, 175, 0.3)';
            e.currentTarget.style.borderColor = 'rgba(30, 64, 175, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(30, 64, 175, 0.2) 0%, rgba(59, 130, 246, 0.15) 100%)';
            e.currentTarget.style.boxShadow = '0 20px 60px rgba(30, 64, 175, 0.2)';
            e.currentTarget.style.borderColor = 'rgba(30, 64, 175, 0.4)';
          }}>
            <h3 className="feature-title" style={{ fontSize: '1.8rem', marginBottom: '2rem', color: '#1e40af', fontWeight: '800', textShadow: '0 2px 4px rgba(30, 64, 175, 0.2)' }}>Community Driven</h3>
            <p className="feature-description" style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#4b5563', fontWeight: '500' }}>
              Connect with like-minded professionals, mentors, and industry experts. 
              Build lasting relationships that accelerate your career growth.
            </p>
          </div>
          
          <div className="feature-card animate-fadeInRight" style={{
            background: 'linear-gradient(135deg, rgba(30, 64, 175, 0.2) 0%, rgba(59, 130, 246, 0.15) 100%)',
            backdropFilter: 'blur(25px)',
            border: '3px solid rgba(30, 64, 175, 0.4)',
            borderRadius: '25px',
            padding: '3rem',
            textAlign: 'center',
            transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(30, 64, 175, 0.2)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-20px) scale(1.05)';
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(30, 64, 175, 0.35) 0%, rgba(59, 130, 246, 0.3) 100%)';
            e.currentTarget.style.boxShadow = '0 25px 50px rgba(30, 64, 175, 0.3)';
            e.currentTarget.style.borderColor = 'rgba(30, 64, 175, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(30, 64, 175, 0.2) 0%, rgba(59, 130, 246, 0.15) 100%)';
            e.currentTarget.style.boxShadow = '0 20px 60px rgba(30, 64, 175, 0.2)';
            e.currentTarget.style.borderColor = 'rgba(30, 64, 175, 0.4)';
          }}>
            <h3 className="feature-title" style={{ fontSize: '1.8rem', marginBottom: '2rem', color: '#1e40af', fontWeight: '800', textShadow: '0 2px 4px rgba(30, 64, 175, 0.2)' }}>Excellence Focused</h3>
            <p className="feature-description" style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#4b5563', fontWeight: '500' }}>
              Achieve certification goals, master cloud platforms, and develop 
              skills that make you stand out in the competitive tech landscape.
            </p>
          </div>
        </div>
        
        {/* Mission Statement */}
        <div className="card" style={{ 
          marginTop: '4rem', 
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(30, 64, 175, 0.08) 0%, rgba(59, 130, 246, 0.05) 100%)',
          backdropFilter: 'blur(20px)',
          border: '2px solid rgba(30, 64, 175, 0.2)',
          borderRadius: '25px',
          padding: '3rem 2.5rem',
          boxShadow: '0 20px 50px rgba(30, 64, 175, 0.15)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            height: '4px',
            background: 'linear-gradient(90deg, #1e40af 0%, #3b82f6 100%)'
          }}></div>
          <h3 style={{ 
            marginBottom: '2rem', 
            color: '#1e40af',
            fontSize: '2rem',
            fontWeight: '800',
            textShadow: '0 2px 4px rgba(30, 64, 175, 0.2)',
            position: 'relative'
          }}>
            Our Mission
          </h3>
          <p style={{ 
            fontSize: '1.2rem', 
            lineHeight: '1.7', 
            color: '#2d3748',
            fontWeight: '600',
            maxWidth: '650px',
            margin: '0 auto',
            letterSpacing: '0.3px'
          }}>
            To cultivate a premier ecosystem where cloud professionals advance their expertise 
            through strategic collaboration and industry-leading education. We are committed to 
            delivering accessible, world-class training that drives innovation and accelerates 
            career growth in the evolving landscape of cloud technology.
          </p>
        </div>
      </div>
    </section>
  )
}

export default About
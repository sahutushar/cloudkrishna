import React, { useState } from 'react'
import { userService } from '../services/api'
import { validateFormData, formatFileSize } from '../utils/validation'

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    countryCode: '+91',
    mobileNumber: '',
    college: '',
    otherCollege: '',
    course: '',
    otherCourse: '',
    currentYear: '',
    otherYear: '',
    areaOfInterest: [],
    resume: null,
    resumeFile: null,
    agreeToTerms: false
  })

  const countryCodes = [
    { code: '+91', country: 'India', flag: '🇮🇳' },
    { code: '+1', country: 'USA/Canada', flag: '🇺🇸' },
    { code: '+44', country: 'UK', flag: '🇬🇧' },
    { code: '+61', country: 'Australia', flag: '🇦🇺' },
    { code: '+971', country: 'UAE', flag: '🇦🇪' },
    { code: '+65', country: 'Singapore', flag: '🇸🇬' },
    { code: '+49', country: 'Germany', flag: '🇩🇪' },
    { code: '+33', country: 'France', flag: '🇫🇷' },
    { code: '+81', country: 'Japan', flag: '🇯🇵' },
    { code: '+86', country: 'China', flag: '🇨🇳' },
    { code: '+82', country: 'South Korea', flag: '🇰🇷' },
    { code: '+7', country: 'Russia', flag: '🇷🇺' },
    { code: '+55', country: 'Brazil', flag: '🇧🇷' },
    { code: '+27', country: 'South Africa', flag: '🇿🇦' },
    { code: '+234', country: 'Nigeria', flag: '🇳🇬' },
  ]
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const yearOptions = ['First Year', 'Second Year', 'Third Year', 'Fourth Year', 'Other']
  
  const courseOptions = [
    // Engineering - Computer Science & IT
    'B.Tech Computer Science and Engineering',
    'B.Tech Information Technology',
    'B.Tech Software Engineering',
    'B.Tech Artificial Intelligence and Machine Learning',
    'B.Tech Data Science',
    'B.Tech Cyber Security',
    'B.Tech Computer Science and Business Systems',
    // Engineering - Core Branches
    'B.Tech Mechanical Engineering',
    'B.Tech Civil Engineering',
    'B.Tech Electrical Engineering',
    'B.Tech Electronics and Communication Engineering',
    'B.Tech Electronics and Telecommunication Engineering',
    'B.Tech Chemical Engineering',
    'B.Tech Aerospace Engineering',
    'B.Tech Automobile Engineering',
    'B.Tech Biotechnology',
    'B.Tech Industrial Engineering',
    // Computer Applications
    'BCA (Bachelor of Computer Applications)',
    'MCA (Master of Computer Applications)',
    'B.Sc Computer Science',
    'M.Sc Computer Science',
    'B.Sc Information Technology',
    'M.Sc Information Technology',
    // Management
    'BBA (Bachelor of Business Administration)',
    'MBA (Master of Business Administration)',
    'MBA Finance',
    'MBA Marketing',
    'MBA Human Resources',
    'MBA Operations',
    'MBA Information Technology',
    'PGDM (Post Graduate Diploma in Management)',
    // Commerce
    'B.Com (Bachelor of Commerce)',
    'M.Com (Master of Commerce)',
    'B.Com Honors',
    'BBA Finance',
    'Chartered Accountancy (CA)',
    // Science
    'B.Sc Physics',
    'B.Sc Chemistry',
    'B.Sc Mathematics',
    'B.Sc Biology',
    'B.Sc Biotechnology',
    'M.Sc Physics',
    'M.Sc Chemistry',
    'M.Sc Mathematics',
    // Arts & Humanities
    'BA (Bachelor of Arts)',
    'MA (Master of Arts)',
    'BA English',
    'BA Psychology',
    'BA Economics',
    'BA Political Science',
    'BA History',
    // Medical
    'MBBS',
    'BDS (Bachelor of Dental Surgery)',
    'BAMS (Bachelor of Ayurvedic Medicine and Surgery)',
    'BHMS (Bachelor of Homeopathic Medicine and Surgery)',
    'B.Pharm (Bachelor of Pharmacy)',
    'M.Pharm (Master of Pharmacy)',
    'Pharm.D (Doctor of Pharmacy)',
    'BSc Nursing',
    'MSc Nursing',
    // Law
    'BA LLB (5 Year Integrated)',
    'BBA LLB (5 Year Integrated)',
    'B.Com LLB (5 Year Integrated)',
    'LLB (3 Year)',
    'LLM (Master of Law)',
    // Design & Architecture
    'B.Arch (Bachelor of Architecture)',
    'M.Arch (Master of Architecture)',
    'B.Des (Bachelor of Design)',
    'M.Des (Master of Design)',
    'Fashion Design',
    'Interior Design',
    'Graphic Design',
    // Diploma Courses
    'Diploma in Computer Science',
    'Diploma in Mechanical Engineering',
    'Diploma in Civil Engineering',
    'Diploma in Electrical Engineering',
    'Polytechnic Diploma',
    // Other
    'Other'
  ]
  
  const collegeOptions = [
    // IITs
    'IIT Delhi', 'IIT Bombay', 'IIT Madras', 'IIT Kanpur', 'IIT Kharagpur', 'IIT Roorkee', 'IIT Guwahati',
    'IIT Hyderabad', 'IIT Indore', 'IIT BHU Varanasi', 'IIT Bhubaneswar', 'IIT Gandhinagar', 'IIT Jodhpur',
    'IIT Patna', 'IIT Ropar', 'IIT Mandi', 'IIT Dhanbad', 'IIT Tirupati', 'IIT Palakkad', 'IIT Jammu',
    // NITs
    'NIT Trichy', 'NIT Warangal', 'NIT Surathkal', 'NIT Calicut', 'NIT Rourkela', 'NIT Jaipur',
    'NIT Kurukshetra', 'NIT Durgapur', 'NIT Allahabad', 'NIT Bhopal', 'NIT Nagpur', 'NIT Silchar',
    'NIT Hamirpur', 'NIT Jalandhar', 'NIT Patna', 'NIT Raipur', 'NIT Agartala', 'NIT Srinagar',
    // IIITs
    'IIIT Hyderabad', 'IIIT Bangalore', 'IIIT Delhi', 'IIIT Allahabad', 'IIIT Gwalior', 'IIIT Jabalpur',
    'IIIT Kota', 'IIIT Lucknow', 'IIIT Nagpur', 'IIIT Pune', 'IIIT Sri City', 'IIIT Vadodara', 'IIIT Naya Raipur',
    // BITS
    'BITS Pilani', 'BITS Goa', 'BITS Hyderabad',
    // Chhattisgarh Colleges
    'NIT Raipur', 'IIIT Naya Raipur', 'Indian Institute of Information Technology Naya Raipur',
    'Pt. Ravishankar Shukla University Raipur', 'Atal Bihari Vajpayee Vishwavidyalaya Bilaspur',
    'Guru Ghasidas Vishwavidyalaya Bilaspur', 'Hidayatullah National Law University Raipur',
    'Chhattisgarh Swami Vivekanand Technical University', 'Government Engineering College Raipur',
    'Government Engineering College Bilaspur', 'Government Engineering College Jagdalpur',
    'Bhilai Institute of Technology Durg', 'Shri Shankaracharya Technical Campus Bhilai',
    'Rungta College of Engineering and Technology Bhilai', 'SSIPMT Raipur',
    'Shri Rawatpura Sarkar Institute of Professional Studies Raipur',
    'OP Jindal University Raipur', 'ICFAI University Raipur', 'Amity University Raipur',
    'Kalinga University Raipur', 'ITM University Raipur', 'Dr. CV Raman University Bilaspur',
    'Chhattisgarh Institute of Medical Sciences Bilaspur', 'Late Shri Lakhiram Agrawal Memorial Government Medical College Raigarh',
    'Pt. JNM Medical College Raipur', 'Government Dental College Raipur',
    // Top Private Universities
    'VIT Vellore', 'VIT Chennai', 'VIT Bhopal', 'VIT Amaravati',
    'Manipal Institute of Technology', 'Manipal University Jaipur',
    'SRM Institute of Science and Technology', 'SRM University AP',
    'Amity University Noida', 'Amity University Mumbai', 'Amity University Lucknow',
    'Thapar Institute of Engineering and Technology',
    'Lovely Professional University (LPU)',
    'Chandigarh University',
    'Shiv Nadar University',
    'Ashoka University',
    'KIIT University',
    'Kalinga Institute of Industrial Technology',
    'Symbiosis Institute of Technology',
    'MIT World Peace University',
    'BML Munjal University',
    'Plaksha University',
    // State Universities
    'Delhi University', 'Mumbai University', 'Pune University', 'Anna University', 'Osmania University',
    'Jadavpur University', 'Calcutta University', 'Bangalore University', 'Madras University',
    'Andhra University', 'Kerala University', 'Gujarat University', 'Rajasthan University',
    // Engineering Colleges
    'PSG College of Technology', 'Coimbatore Institute of Technology', 'SSN College of Engineering',
    'RV College of Engineering', 'BMS College of Engineering', 'MS Ramaiah Institute of Technology',
    'PES University', 'Dayananda Sagar College of Engineering',
    'Netaji Subhas University of Technology (NSUT)', 'Delhi Technological University (DTU)',
    'Indraprastha Institute of Information Technology (IIIT Delhi)',
    'College of Engineering Pune (COEP)', 'Veermata Jijabai Technological Institute (VJTI)',
    'Institute of Chemical Technology (ICT Mumbai)',
    'Birla Institute of Technology Mesra', 'Birla Institute of Technology and Science',
    'Jamia Millia Islamia', 'Aligarh Muslim University',
    // Management & Other Institutes
    'IIM Ahmedabad', 'IIM Bangalore', 'IIM Calcutta', 'IIM Lucknow', 'IIM Indore', 'IIM Kozhikode', 'IIM Raipur',
    'XLRI Jamshedpur', 'FMS Delhi', 'SPJIMR Mumbai', 'MDI Gurgaon',
    'ISB Hyderabad', 'Great Lakes Institute of Management',
    'NIFT Delhi', 'NID Ahmedabad', 'MICA Ahmedabad',
    // Medical Colleges
    'AIIMS Delhi', 'AIIMS Jodhpur', 'AIIMS Bhopal', 'AIIMS Rishikesh', 'AIIMS Raipur',
    'JIPMER Puducherry', 'CMC Vellore', 'AFMC Pune',
    'Maulana Azad Medical College', 'Lady Hardinge Medical College',
    // Law Colleges
    'NLSIU Bangalore', 'NALSAR Hyderabad', 'NLU Delhi', 'NUJS Kolkata', 'NLIU Bhopal',
    // Other
    'Other'
  ]
  
  const interestOptions = [
    'Cloud Computing', 'Web Development', 'Mobile Development', 'Data Science',
    'Machine Learning', 'AI', 'Cybersecurity', 'DevOps', 'Blockchain',
    'IoT', 'Game Development', 'UI/UX Design', 'Digital Marketing'
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleCheckboxChange = (interest) => {
    setFormData(prev => ({
      ...prev,
      areaOfInterest: prev.areaOfInterest.includes(interest)
        ? prev.areaOfInterest.filter(i => i !== interest)
        : [...prev.areaOfInterest, interest]
    }))
    if (errors.areaOfInterest) {
      setErrors(prev => ({ ...prev, areaOfInterest: '' }))
    }
  }

  const handleTermsChange = (e) => {
    setFormData(prev => ({ ...prev, agreeToTerms: e.target.checked }))
    if (errors.agreeToTerms) {
      setErrors(prev => ({ ...prev, agreeToTerms: '' }))
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Store file object and metadata
      setFormData(prev => ({
        ...prev,
        resume: {
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size
        },
        resumeFile: file // Store actual file for upload
      }))
      
      if (errors.resume) {
        setErrors(prev => ({ ...prev, resume: '' }))
      }
    }
  }

  const validateForm = () => {
    const validation = validateFormData(formData)
    setErrors(validation.errors)
    return validation.isValid
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSuccessMessage('')
    
    console.log('Form submission started')
    console.log('Form data:', formData)
    
    // Client-side validation
    const validation = validateFormData(formData)
    console.log('Validation result:', validation)
    
    if (!validation.isValid) {
      setErrors(validation.errors)
      console.log('Validation failed:', validation.errors)
      return
    }

    setIsSubmitting(true)
    setErrors({})
    
    try {
      console.log('Sending request to API...')
      const response = await userService.register(formData)
      console.log('API response:', response)
      
      setSuccessMessage(response.message || 'Registration successful! Welcome to Cloud Krishna Community.')
      
      // Reset form
      setFormData({
        fullName: '', email: '', countryCode: '+91', mobileNumber: '', college: '', otherCollege: '',
        course: '', otherCourse: '', currentYear: '', otherYear: '', areaOfInterest: [], resume: null, resumeFile: null, agreeToTerms: false
      })
      
      // Reset file input
      const fileInput = document.getElementById('resume')
      if (fileInput) fileInput.value = ''
      
      // Scroll to success message
      setTimeout(() => {
        document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
      
    } catch (error) {
      console.error('Registration error:', error)
      
      if (error.message) {
        setErrors({ submit: error.message })
      } else {
        setErrors({ submit: 'Registration failed. Please try again.' })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="register" className="section" style={{
      background: '#f8fafc',
      minHeight: '100vh',
      padding: window.innerWidth <= 768 ? '40px 0' : '80px 0'
    }}>
      <div className="container">
        <div style={{ 
          maxWidth: '900px', 
          margin: '0 auto', 
          padding: window.innerWidth <= 480 ? '0 5px' : '0 15px' 
        }}>
          {/* Header */}
          <div className="text-center" style={{ marginBottom: '32px' }}>
            <h1 style={{
              color: 'var(--dark-blue)',
              fontSize: '2.5rem',
              fontWeight: '700',
              margin: '0 0 16px 0',
              letterSpacing: '-0.5px'
            }}>Student Registration</h1>
            <div style={{
              width: '60px',
              height: '4px',
              background: 'var(--primary-blue)',
              margin: '0 auto 20px',
              borderRadius: '2px'
            }}></div>
            <p style={{
              color: 'var(--primary-blue)',
              fontSize: '18px',
              fontWeight: '600',
              lineHeight: '1.6',
              maxWidth: '500px',
              margin: '0 auto'
            }}>
              Join Cloud Krishna Community - Your gateway to cloud excellence
            </p>
          </div>

          {successMessage && (
            <div style={{
              background: 'linear-gradient(135deg, #d4edda, #c3e6cb)',
              color: '#155724',
              padding: '20px',
              borderRadius: '15px',
              marginBottom: '30px',
              textAlign: 'center',
              border: '1px solid #c3e6cb',
              boxShadow: '0 4px 15px rgba(40, 167, 69, 0.2)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                {successMessage}
              </div>
            </div>
          )}

          {/* Form Card */}
          <div style={{
            background: 'var(--white)',
            borderRadius: window.innerWidth <= 480 ? '8px' : '12px',
            padding: window.innerWidth <= 480 ? '20px' : '32px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            border: '1px solid #e2e8f0'
          }}>
            <form onSubmit={handleSubmit} style={{ marginTop: '0' }}>
              {/* Form Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: window.innerWidth <= 480 ? '15px' : '20px',
                marginBottom: window.innerWidth <= 480 ? '15px' : '20px'
              }}>
                {/* Full Name */}
                <div className="form-group">
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#2c3e50',
                    marginBottom: '8px',
                    letterSpacing: '0.3px'
                  }}>Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      border: errors.fullName ? '2px solid var(--error-red)' : '1px solid var(--border-default)',
                      borderRadius: '8px',
                      fontSize: '16px',
                      transition: 'all 0.2s ease',
                      backgroundColor: 'var(--white)',
                      outline: 'none',
                      fontFamily: 'inherit'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'var(--primary-blue)'
                      e.target.style.boxShadow = '0 0 0 3px rgba(31, 79, 216, 0.1)'
                    }}
                    onBlur={(e) => {
                      if (!errors.fullName) {
                        e.target.style.borderColor = 'var(--border-default)'
                        e.target.style.boxShadow = 'none'
                      }
                    }}
                  />
                  {errors.fullName && (
                    <div style={{
                      color: '#e74c3c',
                      fontSize: '13px',
                      marginTop: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                      </svg>
                      {errors.fullName}
                    </div>
                  )}
                </div>

                {/* Email */}
                <div className="form-group">
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#2c3e50',
                    marginBottom: '8px',
                    letterSpacing: '0.3px'
                  }}>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    style={{
                      width: '100%',
                      padding: '15px 18px',
                      border: errors.email ? '2px solid #e74c3c' : '2px solid #e9ecef',
                      borderRadius: '12px',
                      fontSize: '16px',
                      transition: 'all 0.3s ease',
                      backgroundColor: '#f8f9fa',
                      outline: 'none',
                      fontFamily: 'inherit'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'var(--primary-color)'
                      e.target.style.backgroundColor = 'white'
                      e.target.style.boxShadow = '0 0 0 3px rgba(0, 123, 255, 0.1)'
                    }}
                    onBlur={(e) => {
                      if (!errors.email) {
                        e.target.style.borderColor = '#e9ecef'
                        e.target.style.backgroundColor = '#f8f9fa'
                        e.target.style.boxShadow = 'none'
                      }
                    }}
                  />
                  {errors.email && (
                    <div style={{
                      color: '#e74c3c',
                      fontSize: '13px',
                      marginTop: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                      </svg>
                      {errors.email}
                    </div>
                  )}
                </div>
              </div>

              {/* Second Row */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: window.innerWidth <= 480 ? '15px' : '20px',
                marginBottom: window.innerWidth <= 480 ? '15px' : '20px'
              }}>
                {/* Mobile Number with Country Code */}
                <div className="form-group">
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#2c3e50',
                    marginBottom: '8px',
                    letterSpacing: '0.3px'
                  }}>Mobile Number *</label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleInputChange}
                      style={{
                        width: '120px',
                        padding: '15px 12px',
                        border: '2px solid #e9ecef',
                        borderRadius: '12px',
                        fontSize: '16px',
                        transition: 'all 0.3s ease',
                        backgroundColor: '#f8f9fa',
                        outline: 'none',
                        fontFamily: 'inherit',
                        appearance: 'none',
                        backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3e%3c/svg%3e")',
                        backgroundPosition: 'right 8px center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '14px',
                        paddingRight: '30px',
                        cursor: 'pointer'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'var(--primary-color)'
                        e.target.style.backgroundColor = 'white'
                        e.target.style.boxShadow = '0 0 0 3px rgba(0, 123, 255, 0.1)'
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e9ecef'
                        e.target.style.backgroundColor = '#f8f9fa'
                        e.target.style.boxShadow = 'none'
                      }}
                    >
                      {countryCodes.map(({ code, country, flag }) => (
                        <option key={code} value={code}>
                          {flag} {code}
                        </option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      name="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={handleInputChange}
                      placeholder="Enter mobile number"
                      maxLength="15"
                      style={{
                        flex: 1,
                        padding: '15px 18px',
                        border: errors.mobileNumber ? '2px solid #e74c3c' : '2px solid #e9ecef',
                        borderRadius: '12px',
                        fontSize: '16px',
                        transition: 'all 0.3s ease',
                        backgroundColor: '#f8f9fa',
                        outline: 'none',
                        fontFamily: 'inherit'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'var(--primary-color)'
                        e.target.style.backgroundColor = 'white'
                        e.target.style.boxShadow = '0 0 0 3px rgba(0, 123, 255, 0.1)'
                      }}
                      onBlur={(e) => {
                        if (!errors.mobileNumber) {
                          e.target.style.borderColor = '#e9ecef'
                          e.target.style.backgroundColor = '#f8f9fa'
                          e.target.style.boxShadow = 'none'
                        }
                      }}
                    />
                  </div>
                  {errors.mobileNumber && (
                    <div style={{
                      color: '#e74c3c',
                      fontSize: '13px',
                      marginTop: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                      </svg>
                      {errors.mobileNumber}
                    </div>
                  )}
                </div>

                {/* Current Year */}
                <div className="form-group">
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#2c3e50',
                    marginBottom: '8px',
                    letterSpacing: '0.3px'
                  }}>Current Year *</label>
                  <select
                    name="currentYear"
                    value={formData.currentYear}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '15px 18px',
                      border: errors.currentYear ? '2px solid #e74c3c' : '2px solid #e9ecef',
                      borderRadius: '12px',
                      fontSize: '16px',
                      transition: 'all 0.3s ease',
                      backgroundColor: '#f8f9fa',
                      outline: 'none',
                      fontFamily: 'inherit',
                      appearance: 'none',
                      backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3e%3c/svg%3e")',
                      backgroundPosition: 'right 15px center',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: '16px',
                      paddingRight: '45px'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'var(--primary-color)'
                      e.target.style.backgroundColor = 'white'
                      e.target.style.boxShadow = '0 0 0 3px rgba(0, 123, 255, 0.1)'
                    }}
                    onBlur={(e) => {
                      if (!errors.currentYear) {
                        e.target.style.borderColor = '#e9ecef'
                        e.target.style.backgroundColor = '#f8f9fa'
                        e.target.style.boxShadow = 'none'
                      }
                    }}
                  >
                    <option value="">Select your current year</option>
                    {yearOptions.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                  {formData.currentYear === 'Other' && (
                    <input
                      type="text"
                      name="otherYear"
                      value={formData.otherYear}
                      onChange={handleInputChange}
                      placeholder="Please specify your year"
                      style={{
                        width: '100%',
                        marginTop: '10px',
                        padding: '15px 18px',
                        border: '2px solid #e9ecef',
                        borderRadius: '12px',
                        fontSize: '16px',
                        transition: 'all 0.3s ease',
                        backgroundColor: '#f8f9fa',
                        outline: 'none',
                        fontFamily: 'inherit'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'var(--primary-color)'
                        e.target.style.backgroundColor = 'white'
                        e.target.style.boxShadow = '0 0 0 3px rgba(0, 123, 255, 0.1)'
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e9ecef'
                        e.target.style.backgroundColor = '#f8f9fa'
                        e.target.style.boxShadow = 'none'
                      }}
                    />
                  )}
                  {errors.currentYear && (
                    <div style={{
                      color: '#e74c3c',
                      fontSize: '13px',
                      marginTop: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                      </svg>
                      {errors.currentYear}
                    </div>
                  )}
                </div>
              </div>

              {/* Third Row - Full Width Fields */}
              <div style={{ marginBottom: window.innerWidth <= 480 ? '15px' : '20px' }}>
                {/* College Name */}
                <div className="form-group" style={{ marginBottom: window.innerWidth <= 480 ? '12px' : '16px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#2c3e50',
                    marginBottom: '8px',
                    letterSpacing: '0.3px'
                  }}>College Name *</label>
                  <select
                    name="college"
                    value={formData.college}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '15px 18px',
                      border: errors.college ? '2px solid #e74c3c' : '2px solid #e9ecef',
                      borderRadius: '12px',
                      fontSize: '16px',
                      transition: 'all 0.3s ease',
                      backgroundColor: '#f8f9fa',
                      outline: 'none',
                      fontFamily: 'inherit',
                      appearance: 'none',
                      backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3e%3c/svg%3e")',
                      backgroundPosition: 'right 15px center',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: '16px',
                      paddingRight: '45px',
                      cursor: 'pointer'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'var(--primary-color)'
                      e.target.style.backgroundColor = 'white'
                      e.target.style.boxShadow = '0 0 0 3px rgba(0, 123, 255, 0.1)'
                    }}
                    onBlur={(e) => {
                      if (!errors.college) {
                        e.target.style.borderColor = '#e9ecef'
                        e.target.style.backgroundColor = '#f8f9fa'
                        e.target.style.boxShadow = 'none'
                      }
                    }}
                  >
                    <option value="">Select your college</option>
                    {collegeOptions.map(college => (
                      <option key={college} value={college}>{college}</option>
                    ))}
                  </select>
                  {formData.college === 'Other' && (
                    <input
                      type="text"
                      name="otherCollege"
                      value={formData.otherCollege}
                      onChange={handleInputChange}
                      placeholder="Please enter your college name"
                      style={{
                        width: '100%',
                        marginTop: '10px',
                        padding: '15px 18px',
                        border: '2px solid #e9ecef',
                        borderRadius: '12px',
                        fontSize: '16px',
                        transition: 'all 0.3s ease',
                        backgroundColor: '#f8f9fa',
                        outline: 'none',
                        fontFamily: 'inherit'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'var(--primary-color)'
                        e.target.style.backgroundColor = 'white'
                        e.target.style.boxShadow = '0 0 0 3px rgba(0, 123, 255, 0.1)'
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e9ecef'
                        e.target.style.backgroundColor = '#f8f9fa'
                        e.target.style.boxShadow = 'none'
                      }}
                    />
                  )}
                  {errors.college && (
                    <div style={{
                      color: '#e74c3c',
                      fontSize: '13px',
                      marginTop: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                      </svg>
                      {errors.college}
                    </div>
                  )}
                </div>

                {/* Course */}
                <div className="form-group">
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#2c3e50',
                    marginBottom: '8px',
                    letterSpacing: '0.3px'
                  }}>Course *</label>
                  <select
                    name="course"
                    value={formData.course}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '15px 18px',
                      border: errors.course ? '2px solid #e74c3c' : '2px solid #e9ecef',
                      borderRadius: '12px',
                      fontSize: '16px',
                      transition: 'all 0.3s ease',
                      backgroundColor: '#f8f9fa',
                      outline: 'none',
                      fontFamily: 'inherit',
                      appearance: 'none',
                      backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3e%3c/svg%3e")',
                      backgroundPosition: 'right 15px center',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: '16px',
                      paddingRight: '45px',
                      cursor: 'pointer'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'var(--primary-color)'
                      e.target.style.backgroundColor = 'white'
                      e.target.style.boxShadow = '0 0 0 3px rgba(0, 123, 255, 0.1)'
                    }}
                    onBlur={(e) => {
                      if (!errors.course) {
                        e.target.style.borderColor = '#e9ecef'
                        e.target.style.backgroundColor = '#f8f9fa'
                        e.target.style.boxShadow = 'none'
                      }
                    }}
                  >
                    <option value="">Select your course</option>
                    {courseOptions.map(course => (
                      <option key={course} value={course}>{course}</option>
                    ))}
                  </select>
                  {formData.course === 'Other' && (
                    <input
                      type="text"
                      name="otherCourse"
                      value={formData.otherCourse}
                      onChange={handleInputChange}
                      placeholder="Please enter your course name"
                      style={{
                        width: '100%',
                        marginTop: '10px',
                        padding: '15px 18px',
                        border: '2px solid #e9ecef',
                        borderRadius: '12px',
                        fontSize: '16px',
                        transition: 'all 0.3s ease',
                        backgroundColor: '#f8f9fa',
                        outline: 'none',
                        fontFamily: 'inherit'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'var(--primary-color)'
                        e.target.style.backgroundColor = 'white'
                        e.target.style.boxShadow = '0 0 0 3px rgba(0, 123, 255, 0.1)'
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e9ecef'
                        e.target.style.backgroundColor = '#f8f9fa'
                        e.target.style.boxShadow = 'none'
                      }}
                    />
                  )}
                  {errors.course && (
                    <div style={{
                      color: '#e74c3c',
                      fontSize: '13px',
                      marginTop: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                      </svg>
                      {errors.course}
                    </div>
                  )}
                </div>
              </div>
              {/* Area of Interest */}
              <div className="form-group" style={{ marginBottom: window.innerWidth <= 480 ? '15px' : '20px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#2c3e50',
                  marginBottom: '12px',
                  letterSpacing: '0.3px'
                }}>Area of Interest * (Select all that apply)</label>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '15px',
                  padding: '20px',
                  background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
                  borderRadius: '15px',
                  border: errors.areaOfInterest ? '2px solid #e74c3c' : '2px solid #e9ecef'
                }}>
                  {interestOptions.map(interest => (
                    <label key={interest} style={{
                      display: 'flex',
                      alignItems: 'center',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '500',
                      padding: '12px 16px',
                      backgroundColor: formData.areaOfInterest.includes(interest) ? 'var(--primary-blue)' : 'white',
                      color: formData.areaOfInterest.includes(interest) ? 'white' : '#2c3e50',
                      borderRadius: '10px',
                      transition: 'all 0.3s ease',
                      border: '1px solid ' + (formData.areaOfInterest.includes(interest) ? 'var(--primary-blue)' : '#dee2e6'),
                      boxShadow: formData.areaOfInterest.includes(interest) ? '0 4px 12px rgba(31, 79, 216, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.05)'
                    }}
                    onMouseEnter={(e) => {
                      if (!formData.areaOfInterest.includes(interest)) {
                        e.target.style.backgroundColor = '#f1f3f4'
                        e.target.style.transform = 'translateY(-2px)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!formData.areaOfInterest.includes(interest)) {
                        e.target.style.backgroundColor = 'white'
                        e.target.style.transform = 'translateY(0)'
                      }
                    }}>
                      <input
                        type="checkbox"
                        checked={formData.areaOfInterest.includes(interest)}
                        onChange={() => handleCheckboxChange(interest)}
                        style={{ 
                          marginRight: '10px', 
                          transform: 'scale(1.2)',
                          accentColor: 'var(--primary-color)',
                          display: 'none'
                        }}
                      />
                      <div style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '4px',
                        border: '2px solid ' + (formData.areaOfInterest.includes(interest) ? 'white' : '#dee2e6'),
                        backgroundColor: formData.areaOfInterest.includes(interest) ? 'white' : 'transparent',
                        marginRight: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s ease'
                      }}>
                        {formData.areaOfInterest.includes(interest) && (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="var(--primary-blue)">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                          </svg>
                        )}
                      </div>
                      {interest}
                    </label>
                  ))}
                </div>
                {errors.areaOfInterest && (
                  <div style={{
                    color: '#e74c3c',
                    fontSize: '13px',
                    marginTop: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                    </svg>
                    {errors.areaOfInterest}
                  </div>
                )}
              </div>

              {/* Resume Upload */}
              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#2c3e50',
                  marginBottom: '12px',
                  letterSpacing: '0.3px'
                }}>Resume * (PDF, DOC, DOCX - Max 5MB)</label>
                <div style={{
                  position: 'relative',
                  border: errors.resume ? '2px dashed #e74c3c' : '2px dashed #007bff',
                  borderRadius: '15px',
                  padding: '20px',
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, #f8f9ff, #e6f3ff)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onDragOver={(e) => {
                  e.preventDefault()
                  e.currentTarget.style.borderColor = 'var(--primary-color)'
                  e.currentTarget.style.backgroundColor = '#e6f3ff'
                }}
                onDragLeave={(e) => {
                  e.currentTarget.style.borderColor = '#007bff'
                  e.currentTarget.style.backgroundColor = 'linear-gradient(135deg, #f8f9ff, #e6f3ff)'
                }}
                onClick={() => document.getElementById('resume').click()}>
                  <input
                    type="file"
                    id="resume"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                  <div style={{ marginBottom: '15px' }}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="var(--primary-color)" style={{ opacity: 0.7 }}>
                      <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                    </svg>
                  </div>
                  <h4 style={{ color: 'var(--primary-color)', margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600' }}>
                    {formData.resume ? 'File Selected' : 'Upload Your Resume'}
                  </h4>
                  <p style={{ color: '#6c757d', margin: '0 0 10px 0', fontSize: '14px' }}>
                    {formData.resume ? 'Click to change file' : 'Drag and drop or click to browse'}
                  </p>
                  <p style={{ color: '#6c757d', margin: '0', fontSize: '12px' }}>
                    Supported formats: PDF, DOC, DOCX (Max 5MB)
                  </p>
                </div>
                {formData.resume && (
                  <div style={{
                    marginTop: '15px',
                    padding: '15px 20px',
                    background: 'linear-gradient(135deg, #d4edda, #c3e6cb)',
                    borderRadius: '12px',
                    border: '1px solid #c3e6cb',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      backgroundColor: '#28a745',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '600', color: '#155724', fontSize: '14px' }}>
                        {formData.resume.fileName}
                      </div>
                      <div style={{ color: '#155724', fontSize: '12px', opacity: 0.8 }}>
                        {formatFileSize(formData.resume.fileSize)} • Ready to upload
                      </div>
                    </div>
                  </div>
                )}
                {errors.resume && (
                  <div style={{
                    color: '#e74c3c',
                    fontSize: '13px',
                    marginTop: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                    </svg>
                    {errors.resume}
                  </div>
                )}
              </div>

              {/* Terms and Conditions */}
              <div style={{
                padding: '20px',
                background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
                borderRadius: '15px',
                border: errors.agreeToTerms ? '2px solid #e74c3c' : '2px solid #e9ecef',
                marginBottom: '20px'
              }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  cursor: 'pointer',
                  fontSize: '14px',
                  lineHeight: '1.6',
                  fontWeight: '500'
                }}>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '4px',
                    border: '2px solid ' + (formData.agreeToTerms ? 'var(--primary-blue)' : '#dee2e6'),
                    backgroundColor: formData.agreeToTerms ? 'var(--primary-blue)' : 'white',
                    marginRight: '15px',
                    marginTop: '2px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    flexShrink: 0
                  }}>
                    {formData.agreeToTerms && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                    )}
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.agreeToTerms}
                    onChange={handleTermsChange}
                    style={{ display: 'none' }}
                  />
                  <span style={{ color: '#2c3e50' }}>
                    I agree to the{' '}
                    <a 
                      href="#terms" 
                      style={{ 
                        color: 'var(--primary-color)', 
                        textDecoration: 'underline',
                        fontWeight: '600'
                      }}
                      onClick={(e) => {
                        e.preventDefault()
                        alert('Terms and Conditions:\n\n1. All information provided must be accurate and truthful.\n2. Your resume and personal data will be stored securely.\n3. We may contact you regarding community events and opportunities.\n4. You can request data deletion at any time.\n5. By registering, you agree to be part of the Cloud Krishna Community.')
                      }}
                    >
                      Terms and Conditions
                    </a>
                    {' '}and{' '}
                    <a 
                      href="#privacy" 
                      style={{ 
                        color: 'var(--primary-color)', 
                        textDecoration: 'underline',
                        fontWeight: '600'
                      }}
                      onClick={(e) => {
                        e.preventDefault()
                        alert('Privacy Policy:\n\n1. Your personal information is collected solely for community purposes.\n2. We do not share your data with third parties without consent.\n3. Your resume is stored securely and accessed only by authorized personnel.\n4. You have the right to access, modify, or delete your data.\n5. We use industry-standard security measures to protect your information.')
                      }}
                    >
                      Privacy Policy
                    </a>
                    . I understand that my information will be used for community purposes and I consent to being contacted regarding relevant opportunities and events.
                  </span>
                </label>
                {errors.agreeToTerms && (
                  <div style={{
                    color: '#e74c3c',
                    fontSize: '13px',
                    marginTop: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    marginLeft: '35px'
                  }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                    </svg>
                    {errors.agreeToTerms}
                  </div>
                )}
              </div>

              {errors.submit && (
                <div style={{
                  textAlign: 'center',
                  padding: '15px 20px',
                  background: 'linear-gradient(135deg, #f8d7da, #f5c6cb)',
                  borderRadius: '12px',
                  marginBottom: '25px',
                  border: '1px solid #f5c6cb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  color: '#721c24'
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                  </svg>
                  {errors.submit}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting || !formData.agreeToTerms}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  fontSize: '16px',
                  fontWeight: '500',
                  padding: '16px 32px',
                  height: '48px',
                  opacity: isSubmitting || !formData.agreeToTerms ? 0.5 : 1,
                  cursor: isSubmitting || !formData.agreeToTerms ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px'
                }}
              >
                {isSubmitting && (
                  <div style={{
                    width: '20px',
                    height: '20px',
                    border: '3px solid rgba(255, 255, 255, 0.3)',
                    borderTop: '3px solid white',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite'
                  }}></div>
                )}
                {isSubmitting ? 'Submitting...' : 'Join Cloud Krishna Community'}
              </button>
            </form>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  )
}

export default RegistrationForm
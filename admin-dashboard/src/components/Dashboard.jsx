import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Dashboard = ({ onLogout, adminData }) => {
  const [users, setUsers] = useState([])
  const [stats, setStats] = useState({})
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedUser, setSelectedUser] = useState(null)

  const API_BASE = 'http://localhost:5555/api/admin'

  // Get auth headers
  const getAuthHeaders = () => ({
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
    }
  })

  // Fetch dashboard data
  useEffect(() => {
    fetchDashboardStats()
    fetchUsers()
  }, [currentPage, searchTerm])

  const fetchDashboardStats = async () => {
    try {
      const response = await axios.get(`${API_BASE}/dashboard-stats`, getAuthHeaders())
      setStats(response.data.data)
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    }
  }

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${API_BASE}/users`, {
        ...getAuthHeaders(),
        params: {
          page: currentPage,
          limit: 10,
          search: searchTerm
        }
      })
      setUsers(response.data.data.users)
    } catch (error) {
      console.error('Failed to fetch users:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteUser = async (userId) => {
    if (!confirm('Are you sure you want to delete this user?')) return

    try {
      await axios.delete(`${API_BASE}/users/${userId}`, getAuthHeaders())
      fetchUsers() // Refresh list
      fetchDashboardStats() // Update stats
      alert('User deleted successfully')
    } catch (error) {
      alert('Failed to delete user')
    }
  }

  const downloadResume = async (userId, fileName) => {
    try {
      const response = await axios.get(`http://localhost:5555/api/users/resume/${userId}`, {
        responseType: 'blob'
      })
      
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', fileName)
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (error) {
      alert('Failed to download resume')
    }
  }

  const exportUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE}/export-users`, {
        ...getAuthHeaders(),
        responseType: 'blob'
      })
      
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'users-export.csv')
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (error) {
      alert('Failed to export users')
    }
  }

  return (
    <div className="admin-container">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px' }}>
              <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
            </svg>
            Cloud Krishna Admin
          </h1>
          <p style={{ margin: '5px 0 0 0', opacity: 0.9, fontSize: '14px' }}>
            Welcome, {adminData?.fullName || adminData?.username || 'Admin'} 
            {adminData?.isDefault && ' (Demo Account)'}
          </p>
        </div>
        <div className="header-actions">
          <button onClick={exportUsers} className="btn-success">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '6px' }}>
              <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
            </svg>
            Export CSV
          </button>
          <button onClick={onLogout} className="btn-danger">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '6px' }}>
              <path d="M16 17v-3H9v-4h7V7l5 5-5 5M14 2a2 2 0 0 1 2 2v2h-2V4H4v16h10v-2h2v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10z"/>
            </svg>
            Logout
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="#667eea">
                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </span>
            <div className="stat-number">{stats.totalUsers || 0}</div>
            <div className="stat-label">Total Students</div>
          </div>
          <div className="stat-card">
            <span className="stat-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="#667eea">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </span>
            <div className="stat-number">{stats.todayRegistrations || 0}</div>
            <div className="stat-label">Today's Registrations</div>
          </div>
          <div className="stat-card">
            <span className="stat-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="#667eea">
                <path d="M12 14l9-5-9-5-9 5 9 5z"/>
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
              </svg>
            </span>
            <div className="stat-number">{stats.usersByYear?.length || 0}</div>
            <div className="stat-label">Academic Years</div>
          </div>
          <div className="stat-card">
            <span className="stat-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="#667eea">
                <path d="M7 4V2a1 1 0 0 1 2 0v2h6V2a1 1 0 0 1 2 0v2h1a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h1zM6 6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H6z"/>
              </svg>
            </span>
            <div className="stat-number">{stats.usersByInterest?.length || 0}</div>
            <div className="stat-label">Interest Areas</div>
          </div>
        </div>

        {/* Users Table */}
        <div className="users-section">
          <div className="section-header">
            <h3 className="section-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px' }}>
                <path d="M16 4v4h4V4h-4zm-2-2h8v8h-8V2zm2 10v4h4v-4h-4zm-2-2h8v8h-8v-8zM4 4v4h4V4H4zM2 2h8v8H2V2zm2 10v4h4v-4H4zm-2-2h8v8H2v-8z"/>
              </svg>
              Student Management
            </h3>
            <input
              type="text"
              className="search-input"
              placeholder="🔍 Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {loading ? (
            <div className="loading-spinner">
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="#667eea">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" strokeDasharray="32" strokeDashoffset="32" opacity="0.3"/>
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" strokeDasharray="32" strokeDashoffset="24"/>
                </svg>
              </div>
              Loading students data...
            </div>
          ) : (
            <div className="table-container">
              <table className="users-table">
                <thead>
                  <tr>
                    <th>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '6px' }}>
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                      Name
                    </th>
                    <th>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '6px' }}>
                        <path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z"/>
                      </svg>
                      Email
                    </th>
                    <th>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '6px' }}>
                        <path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z"/>
                      </svg>
                      Mobile
                    </th>
                    <th>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '6px' }}>
                        <path d="M12 3L1 9L12 15L21 10.09V17H23V9M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z"/>
                      </svg>
                      College
                    </th>
                    <th>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '6px' }}>
                        <path d="M19,3H5C3.9,3 3,3.9 3,5V19C3,20.1 3.9,21 5,21H19C20.1,21 21,20.1 21,19V5C21,3.9 20.1,3 19,3M5,19V5H19V19H5Z"/>
                      </svg>
                      Course
                    </th>
                    <th>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '6px' }}>
                        <path d="M9,10V12H7V10H9M13,10V12H11V10H13M17,10V12H15V10H17M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5A2,2 0 0,1 5,3H6V1H8V3H16V1H18V3H19M19,19V8H5V19H19M9,14V16H7V14H9M13,14V16H11V14H13M17,14V16H15V14H17Z"/>
                      </svg>
                      Year
                    </th>
                    <th>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '6px' }}>
                        <path d="M9,10V12H7V10H9M13,10V12H11V10H13M17,10V12H15V10H17M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5A2,2 0 0,1 5,3H6V1H8V3H16V1H18V3H19M19,19V8H5V19H19M9,14V16H7V14H9M13,14V16H11V14H13M17,14V16H15V14H17Z"/>
                      </svg>
                      Registered
                    </th>
                    <th>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '6px' }}>
                        <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.22,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.22,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"/>
                      </svg>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td style={{ fontWeight: '600' }}>{user.fullName}</td>
                      <td>{user.email}</td>
                      <td>{user.mobileNumber}</td>
                      <td>{user.college}</td>
                      <td>{user.course}</td>
                      <td>
                        <span style={{
                          background: (() => {
                            const yearColors = {
                              '1st Year': 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
                              '2nd Year': 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
                              '3rd Year': 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                              '4th Year': 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
                              'Final Year': 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
                              'Graduated': 'linear-gradient(135deg, #1F4FD8 0%, #0B1C3D 100%)'
                            }
                            return yearColors[user.currentYear] || 'linear-gradient(135deg, #6B7280 0%, #4B5563 100%)'
                          })(),
                          color: 'white',
                          padding: '6px 12px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: '600',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                        }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 3L1 9L12 15L21 10.09V17H23V9M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z"/>
                          </svg>
                          {user.currentYear}
                        </span>
                      </td>
                      <td>{new Date(user.registeredAt).toLocaleDateString()}</td>
                      <td>
                        <div className="action-buttons">
                          <button
                            onClick={() => setSelectedUser(user)}
                            className="btn-sm btn-info"
                            title="View Details"
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '4px' }}>
                              <path d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z"/>
                            </svg>
                            View
                          </button>
                          <button
                            onClick={() => downloadResume(user._id, user.resume?.fileName || 'resume.pdf')}
                            className="btn-sm btn-success-sm"
                            title="Download Resume"
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '4px' }}>
                              <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                            </svg>
                            Resume
                          </button>
                          <button
                            onClick={() => deleteUser(user._id)}
                            className="btn-sm btn-danger-sm"
                            title="Delete User"
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '4px' }}>
                              <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"/>
                            </svg>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* User Detail Modal */}
      {selectedUser && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px' }}>
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
              Student Profile
            </h3>
            
            <div className="user-detail">
              <div className="detail-label">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#1F4FD8" style={{ marginRight: '6px' }}>
                  <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 4V6C15 7.1 14.1 8 13 8H11C9.9 8 9 7.1 9 6V4L3 7V9L9 12V22H11V16L15 18V22H17V16L21 12V9Z"/>
                </svg>
                Full Name
              </div>
              <div className="detail-value">{selectedUser.fullName}</div>
            </div>
            
            <div className="user-detail">
              <div className="detail-label">📧 Email Address</div>
              <div className="detail-value">{selectedUser.email}</div>
            </div>
            
            <div className="user-detail">
              <div className="detail-label">📱 Mobile Number</div>
              <div className="detail-value">{selectedUser.mobileNumber}</div>
            </div>
            
            <div className="user-detail">
              <div className="detail-label">🏫 College</div>
              <div className="detail-value">{selectedUser.college}</div>
            </div>
            
            <div className="user-detail">
              <div className="detail-label">📚 Course</div>
              <div className="detail-value">{selectedUser.course}</div>
            </div>
            
            <div className="user-detail">
              <div className="detail-label">📅 Academic Year</div>
              <div className="detail-value">{selectedUser.currentYear}</div>
            </div>
            
            <div className="user-detail">
              <div className="detail-label">🎯 Areas of Interest</div>
              <div className="interests-tags">
                {selectedUser.areaOfInterest.map((interest, index) => (
                  <span key={index} className="interest-tag">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="user-detail">
              <div className="detail-label">📆 Registration Date</div>
              <div className="detail-value">
                {new Date(selectedUser.registeredAt).toLocaleString()}
              </div>
            </div>
            
            <div className="modal-actions">
              <button
                onClick={() => setSelectedUser(null)}
                className="btn-secondary"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '6px' }}>
                  <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
                </svg>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
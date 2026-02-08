# Cloud Krishna - Technical Specifications

## 📋 Table of Contents
1. [System Requirements](#system-requirements)
2. [Technology Stack](#technology-stack)
3. [API Specifications](#api-specifications)
4. [Database Schema](#database-schema)
5. [File Structure](#file-structure)
6. [Configuration](#configuration)
7. [Error Codes](#error-codes)
8. [Performance Benchmarks](#performance-benchmarks)

---

## 💻 System Requirements

### Development Environment
- **Node.js**: v16.0.0 or higher
- **npm**: v8.0.0 or higher
- **MongoDB**: v5.0 or higher
- **Git**: v2.30 or higher
- **OS**: Windows 10/11, macOS 10.15+, Ubuntu 18.04+

### Production Environment
- **CPU**: 2+ cores
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 20GB minimum
- **Network**: 100Mbps minimum
- **SSL Certificate**: Required for HTTPS

---

## 🛠️ Technology Stack

### Frontend Stack
```
React 18.2.0
├── Vite 5.0.8 (Build tool)
├── Axios 1.6.0 (HTTP client)
├── CSS3 (Styling)
└── JavaScript ES6+ (Language)
```

### Backend Stack
```
Node.js 18+
├── Express 4.18.2 (Web framework)
├── MongoDB 8.0.3 (Database)
├── Mongoose 8.0.3 (ODM)
├── JWT 9.0.3 (Authentication)
├── Bcrypt 3.0.3 (Password hashing)
├── Helmet 7.1.0 (Security)
├── CORS 2.8.5 (Cross-origin)
├── Validator 13.15.26 (Input validation)
└── Multer 2.0.2 (File upload)
```

### Development Tools
```
Development
├── Nodemon 3.0.2 (Auto-restart)
├── ESLint (Code linting)
├── Prettier (Code formatting)
└── Git (Version control)
```

---

## 🔌 API Specifications

### Base Configuration
```
Base URL: http://localhost:5555/api
Content-Type: application/json
Timeout: 30 seconds
Rate Limit: 5 requests per 15 minutes (registration)
```

### Authentication
```
Type: JWT Bearer Token
Header: Authorization: Bearer <token>
Expiry: 24 hours
Algorithm: HS256
```

---

## 📝 Detailed API Documentation

### 1. User Registration

**Endpoint:** `POST /api/users/register`

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "john.doe@example.com",
  "mobileNumber": "9876543210",
  "college": "ABC University",
  "course": "B.Tech Computer Science",
  "currentYear": "3rd Year",
  "areaOfInterest": ["Cloud Computing", "Web Development"],
  "resume": {
    "fileName": "john_resume.pdf",
    "fileData": "base64-encoded-file-data",
    "fileType": "application/pdf",
    "fileSize": 1048576
  },
  "agreeToTerms": true
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Registration successful! Welcome to Cloud Krishna Community.",
  "data": {
    "id": "65f1a2b3c4d5e6f7g8h9i0j1",
    "fullName": "John Doe",
    "email": "john.doe@example.com",
    "college": "ABC University",
    "course": "B.Tech Computer Science",
    "currentYear": "3rd Year",
    "areaOfInterest": ["Cloud Computing", "Web Development"],
    "registeredAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email address"
    }
  ]
}
```

**Error Response (409):**
```json
{
  "success": false,
  "message": "A user with this email address already exists",
  "field": "email"
}
```

### 2. Get Registration Statistics

**Endpoint:** `GET /api/users/stats`

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "totalUsers": 1250,
    "usersByYear": [
      { "_id": "3rd Year", "count": 450 },
      { "_id": "2nd Year", "count": 380 },
      { "_id": "4th Year", "count": 220 }
    ],
    "usersByInterest": [
      { "_id": "Cloud Computing", "count": 680 },
      { "_id": "Web Development", "count": 520 },
      { "_id": "Data Science", "count": 340 }
    ],
    "usersByCourse": [
      { "_id": "B.Tech Computer Science", "count": 580 },
      { "_id": "BCA", "count": 320 },
      { "_id": "MCA", "count": 180 }
    ],
    "recentRegistrations": [
      {
        "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
        "fullName": "John Doe",
        "college": "ABC University",
        "registeredAt": "2024-01-15T10:30:00.000Z"
      }
    ]
  }
}
```

### 3. Download Resume

**Endpoint:** `GET /api/users/resume/:userId`

**Parameters:**
- `userId`: MongoDB ObjectId (24 character hex string)

**Success Response (200):**
```
Content-Type: application/pdf
Content-Disposition: attachment; filename="John_Doe_resume_john_resume.pdf"
Content-Length: 1048576
Cache-Control: no-cache

[Binary file data]
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "User not found"
}
```

### 4. Admin Login

**Endpoint:** `POST /api/admin/login`

**Request Body:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "admin": {
    "username": "admin",
    "email": "admin@cloudkrishna.com",
    "fullName": "System Administrator",
    "role": "admin"
  }
}
```

### 5. Get All Users (Admin)

**Endpoint:** `GET /api/admin/users`

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `search`: Search term (optional)

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "users": [
      {
        "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
        "fullName": "John Doe",
        "email": "john.doe@example.com",
        "mobileNumber": "9876543210",
        "college": "ABC University",
        "course": "B.Tech Computer Science",
        "currentYear": "3rd Year",
        "areaOfInterest": ["Cloud Computing", "Web Development"],
        "registeredAt": "2024-01-15T10:30:00.000Z",
        "isActive": true
      }
    ],
    "pagination": {
      "current": 1,
      "pages": 125,
      "total": 1250
    }
  }
}
```

### 6. Dashboard Statistics (Admin)

**Endpoint:** `GET /api/admin/dashboard-stats`

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "totalUsers": 1250,
    "todayRegistrations": 15,
    "usersByYear": [
      { "_id": "3rd Year", "count": 450 },
      { "_id": "2nd Year", "count": 380 }
    ],
    "usersByInterest": [
      { "_id": "Cloud Computing", "count": 680 },
      { "_id": "Web Development", "count": 520 }
    ],
    "recentUsers": [
      {
        "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
        "fullName": "John Doe",
        "email": "john.doe@example.com",
        "college": "ABC University",
        "registeredAt": "2024-01-15T10:30:00.000Z"
      }
    ]
  }
}
```

---

## 🗄️ Database Schema

### Users Collection

```javascript
{
  _id: ObjectId,
  fullName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100,
    validate: {
      validator: function(v) {
        return /^[a-zA-Z\s'-]+$/.test(v);
      },
      message: 'Full name can only contain letters, spaces, hyphens, and apostrophes'
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function(v) {
        return /^\S+@\S+\.\S+$/.test(v);
      },
      message: 'Please provide a valid email address'
    }
  },
  mobileNumber: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(v) {
        return /^[6-9]\d{9}$/.test(v);
      },
      message: 'Please provide a valid 10-digit mobile number starting with 6-9'
    }
  },
  college: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 200
  },
  course: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100
  },
  currentYear: {
    type: String,
    required: true,
    enum: ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Final Year', 'Graduated']
  },
  areaOfInterest: [{
    type: String,
    enum: [
      'Cloud Computing', 'Web Development', 'Mobile Development', 'Data Science',
      'Machine Learning', 'AI', 'Cybersecurity', 'DevOps', 'Blockchain',
      'IoT', 'Game Development', 'UI/UX Design', 'Digital Marketing'
    ]
  }],
  resume: {
    fileName: {
      type: String,
      required: true
    },
    fileData: {
      type: String,
      required: true
    },
    fileType: {
      type: String,
      required: true,
      enum: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    },
    fileSize: {
      type: Number,
      required: true,
      max: 5242880 // 5MB
    }
  },
  registeredAt: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  }
}
```

### Indexes
```javascript
// Compound index for efficient queries
db.users.createIndex({ "email": 1, "isActive": 1 })
db.users.createIndex({ "mobileNumber": 1, "isActive": 1 })
db.users.createIndex({ "registeredAt": -1 })
db.users.createIndex({ "college": 1 })
db.users.createIndex({ "currentYear": 1 })
db.users.createIndex({ "areaOfInterest": 1 })
```

### Admins Collection

```javascript
{
  _id: ObjectId,
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 20
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /^\S+@\S+\.\S+$/
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  role: {
    type: String,
    default: 'admin',
    enum: ['admin', 'super-admin']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date
  }
}
```

---

## 📁 File Structure

```
cloudkrishna/
├── backend/
│   ├── config/
│   │   └── database.js              # MongoDB connection
│   ├── controllers/
│   │   └── userController.js        # User business logic
│   ├── middleware/
│   │   ├── validation.js            # Input validation middleware
│   │   ├── errorHandler.js          # Global error handler
│   │   └── upload.js                # File upload middleware
│   ├── models/
│   │   ├── User.js                  # User schema
│   │   └── Admin.js                 # Admin schema
│   ├── routes/
│   │   ├── users.js                 # User routes
│   │   └── admin.js                 # Admin routes
│   ├── utils/
│   │   ├── sanitizer.js             # Input sanitization
│   │   └── fileValidator.js         # File validation
│   ├── .env.example                 # Environment template
│   ├── package.json                 # Dependencies
│   └── server.js                    # Entry point
├── frontend/
│   ├── public/
│   │   ├── cloud-krishna-logo.jpeg  # Logo
│   │   └── index.html               # HTML template
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx           # Navigation
│   │   │   ├── Hero.jsx             # Hero section
│   │   │   ├── About.jsx            # About section
│   │   │   ├── Benefits.jsx         # Benefits section
│   │   │   ├── RegistrationForm.jsx # Main form
│   │   │   └── Footer.jsx           # Footer
│   │   ├── services/
│   │   │   └── api.js               # API service
│   │   ├── styles/
│   │   │   └── modern.css           # Component styles
│   │   ├── utils/
│   │   │   └── validation.js        # Form validation
│   │   ├── App.jsx                  # Main app
│   │   ├── main.jsx                 # Entry point
│   │   └── index.css                # Global styles
│   ├── .env                         # Environment variables
│   ├── package.json                 # Dependencies
│   └── vite.config.js               # Vite configuration
├── admin-dashboard/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.jsx            # Admin login
│   │   │   ├── Dashboard.jsx        # Main dashboard
│   │   │   └── AdminRegister.jsx    # Admin registration
│   │   ├── services/
│   │   │   └── adminApi.js          # Admin API service
│   │   ├── App.jsx                  # Admin app
│   │   └── index.css                # Admin styles
│   └── package.json                 # Dependencies
├── docs/
│   ├── PROJECT_DOCUMENTATION.md     # Complete documentation
│   ├── TECHNICAL_SPECS.md           # Technical specifications
│   ├── SETUP.md                     # Setup guide
│   └── SECURITY.md                  # Security checklist
└── README.md                        # Project overview
```

---

## ⚙️ Configuration

### Environment Variables

#### Backend (.env)
```env
# Server Configuration
PORT=5555
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cloudkrishna?retryWrites=true&w=majority

# Security Configuration
JWT_SECRET=your-super-secret-jwt-key-here-change-in-production-min-32-chars

# CORS Configuration (comma-separated)
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173,http://localhost:3001

# File Upload Configuration
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=5
```

#### Frontend (.env)
```env
# API Configuration
VITE_API_URL=http://localhost:5555/api
VITE_ADMIN_URL=http://localhost:3001

# App Configuration
VITE_APP_NAME=Cloud Krishna Community
VITE_APP_VERSION=1.0.0
VITE_APP_DESCRIPTION=Student Community Platform for Cloud Computing

# Feature Flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEBUG=true
```

---

## ❌ Error Codes

### HTTP Status Codes

| Code | Status | Description |
|------|--------|-------------|
| 200 | OK | Request successful |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Invalid request data |
| 401 | Unauthorized | Authentication required |
| 403 | Forbidden | Access denied |
| 404 | Not Found | Resource not found |
| 409 | Conflict | Resource already exists |
| 422 | Unprocessable Entity | Validation failed |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server error |
| 503 | Service Unavailable | Database not connected |

### Custom Error Codes

| Code | Type | Description |
|------|------|-------------|
| USR001 | Validation | Invalid email format |
| USR002 | Validation | Invalid mobile number |
| USR003 | Validation | Invalid file type |
| USR004 | Validation | File size too large |
| USR005 | Conflict | Email already exists |
| USR006 | Conflict | Mobile number already exists |
| ADM001 | Authentication | Invalid credentials |
| ADM002 | Authorization | Insufficient permissions |
| SYS001 | System | Database connection failed |
| SYS002 | System | File processing error |

---

## 📊 Performance Benchmarks

### Response Time Targets

| Endpoint | Target | Acceptable | Critical |
|----------|--------|------------|----------|
| GET /api/users/stats | < 200ms | < 500ms | > 1s |
| POST /api/users/register | < 1s | < 2s | > 5s |
| GET /api/admin/users | < 300ms | < 800ms | > 2s |
| GET /api/users/resume/:id | < 2s | < 5s | > 10s |

### Throughput Targets

| Metric | Target | Peak |
|--------|--------|------|
| Concurrent Users | 100 | 500 |
| Requests/Second | 50 | 200 |
| File Uploads/Hour | 1000 | 5000 |
| Database Queries/Second | 100 | 500 |

### Resource Usage

| Resource | Development | Production |
|----------|-------------|------------|
| CPU Usage | < 30% | < 70% |
| Memory Usage | < 512MB | < 2GB |
| Disk I/O | < 10MB/s | < 50MB/s |
| Network I/O | < 5MB/s | < 25MB/s |

---

## 🔍 Monitoring & Logging

### Log Levels

| Level | Usage | Example |
|-------|-------|---------|
| ERROR | System errors | Database connection failed |
| WARN | Warnings | Rate limit approaching |
| INFO | General info | User registered successfully |
| DEBUG | Debug info | Validation passed for field X |

### Metrics to Monitor

1. **Application Metrics**
   - Response times
   - Error rates
   - Throughput
   - Active users

2. **System Metrics**
   - CPU usage
   - Memory usage
   - Disk space
   - Network traffic

3. **Business Metrics**
   - Registration rate
   - Conversion rate
   - User engagement
   - Feature usage

---

This technical specification provides comprehensive details about the Cloud Krishna project's implementation, configuration, and operational requirements.
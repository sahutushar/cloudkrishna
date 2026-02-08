# Cloud Krishna - Complete Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB
- Git

### 1. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:
```env
PORT=5555
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cloudkrishna?retryWrites=true&w=majority
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key-here-change-in-production
```

Start backend:
```bash
npm run dev
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### 3. Admin Dashboard Setup

```bash
cd admin-dashboard
npm install
npm run dev
```

## 🔧 Environment Variables

### Backend (.env)
```env
PORT=5555
MONGODB_URI=your-mongodb-connection-string
NODE_ENV=development
JWT_SECRET=your-jwt-secret-key
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5555/api
VITE_ADMIN_URL=http://localhost:3001
VITE_APP_NAME=Cloud Krishna Community
VITE_APP_VERSION=1.0.0
```

## 🔐 Admin Access

### Default Admin Credentials
- Username: `admin`
- Password: `admin123`

### Secret Access Methods
1. **URL Hash**: Add `#admin-secret-2024` to the main site URL
2. **Keyboard Shortcut**: Press `Ctrl + Shift + A` on the main site

## 🛠️ Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Kill process on port 5555
   npx kill-port 5555
   ```

2. **MongoDB Connection Failed**
   - Check your MongoDB URI
   - Ensure IP whitelist includes your IP
   - Verify network access

3. **CORS Errors**
   - Check if backend is running on port 5555
   - Verify CORS configuration in server.js

4. **File Upload Issues**
   - Ensure file size is under 5MB
   - Only PDF, DOC, DOCX files are allowed

## 📱 Mobile Responsiveness

The application is fully mobile responsive with:
- Hamburger navigation menu
- Touch-friendly interfaces
- Optimized layouts for all screen sizes
- Responsive forms and components

## 🔒 Security Features

- Input sanitization
- File upload validation
- Rate limiting
- CORS protection
- JWT authentication
- Environment variable validation

## 🚀 Deployment

### Backend (Railway/Heroku)
1. Set environment variables
2. Deploy from GitHub
3. Update CORS origins

### Frontend (Vercel/Netlify)
1. Build: `npm run build`
2. Set environment variables
3. Deploy dist folder

### Admin Dashboard
1. Build: `npm run build`
2. Deploy separately or as subdomain

## 📊 Features

- ✅ Student registration with validation
- ✅ File upload (PDF resumes)
- ✅ Admin dashboard with statistics
- ✅ Mobile responsive design
- ✅ Professional UI/UX
- ✅ Security best practices
- ✅ Error handling
- ✅ Form validation

## 🤝 Support

For issues or questions:
1. Check this setup guide
2. Review error logs
3. Verify environment variables
4. Check network connectivity
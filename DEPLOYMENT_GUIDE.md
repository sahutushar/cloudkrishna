# 🚀 Cloud Krishna Deployment Guide

## Quick Deploy (15 minutes)

### **Option 1: Vercel + Render (FREE)**

#### **A. Deploy Backend to Render**

1. **Create Render Account**: https://render.com
2. **New Web Service** → Connect GitHub repo
3. **Configure**:
   ```
   Name: cloudkrishna-backend
   Root Directory: backend
   Build Command: npm install
   Start Command: npm start
   ```
4. **Environment Variables** (Add in Render dashboard):
   ```
   PORT=5555
   NODE_ENV=production
   MONGODB_URI=your_mongodb_connection_string_here
   JWT_SECRET=your_jwt_secret_here
   JWT_EXPIRE=7d
   AZURE_STORAGE_CONNECTION_STRING=your_azure_connection_string_here
   AZURE_CONTAINER_NAME=resumes
   ALLOWED_ORIGINS=https://your-frontend.vercel.app
   ```
5. **Deploy** → Copy backend URL (e.g., `https://cloudkrishna-backend.onrender.com`)

#### **B. Deploy Frontend to Vercel**

1. **Create Vercel Account**: https://vercel.com
2. **Import Project** → Select `frontend` folder
3. **Configure**:
   ```
   Framework Preset: Vite
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: dist
   ```
4. **Environment Variables**:
   ```
   VITE_API_URL=https://cloudkrishna-backend.onrender.com/api
   ```
5. **Deploy** → Copy frontend URL

#### **C. Deploy Admin Dashboard to Vercel**

1. **New Project** → Select `admin-dashboard` folder
2. **Configure**:
   ```
   Framework Preset: Vite
   Root Directory: admin-dashboard
   Build Command: npm run build
   Output Directory: dist
   ```
3. **Environment Variables**:
   ```
   VITE_API_URL=https://cloudkrishna-backend.onrender.com/api
   ```
4. **Deploy** → Copy admin URL

#### **D. Update CORS in Backend**

Go back to Render → Environment Variables → Update:
```
ALLOWED_ORIGINS=https://your-frontend.vercel.app,https://your-admin.vercel.app
```

---

### **Option 2: Railway (EASIEST)**

1. **Create Railway Account**: https://railway.app
2. **New Project** → Deploy from GitHub
3. **Add Services**:
   - Backend (auto-detected)
   - Frontend (auto-detected)
   - Admin Dashboard (auto-detected)
4. **Add Environment Variables** (same as above)
5. **Deploy** → Railway handles everything

**Cost**: $5/month after 500 hours free

---

### **Option 3: Azure App Service**

#### **Backend Deployment**

```bash
# Install Azure CLI
# https://learn.microsoft.com/en-us/cli/azure/install-azure-cli

# Login
az login

# Create resource group
az group create --name cloudkrishna-rg --location eastus

# Create App Service plan
az appservice plan create --name cloudkrishna-plan --resource-group cloudkrishna-rg --sku B1 --is-linux

# Create web app
az webapp create --resource-group cloudkrishna-rg --plan cloudkrishna-plan --name cloudkrishna-backend --runtime "NODE:18-lts"

# Configure environment variables
az webapp config appsettings set --resource-group cloudkrishna-rg --name cloudkrishna-backend --settings \
  PORT=5555 \
  NODE_ENV=production \
  MONGODB_URI="mongodb+srv://..." \
  JWT_SECRET="..." \
  AZURE_STORAGE_CONNECTION_STRING="..." \
  AZURE_CONTAINER_NAME=resumes

# Deploy
cd backend
zip -r deploy.zip .
az webapp deployment source config-zip --resource-group cloudkrishna-rg --name cloudkrishna-backend --src deploy.zip
```

#### **Frontend Deployment**

```bash
# Build frontend
cd frontend
npm run build

# Create static web app
az staticwebapp create --name cloudkrishna-frontend --resource-group cloudkrishna-rg --location eastus

# Deploy (or use Azure Static Web Apps GitHub Action)
```

---

## 🔧 Pre-Deployment Checklist

### **1. Update MongoDB Atlas IP Whitelist**
- Go to MongoDB Atlas → Network Access
- Add: `0.0.0.0/0` (allow all) for production
- Or add specific IPs from Render/Vercel

### **2. Update Frontend API URLs**

Create `.env.production` files:

**frontend/.env.production**:
```env
VITE_API_URL=https://your-backend-url.com/api
```

**admin-dashboard/.env.production**:
```env
VITE_API_URL=https://your-backend-url.com/api
```

### **3. Update CORS Origins**

In `backend/server.js`, ensure CORS is configured:
```javascript
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:5173'];
```

### **4. Security Updates**

- Change `JWT_SECRET` to a strong random string
- Update admin credentials in production
- Enable HTTPS only

---

## 📊 Post-Deployment Testing

### **Test Backend**
```bash
curl https://your-backend-url.com/api/health
```

### **Test Frontend**
1. Open frontend URL
2. Fill registration form
3. Upload resume
4. Check MongoDB for new entry

### **Test Admin Dashboard**
1. Open admin URL
2. Login with credentials
3. View registered users
4. Download resume

---

## 🐛 Common Issues

### **Issue 1: CORS Error**
**Solution**: Update `ALLOWED_ORIGINS` in backend environment variables

### **Issue 2: MongoDB Connection Failed**
**Solution**: Add deployment platform IP to MongoDB Atlas whitelist

### **Issue 3: Azure Blob Upload Failed**
**Solution**: Verify `AZURE_STORAGE_CONNECTION_STRING` is correct

### **Issue 4: 404 on Frontend Routes**
**Solution**: Add `vercel.json` or configure rewrites

---

## 💰 Cost Breakdown

### **Free Tier (Recommended for Start)**
- **Render**: Free (backend sleeps after 15 min inactivity)
- **Vercel**: Free (frontend + admin)
- **MongoDB Atlas**: Free (M0 cluster)
- **Azure Blob**: ~$1/month
- **Total**: ~$1/month

### **Production Tier**
- **Render**: $7/month (always on)
- **Vercel**: Free
- **MongoDB Atlas**: $9/month (M2 cluster)
- **Azure Blob**: ~$5/month
- **Total**: ~$21/month

---

## 🎯 Recommended: Start with Vercel + Render

**Why?**
- ✅ Free to start
- ✅ Easy setup (no CLI needed)
- ✅ Auto-deploy on git push
- ✅ Built-in SSL
- ✅ Global CDN
- ✅ Easy to scale

**Next Steps**:
1. Push code to GitHub
2. Connect Render to GitHub (backend)
3. Connect Vercel to GitHub (frontend + admin)
4. Add environment variables
5. Deploy! 🚀

---

## 📞 Need Help?

If you encounter issues:
1. Check deployment logs
2. Verify environment variables
3. Test API endpoints
4. Check MongoDB Atlas IP whitelist
5. Ask me for help! 😊

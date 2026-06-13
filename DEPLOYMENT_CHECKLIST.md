# 🚀 NotesGenAI Deployment Checklist

## ✅ Deployment Status: FIXED & READY

### **Issues Fixed:**
- ✅ Backend PORT changed from 5000 → 3000 (consistent with render.yaml)
- ✅ Environment variable naming: Added fallback for MONGODB_URL and MONGODB_URI
- ✅ Vite preview port updated: 4173 → 3000
- ✅ render.yaml updated with rootDir specification for both services
- ✅ Build commands simplified and optimized

---

## 📋 Pre-Deployment Checklist

### **1. Local Setup**
- [ ] Clone repository: `git clone https://github.com/VimarshS/NotesGenAI.git`
- [ ] Install server dependencies: `cd server && npm install`
- [ ] Install client dependencies: `cd ../client && npm install`
- [ ] Create `.env` files with all required variables (see below)

### **2. Environment Variables Required**

#### **Backend Server (.env in `/server`)**
```
MONGODB_URI=<your-mongodb-connection-string>
GEMINI_API_KEY=<your-google-gemini-api-key>
JWT_SECRET=<your-jwt-secret-key>
FIREBASE_PROJECT_ID=<your-firebase-project-id>
FIREBASE_PRIVATE_KEY=<your-firebase-private-key>
FIREBASE_CLIENT_EMAIL=<your-firebase-client-email>
STRIPE_SECRET_KEY=<your-stripe-secret-key>
STRIPE_WEBHOOK_SECRET=<your-stripe-webhook-secret>
CLIENT_URL=http://localhost:5173 (for local dev)
PORT=3000 (optional, defaults to 3000)
```

#### **Frontend Client (.env in `/client`)**
```
VITE_API_URL=http://localhost:3000 (for local dev)
```

### **3. Local Testing**
```bash
# Terminal 1: Backend
cd server
npm run dev

# Terminal 2: Frontend (in new terminal)
cd client
npm run dev
```

- [ ] Backend running on: `http://localhost:3000`
- [ ] Frontend running on: `http://localhost:5173`
- [ ] API calls work without CORS errors
- [ ] Authentication flow works (Firebase login)
- [ ] Note generation works
- [ ] PDF export works

### **4. Deployment to Render**

#### **Step 1: Push to GitHub**
```bash
git add .
git commit -m "Fix deployment configurations - ready for Render"
git push origin main
```

#### **Step 2: Create Render Services**

**Option A: Using render.yaml (Recommended - Deploy Both Services)**
1. Go to [render.com/dashboard](https://render.com/dashboard)
2. Click **"New +"** → **"Web Service"**
3. Select **"Build and deploy from Git repository"**
4. Connect `VimarshS/NotesGenAI` repository
5. Render will auto-detect `render.yaml` from root
6. Click **"Deploy"**
7. Render will automatically create and deploy both services

**Option B: Manual Setup (Deploy Each Service Separately)**

**Backend Service:**
1. Create new Web Service
2. Name: `notesgenai-backend`
3. Environment: `Node`
4. Build Command: `npm install`
5. Start Command: `node index.js`
6. **Root Directory**: `server`
7. Add environment variables (from Render Dashboard)
8. Deploy

**Frontend Service:**
1. Create new Web Service
2. Name: `notesgenai-frontend`
3. Environment: `Node`
4. Build Command: `npm install && npm run build`
5. Start Command: `node server.js`
6. **Root Directory**: `client`
7. Add environment variables
8. Deploy

### **5. Environment Variables on Render Dashboard**

#### **Backend Service Variables**
| Key | Value | Sync |
|-----|-------|------|
| `PORT` | `3000` | - |
| `MONGODB_URI` | (from MongoDB Atlas) | false |
| `GEMINI_API_KEY` | (from Google Cloud) | false |
| `JWT_SECRET` | (any strong secret) | false |
| `FIREBASE_PROJECT_ID` | (from Firebase) | false |
| `FIREBASE_PRIVATE_KEY` | (from Firebase) | false |
| `FIREBASE_CLIENT_EMAIL` | (from Firebase) | false |
| `STRIPE_SECRET_KEY` | (from Stripe) | false |
| `STRIPE_WEBHOOK_SECRET` | (from Stripe) | false |
| `CLIENT_URL` | `https://notesgenai-frontend.onrender.com` | - |

#### **Frontend Service Variables**
| Key | Value | Sync |
|-----|-------|------|
| `VITE_API_URL` | `https://notesgenai-backend.onrender.com` | false |
| `PORT` | `3000` | - |

### **6. Post-Deployment Verification**

- [ ] Backend service started successfully (check logs)
- [ ] Frontend service started successfully (check logs)
- [ ] Frontend URL is accessible: `https://notesgenai-frontend.onrender.com`
- [ ] Backend health check: `https://notesgenai-backend.onrender.com/` returns JSON
- [ ] Frontend loads without errors (check browser console)
- [ ] API requests work (test with Network tab in DevTools)
- [ ] Login with Google OAuth works
- [ ] Note generation works (may take 10-30s on first request)
- [ ] Payment page loads (Stripe integration)
- [ ] PDF generation works

### **7. Troubleshooting**

#### **Blank Frontend / 404 Errors**
- Check Render logs for build errors
- Verify `VITE_API_URL` is set correctly
- Ensure `npm run build` succeeds locally

#### **API Calls Failing**
- Check frontend logs for actual error message
- Verify backend is running: `curl https://notesgenai-backend.onrender.com/`
- Check CORS configuration (backend allows `CLIENT_URL`)
- Ensure `VITE_API_URL` matches backend exactly

#### **Build Failures**
```bash
# Test locally first
cd server && npm install
cd ../client && npm install && npm run build
```
- Check for missing dependencies
- Verify Node version compatibility

#### **Slow Performance / 503 Errors**
- Free tier services spin down after 15 minutes of inactivity
- First request takes 30-60 seconds (cold start)
- Consider upgrading to Starter plan for production

### **8. Configuration Files Summary**

#### **Root `render.yaml`**
- Defines both backend and frontend services
- Includes all environment variables
- Used for one-click deployment

#### **Backend `server/index.js`**
- ✅ PORT: 3000 (matches render.yaml)
- ✅ CORS: Configured with CLIENT_URL
- ✅ Routes: /api/auth, /api/user, /api/notes, /api/pdf, /api/credit

#### **Backend `server/utils/connectDb.js`**
- ✅ Supports both MONGODB_URI and MONGODB_URL
- ✅ Error handling with descriptive messages

#### **Frontend `client/server.js`**
- ✅ Serves dist folder for production build
- ✅ SPA fallback: Routes all requests to index.html
- ✅ PORT: 3000 (via environment variable)

#### **Frontend `client/vite.config.js`**
- ✅ Preview host: 0.0.0.0 (accessible from Render)
- ✅ Preview port: 3000 (matches render.yaml)

---

## 🔐 Security Checklist

- [ ] All sensitive keys stored in Render environment variables (not in code)
- [ ] `.env` files added to `.gitignore`
- [ ] CORS restricted to frontend domain only
- [ ] JWT_SECRET is unique and strong
- [ ] Stripe webhook secret validated on backend
- [ ] MongoDB connection uses strong passwords
- [ ] Firebase credentials properly scoped

---

## 📞 Quick Links

- **Render Dashboard**: https://render.com/dashboard
- **GitHub Repository**: https://github.com/VimarshS/NotesGenAI
- **MongoDB Atlas**: https://cloud.mongodb.com/
- **Google Cloud Console**: https://console.cloud.google.com/
- **Stripe Dashboard**: https://dashboard.stripe.com/
- **Firebase Console**: https://console.firebase.google.com/

---

## 🎯 Next Steps After Deployment

1. ✅ Set up custom domain (optional)
2. ✅ Enable auto-deploy on push to main branch
3. ✅ Set up monitoring/alerts
4. ✅ Test Stripe webhooks
5. ✅ Monitor logs for errors
6. ✅ Upgrade to Starter plan for production use

---

**Last Updated**: 2024-12-14  
**Status**: ✅ Ready for Deployment

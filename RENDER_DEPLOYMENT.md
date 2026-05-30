# Render Deployment Guide for NotesGenAI

## 📋 Prerequisites
- GitHub account (code must be pushed)
- Render account (free tier available)
- Backend already deployed on Render
- All environment variables configured on Render

## 🚀 Step-by-Step Deployment

### **1. Push Code to GitHub**
```bash
git add .
git commit -m "Add Render configuration for frontend deployment"
git push origin main
```

### **2. Connect Render to Your Repository**

**For Frontend Only (Recommended):**
1. Go to [render.com](https://render.com)
2. Click **"New +"** → **"Web Service"**
3. Select **"Build and deploy from a Git repository"**
4. Connect your GitHub repository (`VimarshS/NotesGenAI`)
5. Configure the service:
   - **Name**: `notesgenai-frontend`
   - **Environment**: `Node`
   - **Region**: `Oregon` (or closest to you)
   - **Plan**: `Free` (for testing) or `Starter` (production)
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run preview`
   - **Root Directory**: `client`

6. Add Environment Variables:
   - Key: `VITE_API_URL`
   - Value: `https://your-backend-render-url.onrender.com` (get from your backend service on Render)

7. Click **"Deploy"**

### **3. Verify Deployment**

Once deployed:
1. Render will provide you with a URL like: `https://notesgenai-frontend.onrender.com`
2. Visit the URL and verify the frontend loads
3. Test the following:
   - ✅ Frontend pages load
   - ✅ API calls work (check browser console for errors)
   - ✅ Authentication works
   - ✅ Note generation works

### **4. Update Backend CORS (If Needed)**

If you see CORS errors, update your backend's `.env` on Render:
```
CLIENT_URL=https://notesgenai-frontend.onrender.com
```

### **5. Important Notes**

- **Free tier**: Services spin down after 15 minutes of inactivity
- **Cold starts**: First request takes ~30-60 seconds
- **SSL**: Render provides free HTTPS automatically
- **Build time**: ~2-3 minutes for frontend build

## 🔧 Environment Variables Needed

**Frontend (VITE_):**
- `VITE_API_URL` = Backend URL from Render

**Backend (if redeploying):**
- `MONGODB_URI` = Your MongoDB connection string
- `GEMINI_API_KEY` = Google Gemini API key
- `FIREBASE_*` = Firebase configuration
- `STRIPE_SECRET_KEY` = Stripe secret key
- `STRIPE_WEBHOOK_SECRET` = Stripe webhook secret
- `JWT_SECRET` = JWT secret for auth
- `CLIENT_URL` = Frontend URL (for CORS)

## 🚨 Troubleshooting

### Blank page / 404 errors
- Check if build succeeded in Render logs
- Verify `VITE_API_URL` is set correctly
- Check browser console for errors

### API calls failing
- Verify backend is running
- Check CORS configuration in backend
- Ensure `VITE_API_URL` matches backend URL exactly

### Build failing
- Check Render logs for errors
- Ensure all dependencies in `package.json` are correct
- Run `npm install && npm run build` locally to test

### Slow performance
- This is expected on free tier
- Consider upgrading to Starter plan
- Enable persistent disks if needed

## 📞 Support

- Check Render Logs: Dashboard → Service → Logs
- Check Browser Console: F12 → Console tab
- Check Network Tab: F12 → Network tab (for API failures)

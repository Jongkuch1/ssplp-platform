# Vercel Deployment Setup Guide

## 🚨 IMPORTANT: Environment Variables Configuration

Your application is failing to login because **environment variables are not configured in Vercel**.

### Step 1: Add Environment Variables in Vercel

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select your project: **ssplp-platform**
3. Click on **Settings** tab
4. Click on **Environment Variables** in the left sidebar
5. Add the following variables:

#### Required Environment Variables:

| Variable Name | Value | Environment |
|--------------|-------|-------------|
| `MONGODB_URI` | `mongodb+srv://janyar_db_user:Jongkuch123%23@cluster0.m9sprac.mongodb.net/ssplp?retryWrites=true&w=majority&appName=Cluster0` | Production, Preview, Development |
| `JWT_SECRET` | `ssplp_secret_key_2024_secure_token` | Production, Preview, Development |
| `NODE_ENV` | `production` | Production |
| `PORT` | `5000` | All |

**Note:** Make sure to select **all environments** (Production, Preview, Development) for each variable.

### Step 2: Redeploy Your Application

After adding environment variables:

1. Go to **Deployments** tab
2. Click on the latest deployment
3. Click the three dots menu (⋯)
4. Select **Redeploy**
5. Check "Use existing Build Cache" 
6. Click **Redeploy**

### Step 3: Create Demo Accounts (Local Setup)

Run this command to create test accounts in your database:

```bash
cd backend
node scripts/createDemoAccounts.js
```

This will create:
- **Student**: student@ssplp.org / password123
- **Teacher**: teacher@ssplp.org / password123
- **Admin**: admin@ssplp.org / password123

### Step 4: Test the Login

After redeployment, visit your site and try logging in with:

**Email:** admin@ssplp.org  
**Password:** password123

---

## 🔒 Security Recommendations

⚠️ **IMPORTANT**: Your MongoDB credentials were exposed in previous conversations. You should:

1. **Change MongoDB Password:**
   - Go to MongoDB Atlas → Database Access
   - Edit user `janyar_db_user`
   - Click "Edit Password" → Generate new password
   - Update `MONGODB_URI` in Vercel with new password

2. **Generate New JWT Secret:**
   ```bash
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```
   - Copy the output
   - Update `JWT_SECRET` in Vercel

---

## 🧪 Testing Endpoints

After deployment, test these endpoints:

```bash
# Health Check
curl https://your-app.vercel.app/api/health

# Register New User
curl -X POST https://your-app.vercel.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123","role":"student"}'

# Login
curl -X POST https://your-app.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@ssplp.org","password":"password123"}'
```

---

## 📊 Monitoring

Check Vercel logs for any errors:
1. Go to your project in Vercel
2. Click on **Deployments**
3. Click on the latest deployment
4. Click on **Functions** tab
5. View logs for `/api/index`

---

## Common Issues

### Issue 1: "Server error" on login
**Cause:** Environment variables not set in Vercel  
**Fix:** Follow Step 1 above to add environment variables

### Issue 2: "Invalid credentials" 
**Cause:** No users exist in database  
**Fix:** Run `createDemoAccounts.js` script (Step 3)

### Issue 3: CORS errors
**Cause:** Frontend trying to access wrong API URL  
**Fix:** Check that API_URL in frontend code uses `/api` path

---

## Need Help?

1. Check Vercel deployment logs
2. Verify MongoDB Atlas is accessible (not IP-restricted)
3. Ensure all environment variables are set correctly
4. Test API endpoints directly using curl/Postman

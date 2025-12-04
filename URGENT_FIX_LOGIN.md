# 🚨 URGENT: Fix Login Error - Step by Step

## Problem
Users are getting "Server error" when trying to login because **environment variables are NOT configured in Vercel**.

## Solution: Add Environment Variables to Vercel (5 minutes)

### Step 1: Open Your Vercel Dashboard

1. Go to: **https://vercel.com/dashboard**
2. Find and click on your project: **ssplp-platform**

### Step 2: Navigate to Environment Variables

1. Click on the **"Settings"** tab (top navigation)
2. In the left sidebar, click **"Environment Variables"**

### Step 3: Add Each Variable (Do this 3 times)

You need to add **3 environment variables**. For each one:

#### Variable #1: MONGODB_URI

1. Click the **"Add New"** button
2. In the **"Key"** field, type: `MONGODB_URI`
3. In the **"Value"** field, paste this EXACT text:
   ```
   mongodb+srv://janyar_db_user:Jongkuch123%23@cluster0.m9sprac.mongodb.net/ssplp?retryWrites=true&w=majority&appName=Cluster0
   ```
4. Under **"Environment"**, check ALL THREE boxes:
   - ✅ Production
   - ✅ Preview  
   - ✅ Development
5. Click **"Save"**

#### Variable #2: JWT_SECRET

1. Click **"Add New"** button again
2. In the **"Key"** field, type: `JWT_SECRET`
3. In the **"Value"** field, paste: `ssplp_secret_key_2024_secure_token`
4. Check ALL THREE environment boxes:
   - ✅ Production
   - ✅ Preview
   - ✅ Development
5. Click **"Save"**

#### Variable #3: NODE_ENV

1. Click **"Add New"** button again
2. In the **"Key"** field, type: `NODE_ENV`
3. In the **"Value"** field, type: `production`
4. Check ONLY the Production box:
   - ✅ Production
5. Click **"Save"**

### Step 4: Redeploy Your Application

**IMPORTANT:** Adding environment variables does NOT automatically redeploy your app. You must redeploy:

1. Click on the **"Deployments"** tab (top navigation)
2. You'll see a list of deployments
3. Find the **most recent** deployment (should be at the top)
4. Click the **three dots menu (⋯)** on the right side of that deployment
5. Select **"Redeploy"**
6. A popup will appear - click **"Redeploy"** again to confirm
7. Wait 1-2 minutes for the deployment to complete
8. You'll see "Ready" status when it's done

### Step 5: Test the Login

Once the deployment shows "Ready":

1. Go to your website: **https://ssplp-platform.vercel.app**
2. Try logging in with these credentials:

**Admin Account:**
- Email: `admin@ssplp.org`
- Password: `password123`

**OR**

**Student Account:**
- Email: `student@ssplp.org`  
- Password: `password123`

**OR**

**Teacher Account:**
- Email: `teacher@ssplp.org`
- Password: `password123`

---

## ✅ How to Verify It's Working

Before testing login, check if the API is online:

Visit: **https://ssplp-platform.vercel.app/api/health**

✅ **Should see:** `{"status":"OK","message":"SSPLP Backend Running on Vercel"}`

❌ **If you see:** Error message or blank page, environment variables are still not set correctly.

---

## 📸 Visual Guide

If you need visual help, here's what you're looking for:

1. **Vercel Dashboard** → Your Projects → Click "ssplp-platform"
2. **Settings Tab** (looks like a gear icon ⚙️)
3. **Environment Variables** in left sidebar
4. **Add New** button (blue button)
5. Fill in Key, Value, and check environment boxes
6. **Save** button
7. Repeat for all 3 variables
8. Go to **Deployments** → Three dots → **Redeploy**

---

## 🆘 Still Not Working?

If after following ALL steps above it's still not working:

1. **Double-check the variable names** - they must be EXACTLY:
   - `MONGODB_URI` (all caps, underscore)
   - `JWT_SECRET` (all caps, underscore)
   - `NODE_ENV` (all caps, underscore)

2. **Check the MONGODB_URI value** - make sure it includes the `%23` (don't change it to #)

3. **Verify you clicked "Save"** for each variable

4. **Confirm you redeployed** after adding variables (this is easy to forget!)

5. **Wait 2-3 minutes** after redeployment before testing

---

## 🔒 Security Note

After confirming login works, you should rotate your credentials since they were exposed:

1. Change MongoDB password in Atlas
2. Generate new JWT_SECRET: 
   ```bash
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```
3. Update both values in Vercel environment variables
4. Redeploy again

---

## Questions?

The environment variables are stored in:
- Vercel Dashboard → Settings → Environment Variables

They are NOT in your code repository (for security).
They are NOT deployed automatically (you must add them manually in Vercel).

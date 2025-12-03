# 🎓 South Sudan Personalized Learning Platform (SSPLP)

[![Status](https://img.shields.io/badge/Status-Production%20Ready-success)](https://github.com/Jongkuch1/ssplp-platform)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node](https://img.shields.io/badge/Node-18%2B-green)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)](https://mongodb.com)

> An educational technology platform designed to address the learning crisis in South Sudan through personalized, accessible, and quality educational resources.

**Author:** Jongkuch Isaac Chol Anyar  
**Organization:** African Leadership University  
**Version:** 1.0.0

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Local Development Setup](#local-development-setup)
- [Production Deployment](#production-deployment)
- [Project Structure](#project-structure)
- [Demo Accounts](#demo-accounts)
- [API Documentation](#api-documentation)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## 🌟 Overview

SSPLP is a comprehensive educational platform featuring:
- ✅ Adaptive learning engine that personalizes content based on student performance
- ✅ Virtual tutoring sessions with scheduling system
- ✅ Multi-language support (English & Arabic)
- ✅ Offline-first PWA architecture for low-connectivity areas
- ✅ Progress tracking and performance analytics
- ✅ Student-teacher messaging system
- ✅ Interactive quizzes and assignments
- ✅ Admin monitoring and content management

**Built specifically for South Sudan's educational context with low-bandwidth optimization.**

---

## ✨ Features

### For Students
- 📚 Browse 5 core subjects (Math, Physics, Chemistry, English, Biology)
- 📝 Take interactive quizzes with instant feedback
- 📊 Track progress with detailed analytics
- 👨‍🏫 Book one-on-one tutoring sessions
- 💬 Message teachers directly
- 📥 Download content for offline study
- 🌐 Switch between English and Arabic
- 📈 View performance reports

### For Teachers
- ✏️ Create courses and learning modules
- 📋 Build quizzes and assignments
- 📅 Schedule tutoring sessions
- 💬 Message students
- 📊 View student progress
- 📤 Upload educational resources
- ✅ Grade assignments

### For Administrators
- 👥 Manage users (students, teachers)
- ✅ Approve content (courses, quizzes)
- 📊 Monitor platform usage
- 📈 View analytics and reports
- ⚙️ Configure system settings
- 🔒 Security audit tools

---

## 🛠 Tech Stack

### Frontend
- HTML5, CSS3, JavaScript (Vanilla)
- Progressive Web App (PWA)
- Service Worker for offline support
- localStorage for client-side persistence

### Backend
- Node.js v18+
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcrypt for password hashing

### Database
- MongoDB Atlas (Cloud)
- 10 Collections (Users, Courses, Quizzes, Assignments, Meetings, Messages, etc.)

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

### Required Software
- **Node.js** (v18 or higher) - [Download](https://nodejs.org)
- **npm** (comes with Node.js)
- **Git** - [Download](https://git-scm.com)
- **MongoDB** (optional for local development) - [Download](https://www.mongodb.com/try/download/community)

### Accounts Needed
- **GitHub Account** - [Sign up](https://github.com/signup)
- **MongoDB Atlas Account** (Free) - [Sign up](https://www.mongodb.com/cloud/atlas/register)
- **Render Account** (for deployment) - [Sign up](https://render.com)
- **Vercel Account** (optional) - [Sign up](https://vercel.com/signup)

### Check Your Installation
```bash
# Check Node.js version (should be 18+)
node --version

# Check npm version
npm --version

# Check Git version
git --version
```

---

## 🚀 Local Development Setup

Follow these steps **exactly** to get the project running on your local machine.

### Step 1: Clone the Repository

```bash
# Clone the repository
git clone https://github.com/Jongkuch1/ssplp-platform.git

# Navigate to project directory
cd ssplp-platform
```

---

### Step 2: Backend Setup

#### 2.1 Navigate to Backend Folder
```bash
cd backend
```

#### 2.2 Install Dependencies
```bash
npm install
```

This will install:
- express
- mongoose
- bcryptjs
- jsonwebtoken
- cors
- dotenv
- nodemon (dev dependency)

#### 2.3 Configure Environment Variables

The `.env` file is already configured with MongoDB Atlas connection. **No changes needed** unless you want to use your own database.

**Existing `.env` file:**
```env
PORT=5000
MONGODB_URI=mongodb+srv://janyar_db_user:Jongkuch123%23@cluster0.m9sprac.mongodb.net/ssplp?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=ssplp_secret_key_2024_secure_token
NODE_ENV=development
```

**Optional:** To use your own MongoDB:
1. Create a free cluster on [MongoDB Atlas](https://cloud.mongodb.com)
2. Get your connection string
3. Replace `MONGODB_URI` in `.env`

#### 2.4 Start Backend Server
```bash
# Development mode (with auto-restart)
npm run dev

# OR Production mode
npm start
```

**Expected Output:**
```
✅ MongoDB Connected
🚀 Server running on port 5000
```

**Keep this terminal window open!**

---

### Step 3: Frontend Setup

#### 3.1 Open New Terminal Window

Keep the backend running and open a **new terminal**.

#### 3.2 Navigate to Frontend Folder
```bash
# From project root
cd frontend/student-dashboard
```

#### 3.3 Open in Browser

**Option A: Using Live Server (Recommended)**
1. Install [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension in VS Code
2. Right-click on `login.html`
3. Select "Open with Live Server"
4. Browser opens at `http://127.0.0.1:5500/login.html`

**Option B: Direct File Open**
1. Navigate to `frontend/student-dashboard/`
2. Double-click `login.html`
3. Opens in default browser

**Option C: Using Python HTTP Server**
```bash
# In frontend/student-dashboard folder
python -m http.server 8000
# Open browser to http://localhost:8000/login.html
```

---

### Step 4: Test the Application

#### 4.1 Open Browser Console
- Press `F12` or right-click → "Inspect"
- Go to "Console" tab

#### 4.2 Check Backend Connection
You should see one of these messages:
- ✅ `Backend connected - Using real database` (Backend running)
- ⚠️ `Backend offline - Using localStorage` (Backend not running)

#### 4.3 Login with Demo Account

Use any of these accounts:

**Student Account:**
- Email: `student@ssplp.org`
- Password: `123`

**Teacher Account:**
- Email: `teacher@ssplp.org`
- Password: `123`

**Admin Account:**
- Email: `admin@ssplp.org`
- Password: `123`

#### 4.4 Test Features
After logging in, test these features:
- ✅ Browse subjects
- ✅ Take a quiz
- ✅ View progress
- ✅ Switch language (EN ↔ AR)
- ✅ Send a message
- ✅ Book tutoring session
- ✅ Upload profile picture

---

### Step 5: Access Different Dashboards

The project has 3 separate dashboards:

**Student Dashboard:**
```
frontend/student-dashboard/login.html
```

**Teacher Dashboard:**
```
frontend/teacher-dashboard/login.html
```

**Admin Dashboard:**
```
frontend/admin-dashboard/login.html
```

Each dashboard has its own complete set of features!

---

## 🌐 Production Deployment

### Quick Deployment Guide

**Recommended Setup:**
- Backend → Render ($7/month)
- Frontend → Vercel (Free)
- Database → MongoDB Atlas (Free)

**Total Cost:** $7/month

### Deployment Steps

#### Option 1: Render + Vercel (Recommended)

**Step 1: Deploy Backend to Render**

1. Push backend to GitHub:
```bash
cd backend
git init
git add .
git commit -m "Backend deployment"
git remote add origin https://github.com/Jongkuch1/ssplp-backend.git
git push -u origin main
```

2. Go to [render.com](https://render.com)
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - Name: `ssplp-backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
6. Add environment variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb+srv://janyar_db_user:Jongkuch123%23@cluster0.m9sprac.mongodb.net/ssplp?retryWrites=true&w=majority&appName=Cluster0
   JWT_SECRET=ssplp_secret_key_2024_secure_token
   NODE_ENV=production
   ```
7. Click "Create Web Service"
8. Copy your backend URL: `https://ssplp-backend-XXXX.onrender.com`

**Step 2: Update Frontend API URLs**

Update these 3 files with your Render backend URL:

1. `frontend/student-dashboard/js/core/api.js` (line 3)
2. `frontend/student-dashboard/js/data-sync.js` (line 6)
3. `frontend/student-dashboard/sw.js` (lines 42, 54, 66)

Replace `ssplp-backend.onrender.com` with your actual URL.

**Step 3: Deploy Frontend to Vercel**

1. Push frontend to GitHub:
```bash
cd frontend/student-dashboard
git init
git add .
git commit -m "Frontend deployment"
git remote add origin https://github.com/Jongkuch1/ssplp-frontend.git
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com)
3. Click "Add New Project"
4. Import your repository
5. Click "Deploy"
6. Done! Your site is live at `https://ssplp-frontend.vercel.app`

**Step 4: Test Production**

1. Open your Vercel URL
2. Login with demo account
3. Check console: Should see "✅ Backend connected"
4. Test all features

### Detailed Deployment Guides

For complete step-by-step instructions, see:
- 📘 [RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md) - Render deployment guide
- 📗 [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md) - Vercel deployment guide
- ✅ [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) - Quick checklist

---

## 📁 Project Structure

```
ssplp/
├── backend/                      # Node.js Backend
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   └── learningController.js
│   ├── middleware/
│   │   └── auth.js              # JWT authentication
│   ├── models/                  # 10 Mongoose models
│   │   ├── User.js
│   │   ├── Course.js
│   │   ├── Quiz.js
│   │   ├── Assignment.js
│   │   ├── Meeting.js
│   │   ├── Message.js
│   │   ├── AdaptiveProfile.js
│   │   ├── Progress.js
│   │   ├── QuizAttempt.js
│   │   └── LearningModule.js
│   ├── routes/                  # 13 API route modules
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── courses.js
│   │   ├── quizzes.js
│   │   ├── assignments.js
│   │   ├── meetings.js
│   │   ├── messages.js
│   │   ├── adaptive.js
│   │   ├── reports.js
│   │   ├── notifications.js
│   │   ├── learning.js
│   │   ├── ai.js
│   │   └── resources.js
│   ├── .env                     # Environment variables
│   ├── package.json
│   └── server.js                # Main server file
│
├── frontend/
│   ├── student-dashboard/       # Student Portal
│   │   ├── css/
│   │   │   └── style.css
│   │   ├── js/
│   │   │   ├── core/
│   │   │   │   ├── api.js       # API client
│   │   │   │   ├── app.js       # Main app logic
│   │   │   │   └── i18n.js      # Translations
│   │   │   ├── adaptive-engine.js
│   │   │   ├── encryption.js
│   │   │   ├── notifications.js
│   │   │   ├── report-generator.js
│   │   │   └── data-sync.js
│   │   ├── manifest.json        # PWA manifest
│   │   ├── sw.js                # Service worker
│   │   ├── login.html
│   │   ├── register.html
│   │   ├── student-dashboard.html
│   │   ├── subjects.html
│   │   ├── student-quizzes.html
│   │   ├── student-assignments.html
│   │   ├── tutoring.html
│   │   ├── messaging.html
│   │   ├── progress.html
│   │   └── profile.html
│   │
│   ├── teacher-dashboard/       # Teacher Portal
│   │   └── [similar structure]
│   │
│   └── admin-dashboard/         # Admin Portal
│       └── [similar structure]
│
├── DEPLOYMENT_GUIDE.md          # General deployment guide
├── RENDER_DEPLOYMENT.md         # Render-specific guide
├── VERCEL_DEPLOYMENT.md         # Vercel-specific guide
├── DEPLOYMENT_CHECKLIST.md      # Quick checklist
├── PROJECT_STATUS.md            # Complete project status
├── QUICK_START.md               # Quick start guide
└── README.md                    # This file
```

---

## 👤 Demo Accounts

### Student Account
```
Email: student@ssplp.org
Password: 123
```
**Access:** Browse subjects, take quizzes, book tutoring, view progress

### Teacher Account
```
Email: teacher@ssplp.org
Password: 123
```
**Access:** Create content, schedule meetings, grade assignments, message students

### Admin Account
```
Email: admin@ssplp.org
Password: 123
```
**Access:** Manage users, approve content, view analytics, system settings

---

## 📡 API Documentation

### Base URL
- **Local:** `http://localhost:5000/api`
- **Production:** `https://your-backend.onrender.com/api`

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "student"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "student@ssplp.org",
  "password": "123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "123",
    "name": "Demo Student",
    "email": "student@ssplp.org",
    "role": "student"
  }
}
```

### Other Endpoints

- `GET /api/users` - Get all users
- `GET /api/courses` - Get all courses
- `GET /api/quizzes` - Get all quizzes
- `GET /api/assignments` - Get all assignments
- `GET /api/meetings` - Get tutoring sessions
- `GET /api/messages` - Get messages
- `GET /api/adaptive/:studentId` - Get adaptive profile
- `GET /api/reports/student/:studentId` - Get student report
- `POST /api/notifications/send` - Send notification

**Full API documentation:** See [backend/README.md](backend/README.md)

---

## 🐛 Troubleshooting

### Backend Won't Start

**Problem:** `npm run dev` fails

**Solutions:**
```bash
# 1. Check Node.js version (must be 18+)
node --version

# 2. Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# 3. Check if port 5000 is in use
# Windows:
netstat -ano | findstr :5000
# Mac/Linux:
lsof -i :5000

# 4. Change port in .env
PORT=5001
```

### Frontend Can't Connect to Backend

**Problem:** Console shows "Backend offline"

**Solutions:**
1. Verify backend is running on port 5000
2. Check `js/core/api.js` has correct URL
3. Open `http://localhost:5000/api/health` in browser
4. Check browser console for CORS errors

### Database Connection Error

**Problem:** "MongoDB Connection Error"

**Solutions:**
1. Check internet connection
2. Verify MongoDB Atlas connection string in `.env`
3. Whitelist your IP in MongoDB Atlas:
   - Go to Network Access
   - Add IP Address
   - Allow access from anywhere: `0.0.0.0/0`
4. Try local MongoDB: `mongodb://localhost:27017/ssplp`

### Login Not Working

**Problem:** Can't login with demo accounts

**Solutions:**
1. Clear browser localStorage:
   ```javascript
   // In browser console (F12)
   localStorage.clear();
   location.reload();
   ```
2. Check backend is running
3. Verify demo users are seeded (check console logs)
4. Try different browser

### Page Not Loading

**Problem:** Blank page or errors

**Solutions:**
1. Check browser console (F12) for errors
2. Verify all script files are loading
3. Check file paths are correct
4. Try hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

### Offline Mode Not Working

**Problem:** Service worker not registering

**Solutions:**
1. Must use HTTPS or localhost
2. Check `sw.js` file exists
3. Check browser console for service worker errors
4. Clear service workers:
   - Chrome: `chrome://serviceworker-internals/`
   - Unregister all workers

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines
- Follow existing code style
- Add comments for complex logic
- Test all features before submitting
- Update documentation if needed

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Support

### Documentation
- 📘 [Deployment Guide](DEPLOYMENT_GUIDE.md)
- 📗 [Quick Start](QUICK_START.md)
- 📙 [Project Status](PROJECT_STATUS.md)

### Contact
- **Author:** Jongkuch Isaac Chol Anyar
- **Organization:** African Leadership University
- **Email:** [Your Email]
- **GitHub:** [Your GitHub Profile]

### Useful Links
- [MongoDB Atlas](https://cloud.mongodb.com)
- [Render Dashboard](https://dashboard.render.com)
- [Vercel Dashboard](https://vercel.com/dashboard)
- [Node.js Documentation](https://nodejs.org/docs)
- [Express.js Documentation](https://expressjs.com)

---

## 🎯 Project Goals

This platform aims to:
- ✅ Address the educational crisis in South Sudan
- ✅ Provide personalized learning experiences
- ✅ Enable offline learning in low-connectivity areas
- ✅ Support both English and Arabic languages
- ✅ Facilitate teacher-student communication
- ✅ Track and improve student performance

**Together, we can transform education in South Sudan! 🇸🇸📚**

---

## ⭐ Star This Project

If you find this project helpful, please give it a star on GitHub!

---

**Made with ❤️ for South Sudanese Students**

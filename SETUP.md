# ⚡ Quick Setup Guide for SSPLP

## 🚀 Get Running in 5 Minutes

### Prerequisites Check
```bash
node --version  # Should be 18+
npm --version   # Should be 9+
git --version   # Any version
```

---

## Step 1: Clone Repository (1 minute)

```bash
git clone https://github.com/Jongkuch1/ssplp-platform.git
cd ssplp-platform
```

---

## Step 2: Start Backend (2 minutes)

```bash
# Open Terminal 1
cd backend
npm install
npm run dev
```

**Wait for:** `✅ MongoDB Connected` and `🚀 Server running on port 5000`

---

## Step 3: Open Frontend (1 minute)

```bash
# Open Terminal 2 (keep Terminal 1 running)
cd frontend/student-dashboard
```

Then open `login.html` in your browser:
- **VS Code**: Right-click → Open with Live Server
- **Direct**: Double-click `login.html`
- **Python**: `python -m http.server 8000`

---

## Step 4: Login (30 seconds)

Open browser to login page and use:

**Student:**
- Email: `student@ssplp.org`
- Password: `123`

**Teacher:**
- Email: `teacher@ssplp.org`
- Password: `123`

**Admin:**
- Email: `admin@ssplp.org`
- Password: `123`

---

## ✅ You're Done!

Check browser console (F12):
- Should see: `✅ Backend connected - Using real database`

Test features:
- Browse subjects
- Take a quiz
- Switch language (EN/AR)
- View progress

---

## 🐛 Quick Troubleshooting

### Backend won't start?
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Frontend can't connect?
1. Check backend is running (Terminal 1)
2. Check `http://localhost:5000/api/health` in browser
3. Clear browser cache (Ctrl+Shift+Delete)

### Login not working?
```javascript
// In browser console (F12)
localStorage.clear();
location.reload();
```

---

## 📚 Full Documentation

- **Complete Setup**: See [README.md](README.md)
- **Deployment**: See [RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md)
- **Troubleshooting**: See README.md → Troubleshooting section

---

## 🎯 Quick Commands Reference

```bash
# Backend
cd backend
npm install          # Install dependencies
npm run dev          # Start development server
npm start            # Start production server

# Frontend
cd frontend/student-dashboard
# Just open login.html in browser

# Check versions
node --version
npm --version
git --version
```

---

## 🌐 Repository

**GitHub**: https://github.com/Jongkuch1/ssplp-platform

**Issues**: https://github.com/Jongkuch1/ssplp-platform/issues

**Wiki**: https://github.com/Jongkuch1/ssplp-platform/wiki

---

**Happy Learning! 🎓**

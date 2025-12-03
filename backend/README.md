# SSPLP Backend Setup Guide

## Prerequisites
- Node.js (v18 or higher)
- MongoDB (v6 or higher)

## Installation Steps

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Start MongoDB
Make sure MongoDB is running on your system:
```bash
# Windows
mongod

# Or if using MongoDB as a service
net start MongoDB
```

### 3. Configure Environment
The `.env` file is already configured with:
- PORT: 5000
- MONGODB_URI: mongodb://localhost:27017/ssplp
- JWT_SECRET: (secure token)

### 4. Start Backend Server
```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

Server will run on: http://localhost:5000

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user

### Users
- GET `/api/users` - Get all users
- GET `/api/users/:id` - Get user by ID
- PUT `/api/users/:id` - Update user profile

### Courses
- GET `/api/courses` - Get all approved courses
- POST `/api/courses` - Create new course
- PUT `/api/courses/:id/status` - Update course status

### Quizzes
- GET `/api/quizzes` - Get all approved quizzes
- POST `/api/quizzes` - Create new quiz
- PUT `/api/quizzes/:id/status` - Update quiz status

### Assignments
- GET `/api/assignments` - Get all approved assignments
- POST `/api/assignments` - Create new assignment
- PUT `/api/assignments/:id/status` - Update assignment status

## Testing the API

### Health Check
```bash
curl http://localhost:5000/api/health
```

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123","role":"student"}'
```

## Frontend Integration

The frontend is already configured to connect to the backend via `frontend/js/api.js`.

All API calls will automatically:
- Use the correct backend URL (http://localhost:5000/api)
- Include authentication tokens
- Handle errors properly

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MongoDB URI in `.env` file

### Port Already in Use
- Change PORT in `.env` file
- Update API_URL in `frontend/js/api.js`

### CORS Errors
- Backend already configured with CORS
- Ensure frontend is served from a web server (not file://)

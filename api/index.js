// Vercel serverless function entry point
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection (with connection pooling for serverless)
let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return;
  }
  
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log('✅ MongoDB Connected');
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err);
    throw err;
  }
};

// Import routes
const authRoutes = require('../backend/routes/auth');
const usersRoutes = require('../backend/routes/users');
const coursesRoutes = require('../backend/routes/courses');
const quizzesRoutes = require('../backend/routes/quizzes');
const assignmentsRoutes = require('../backend/routes/assignments');
const resourcesRoutes = require('../backend/routes/resources');
const notificationsRoutes = require('../backend/routes/notifications');
const meetingsRoutes = require('../backend/routes/meetings');
const messagesRoutes = require('../backend/routes/messages');
const adaptiveRoutes = require('../backend/routes/adaptive');
const reportsRoutes = require('../backend/routes/reports');
const learningRoutes = require('../backend/routes/learning');
const aiRoutes = require('../backend/routes/ai');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api/quizzes', quizzesRoutes);
app.use('/api/assignments', assignmentsRoutes);
app.use('/api/resources', resourcesRoutes);
app.use('/api/notifications', notificationsRoutes);
app.use('/api/meetings', meetingsRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/adaptive', adaptiveRoutes);
app.use('/api/reports', reportsRoutes);
app.use('/api/learning', learningRoutes);
app.use('/api/ai', aiRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'SSPLP Backend Running on Vercel' });
});

// Root handler - welcome page
app.get('/api', (req, res) => {
  res.json({ 
    message: 'South Sudan Personalized Learning Platform API',
    status: 'online',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth/*',
      users: '/api/users/*',
      courses: '/api/courses/*',
      quizzes: '/api/quizzes/*',
      assignments: '/api/assignments/*',
      learning: '/api/learning/*',
      messages: '/api/messages/*',
      meetings: '/api/meetings/*'
    },
    documentation: 'https://github.com/Jongkuch1/ssplp-platform'
  });
});

// Catch-all for non-API routes
app.use('*', (req, res) => {
  if (!req.originalUrl.startsWith('/api')) {
    return res.status(404).json({ 
      error: 'Not Found',
      message: 'This is an API server. Please use /api endpoints.',
      availableEndpoints: '/api'
    });
  }
  res.status(404).json({ error: 'API endpoint not found' });
});

// Serverless handler
module.exports = async (req, res) => {
  await connectDB();
  return app(req, res);
};

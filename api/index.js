// Vercel serverless function entry point
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Try loading from multiple .env locations
require('dotenv').config();
require('dotenv').config({ path: path.join(__dirname, '../.env') });
require('dotenv').config({ path: path.join(__dirname, '../backend/.env') });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Check for required environment variables
const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.error('❌ Missing required environment variables:', missingEnvVars.join(', '));
  console.error('Available env vars:', Object.keys(process.env).filter(k => !k.includes('SECRET')).join(', '));
  console.error('Please configure these in your Vercel project settings under Settings > Environment Variables');
}

// MongoDB Connection (with connection pooling for serverless)
let cachedDb = null;

const connectDB = async () => {
  if (cachedDb && mongoose.connection.readyState === 1) {
    console.log('Using cached MongoDB connection');
    return cachedDb;
  }
  
  // Check if MONGODB_URI exists
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI environment variable is not set. Please configure it in Vercel project settings.');
  }
  
  try {
    // Set mongoose options for better serverless performance
    mongoose.set('strictQuery', false);
    mongoose.set('bufferCommands', false);
    
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      minPoolSize: 1,
    });
    
    cachedDb = db;
    console.log('✅ MongoDB Connected');
    return db;
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err.message);
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

// Serverless handler with timeout protection
module.exports = async (req, res) => {
  // Set response timeout
  res.setTimeout(25000);
  
  try {
    // Check if environment variables are set
    if (!process.env.MONGODB_URI || !process.env.JWT_SECRET) {
      return res.status(500).json({ 
        error: 'Configuration Error',
        message: 'Server environment variables are not configured. Please add MONGODB_URI and JWT_SECRET to Vercel Environment Variables in Settings.',
        missingVars: [
          !process.env.MONGODB_URI ? 'MONGODB_URI' : null,
          !process.env.JWT_SECRET ? 'JWT_SECRET' : null
        ].filter(Boolean)
      });
    }
    
    // Connect to DB with timeout
    await Promise.race([
      connectDB(),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Database connection timeout')), 8000)
      )
    ]);
    
    return app(req, res);
  } catch (error) {
    console.error('Serverless function error:', error.message);
    
    if (!res.headersSent) {
      return res.status(500).json({ 
        error: 'Server Error',
        message: error.message.includes('timeout') ? 'Database connection timed out. Please try again.' : 'An error occurred processing your request.',
        hint: 'If this persists, check database connectivity'
      });
    }
  }
};

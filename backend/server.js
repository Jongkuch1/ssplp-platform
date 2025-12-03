const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/courses', require('./routes/courses'));
app.use('/api/quizzes', require('./routes/quizzes'));
app.use('/api/assignments', require('./routes/assignments'));
app.use('/api/resources', require('./routes/resources'));
app.use('/api/notifications', require('./routes/notifications'));
app.use('/api/meetings', require('./routes/meetings'));
app.use('/api/messages', require('./routes/messages'));
app.use('/api/adaptive', require('./routes/adaptive'));
app.use('/api/reports', require('./routes/reports'));
app.use('/api/learning', require('./routes/learning'));
app.use('/api/ai', require('./routes/ai'));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'SSPLP Backend Running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

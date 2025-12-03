const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: { type: String, required: true },
  grade: { type: String, required: true },
  description: String,
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  modules: [{
    title: String,
    content: String,
    duration: String
  }],
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Course', courseSchema);

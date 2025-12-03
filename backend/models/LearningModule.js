const mongoose = require('mongoose');

const learningModuleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  subject: {
    type: String,
    required: true,
    enum: [
      'Mathematics', 'English Language', 'Arabic Language', 'Biology', 'Chemistry',
      'Physics', 'Geography', 'History', 'Christian Religious Education', 'Islamic Religious Education',
      'Agriculture', 'Business Studies', 'Economics', 'Fine Art', 'Music'
    ]
  },
  grade: {
    type: String,
    required: true,
    enum: ['S1', 'S2', 'S3', 'S4']
  },
  description: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  estimatedDuration: {
    type: Number, // in minutes
    default: 30
  },
  objectives: [{
    type: String
  }],
  resources: [{
    type: {
      type: String,
      enum: ['video', 'document', 'image', 'audio', 'link']
    },
    title: String,
    url: String,
    description: String
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('LearningModule', learningModuleSchema);
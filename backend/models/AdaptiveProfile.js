const mongoose = require('mongoose');

const adaptiveProfileSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subject: { type: String, required: true },
  performance: { type: Number, min: 0, max: 1, default: 0.5 },
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'intermediate' },
  lastUpdated: { type: Date, default: Date.now }
});

adaptiveProfileSchema.index({ studentId: 1, subject: 1 }, { unique: true });

module.exports = mongoose.model('AdaptiveProfile', adaptiveProfileSchema);

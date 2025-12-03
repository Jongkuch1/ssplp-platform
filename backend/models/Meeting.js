const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  teacherName: { type: String, required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  studentEmail: String,
  title: { type: String, required: true },
  subject: { type: String, required: true },
  type: { type: String, enum: ['Individual', 'Group'], default: 'Individual' },
  datetime: { type: Date, required: true },
  duration: { type: Number, default: 60 },
  meetLink: String,
  description: String,
  status: { type: String, enum: ['scheduled', 'completed', 'cancelled'], default: 'scheduled' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Meeting', meetingSchema);

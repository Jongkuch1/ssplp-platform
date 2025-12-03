const express = require('express');
const router = express.Router();
const AdaptiveProfile = require('../models/AdaptiveProfile');
const auth = require('../middleware/auth');

// Get adaptive profile for student
router.get('/:studentId', auth, async (req, res) => {
  try {
    const profiles = await AdaptiveProfile.find({ studentId: req.params.studentId });
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get adaptive profile for specific subject
router.get('/:studentId/:subject', auth, async (req, res) => {
  try {
    const profile = await AdaptiveProfile.findOne({ 
      studentId: req.params.studentId,
      subject: req.params.subject
    });
    res.json(profile || { performance: 0.5, difficulty: 'intermediate' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update adaptive profile
router.post('/', auth, async (req, res) => {
  try {
    const { studentId, subject, performance, difficulty } = req.body;
    const profile = await AdaptiveProfile.findOneAndUpdate(
      { studentId, subject },
      { performance, difficulty, lastUpdated: Date.now() },
      { upsert: true, new: true }
    );
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;

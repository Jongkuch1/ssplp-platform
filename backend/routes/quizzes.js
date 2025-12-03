const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');
const auth = require('../middleware/auth');

// Get all quizzes
router.get('/', async (req, res) => {
  try {
    const quizzes = await Quiz.find({ status: 'approved' }).populate('teacherId', 'name');
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create quiz
router.post('/', auth, async (req, res) => {
  try {
    const quiz = new Quiz({ ...req.body, teacherId: req.user.id });
    await quiz.save();
    res.status(201).json(quiz);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update quiz status
router.put('/:id/status', auth, async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;

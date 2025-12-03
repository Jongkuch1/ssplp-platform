const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const auth = require('../middleware/auth');

// Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find({ status: 'approved' }).populate('teacherId', 'name');
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create course
router.post('/', auth, async (req, res) => {
  try {
    const course = new Course({ ...req.body, teacherId: req.user.id });
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update course status
router.put('/:id/status', auth, async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;

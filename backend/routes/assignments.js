const express = require('express');
const router = express.Router();
const Assignment = require('../models/Assignment');
const auth = require('../middleware/auth');

// Get all assignments
router.get('/', async (req, res) => {
  try {
    const assignments = await Assignment.find({ status: 'approved' }).populate('teacherId', 'name');
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create assignment
router.post('/', auth, async (req, res) => {
  try {
    const assignment = new Assignment({ ...req.body, teacherId: req.user.id });
    await assignment.save();
    res.status(201).json(assignment);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update assignment status
router.put('/:id/status', auth, async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json(assignment);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;

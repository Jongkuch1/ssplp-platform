const express = require('express');
const router = express.Router();
const QuizAttempt = require('../models/QuizAttempt');
const Progress = require('../models/Progress');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Generate student performance report
router.get('/student/:studentId', auth, async (req, res) => {
  try {
    const student = await User.findById(req.params.studentId).select('-password');
    const quizAttempts = await QuizAttempt.find({ userId: req.params.studentId, status: 'completed' });
    const progress = await Progress.find({ userId: req.params.studentId });

    const avgScore = quizAttempts.length > 0 
      ? quizAttempts.reduce((sum, a) => sum + a.score, 0) / quizAttempts.length 
      : 0;

    const totalTimeSpent = progress.reduce((sum, p) => sum + p.timeSpent, 0);
    const completedModules = progress.filter(p => p.status === 'completed').length;

    const report = {
      student: {
        name: student.name,
        email: student.email,
        grade: student.grade
      },
      reportDate: new Date().toISOString(),
      quizzesTaken: quizAttempts.length,
      averageScore: Math.round(avgScore),
      modulesCompleted: completedModules,
      totalTimeSpent: totalTimeSpent,
      performance: avgScore >= 70 ? 'Excellent' : avgScore >= 50 ? 'Good' : 'Needs Improvement',
      recentQuizzes: quizAttempts.slice(-5).map(q => ({
        quizId: q.quizId,
        score: q.score,
        completedAt: q.completedAt
      }))
    };

    res.json(report);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;

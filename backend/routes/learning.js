const express = require('express');
const router = express.Router();
const learningController = require('../controllers/learningController');
const { authenticateToken } = require('../middleware/auth');

// Learning modules routes
router.get('/modules', authenticateToken, learningController.getLearningModules);
router.get('/modules/subject/:subject', authenticateToken, learningController.getModulesBySubject);
router.post('/modules', authenticateToken, learningController.createLearningModule);

// Quiz routes
router.get('/quizzes', authenticateToken, learningController.getQuizzes);
router.post('/quizzes', authenticateToken, learningController.createQuiz);

// Progress routes
router.get('/progress', authenticateToken, learningController.getProgress);
router.post('/progress', authenticateToken, learningController.updateProgress);

// Quiz attempt routes
router.post('/quiz-attempts', authenticateToken, learningController.submitQuizAttempt);
router.get('/quiz-attempts', authenticateToken, learningController.getQuizAttempts);

module.exports = router;
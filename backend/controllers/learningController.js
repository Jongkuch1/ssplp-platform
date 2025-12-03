const LearningModule = require('../models/LearningModule');
const Quiz = require('../models/Quiz');
const Progress = require('../models/Progress');
const QuizAttempt = require('../models/QuizAttempt');

// Get all learning modules
const getLearningModules = async (req, res) => {
  try {
    const { subject, grade } = req.query;
    const filter = { isActive: true };
    
    if (subject) filter.subject = subject;
    if (grade) filter.grade = grade;

    const modules = await LearningModule.find(filter)
      .populate('createdBy', 'name')
      .sort({ createdAt: -1 });
    
    res.json(modules);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching learning modules', error: error.message });
  }
};

// Get modules by subject
const getModulesBySubject = async (req, res) => {
  try {
    const { subject } = req.params;
    const modules = await LearningModule.find({ subject, isActive: true })
      .populate('createdBy', 'name')
      .sort({ createdAt: -1 });
    
    res.json(modules);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching modules by subject', error: error.message });
  }
};

// Create learning module (teachers only)
const createLearningModule = async (req, res) => {
  try {
    const { title, content, subject, grade, difficulty, estimatedDuration, objectives, resources } = req.body;
    
    if (req.user.role !== 'teacher' && req.user.role !== 'administrator') {
      return res.status(403).json({ message: 'Only teachers and administrators can create modules' });
    }

    const module = await LearningModule.create({
      title,
      content,
      subject,
      grade,
      difficulty,
      estimatedDuration,
      objectives,
      resources,
      createdBy: req.user._id
    });

    await module.populate('createdBy', 'name');
    res.status(201).json(module);
  } catch (error) {
    res.status(500).json({ message: 'Error creating learning module', error: error.message });
  }
};

// Get quizzes
const getQuizzes = async (req, res) => {
  try {
    const { subject, grade } = req.query;
    const filter = { isActive: true };
    
    if (subject) filter.subject = subject;
    if (grade) filter.grade = grade;

    const quizzes = await Quiz.find(filter)
      .populate('createdBy', 'name')
      .sort({ createdAt: -1 });
    
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching quizzes', error: error.message });
  }
};

// Create quiz (teachers only)
const createQuiz = async (req, res) => {
  try {
    const { title, subject, grade, description, questions, timeLimit, passingScore, maxAttempts } = req.body;
    
    if (req.user.role !== 'teacher' && req.user.role !== 'administrator') {
      return res.status(403).json({ message: 'Only teachers and administrators can create quizzes' });
    }

    const quiz = await Quiz.create({
      title,
      subject,
      grade,
      description,
      questions,
      timeLimit,
      passingScore,
      maxAttempts,
      createdBy: req.user._id
    });

    await quiz.populate('createdBy', 'name');
    res.status(201).json(quiz);
  } catch (error) {
    res.status(500).json({ message: 'Error creating quiz', error: error.message });
  }
};

// Get student progress
const getProgress = async (req, res) => {
  try {
    const progress = await Progress.find({ userId: req.user._id })
      .populate('moduleId', 'title subject grade')
      .sort({ lastAccessed: -1 });
    
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching progress', error: error.message });
  }
};

// Update progress
const updateProgress = async (req, res) => {
  try {
    const { moduleId, progressPercentage, timeSpent, status } = req.body;
    
    let progress = await Progress.findOne({ userId: req.user._id, moduleId });
    
    if (!progress) {
      progress = new Progress({ userId: req.user._id, moduleId });
    }
    
    if (progressPercentage !== undefined) progress.progressPercentage = progressPercentage;
    if (timeSpent !== undefined) progress.timeSpent += timeSpent;
    if (status) progress.status = status;
    
    progress.lastAccessed = new Date();
    if (status === 'completed') progress.completedAt = new Date();
    
    await progress.save();
    await progress.populate('moduleId', 'title subject grade');
    
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: 'Error updating progress', error: error.message });
  }
};

// Submit quiz attempt
const submitQuizAttempt = async (req, res) => {
  try {
    const { quizId, answers, timeSpent } = req.body;
    
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    
    // Check attempt limit
    const attemptCount = await QuizAttempt.countDocuments({ 
      userId: req.user._id, 
      quizId,
      status: 'completed'
    });
    
    if (attemptCount >= quiz.maxAttempts) {
      return res.status(400).json({ message: 'Maximum attempts exceeded' });
    }
    
    // Calculate score
    let totalPoints = 0;
    let maxPoints = 0;
    const processedAnswers = [];
    
    quiz.questions.forEach((question, index) => {
      const userAnswer = answers[index];
      const isCorrect = question.type === 'multiple-choice' 
        ? question.options.find(opt => opt.isCorrect)?.text === userAnswer?.selectedAnswer
        : question.correctAnswer === userAnswer?.selectedAnswer;
      
      const pointsEarned = isCorrect ? question.points : 0;
      totalPoints += pointsEarned;
      maxPoints += question.points;
      
      processedAnswers.push({
        questionId: question._id,
        selectedAnswer: userAnswer?.selectedAnswer || '',
        isCorrect,
        pointsEarned
      });
    });
    
    const score = maxPoints > 0 ? Math.round((totalPoints / maxPoints) * 100) : 0;
    const passed = score >= quiz.passingScore;
    
    const attempt = await QuizAttempt.create({
      userId: req.user._id,
      quizId,
      answers: processedAnswers,
      score,
      totalPoints,
      maxPoints,
      timeSpent,
      completedAt: new Date(),
      status: 'completed',
      passed
    });
    
    await attempt.populate('quizId', 'title subject grade');
    res.status(201).json(attempt);
  } catch (error) {
    res.status(500).json({ message: 'Error submitting quiz attempt', error: error.message });
  }
};

// Get quiz attempts
const getQuizAttempts = async (req, res) => {
  try {
    const attempts = await QuizAttempt.find({ userId: req.user._id })
      .populate('quizId', 'title subject grade')
      .sort({ createdAt: -1 });
    
    res.json(attempts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching quiz attempts', error: error.message });
  }
};

module.exports = {
  getLearningModules,
  getModulesBySubject,
  createLearningModule,
  getQuizzes,
  createQuiz,
  getProgress,
  updateProgress,
  submitQuizAttempt,
  getQuizAttempts
};
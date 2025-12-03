const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('../models/User');
const LearningModule = require('../models/LearningModule');
const Quiz = require('../models/Quiz');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

const initializeDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await LearningModule.deleteMany({});
    await Quiz.deleteMany({});

    console.log('Creating demo users...');

    // Create demo users
    const adminUser = await User.create({
      name: 'Administrator',
      email: 'admin@ssplp.edu.ss',
      password: 'password123',
      role: 'administrator'
    });

    const teacherUser = await User.create({
      name: 'Teacher John',
      email: 'teacher@ssplp.edu.ss',
      password: 'password123',
      role: 'teacher',
      subjects: ['Mathematics', 'Physics']
    });

    const studentUser = await User.create({
      name: 'Student Mary',
      email: 'student@ssplp.edu.ss',
      password: 'password123',
      role: 'student',
      grade: 'S3',
      subjects: ['Mathematics', 'English Language', 'Biology', 'Chemistry', 'Physics']
    });

    console.log('Creating sample learning modules...');

    // Create sample learning modules
    const mathModule = await LearningModule.create({
      title: 'Introduction to Algebra',
      subject: 'Mathematics',
      grade: 'S3',
      description: 'Learn the fundamentals of algebraic expressions and equations',
      content: 'Algebra is a branch of mathematics dealing with symbols and the rules for manipulating those symbols...',
      difficulty: 'Intermediate',
      estimatedDuration: 45,
      objectives: [
        'Understand algebraic expressions',
        'Solve linear equations',
        'Apply algebraic concepts to real-world problems'
      ],
      resources: [
        {
          type: 'video',
          title: 'Algebra Basics Video',
          url: 'https://example.com/algebra-video',
          description: 'Introduction video covering basic concepts'
        }
      ],
      createdBy: teacherUser._id
    });

    const englishModule = await LearningModule.create({
      title: 'Essay Writing Techniques',
      subject: 'English Language',
      grade: 'S3',
      description: 'Master the art of writing compelling essays',
      content: 'Essay writing is a fundamental skill that involves organizing thoughts and presenting arguments clearly...',
      difficulty: 'Intermediate',
      estimatedDuration: 60,
      objectives: [
        'Structure essays effectively',
        'Develop strong arguments',
        'Use proper grammar and vocabulary'
      ],
      createdBy: teacherUser._id
    });

    console.log('Creating sample quizzes...');

    // Create sample quizzes
    await Quiz.create({
      title: 'Algebra Basics Quiz',
      subject: 'Mathematics',
      grade: 'S3',
      description: 'Test your understanding of basic algebraic concepts',
      questions: [
        {
          question: 'What is the value of x in the equation 2x + 5 = 15?',
          type: 'multiple-choice',
          options: [
            { text: '5', isCorrect: true },
            { text: '10', isCorrect: false },
            { text: '7.5', isCorrect: false },
            { text: '2.5', isCorrect: false }
          ],
          explanation: 'Subtract 5 from both sides: 2x = 10, then divide by 2: x = 5',
          points: 2
        },
        {
          question: 'Simplify: 3x + 2x - x',
          type: 'multiple-choice',
          options: [
            { text: '4x', isCorrect: true },
            { text: '5x', isCorrect: false },
            { text: '6x', isCorrect: false },
            { text: '2x', isCorrect: false }
          ],
          explanation: 'Combine like terms: 3x + 2x - x = 5x - x = 4x',
          points: 2
        }
      ],
      timeLimit: 15,
      passingScore: 70,
      maxAttempts: 3,
      createdBy: teacherUser._id
    });

    await Quiz.create({
      title: 'English Grammar Quiz',
      subject: 'English Language',
      grade: 'S3',
      description: 'Test your knowledge of English grammar rules',
      questions: [
        {
          question: 'Which sentence is grammatically correct?',
          type: 'multiple-choice',
          options: [
            { text: 'She don\'t like apples.', isCorrect: false },
            { text: 'She doesn\'t like apples.', isCorrect: true },
            { text: 'She not like apples.', isCorrect: false },
            { text: 'She no like apples.', isCorrect: false }
          ],
          explanation: 'Use "doesn\'t" (does not) with third person singular subjects',
          points: 1
        }
      ],
      timeLimit: 10,
      passingScore: 60,
      maxAttempts: 5,
      createdBy: teacherUser._id
    });

    console.log('Database initialized successfully!');
    console.log('\nDemo Accounts:');
    console.log('Administrator: admin@ssplp.edu.ss / password123');
    console.log('Teacher: teacher@ssplp.edu.ss / password123');
    console.log('Student: student@ssplp.edu.ss / password123');

    process.exit(0);
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
};

initializeDatabase();
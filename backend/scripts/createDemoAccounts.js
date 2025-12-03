const bcrypt = require('bcryptjs');
const { User, sequelize } = require('../models');

async function createDemoAccounts() {
  try {
    await sequelize.sync({ force: true });
    
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    await User.bulkCreate([
      {
        name: 'Demo Student',
        email: 'student@ssplp.edu.ss',
        password: hashedPassword,
        userType: 'student',
        grade: 'Grade 10',
        language: 'english'
      },
      {
        name: 'Demo Teacher',
        email: 'teacher@ssplp.edu.ss',
        password: hashedPassword,
        userType: 'teacher',
        language: 'english'
      },
      {
        name: 'Demo Admin',
        email: 'admin@ssplp.edu.ss',
        password: hashedPassword,
        userType: 'administrator',
        language: 'english'
      }
    ]);
    
    console.log('Demo accounts created successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error creating demo accounts:', error);
    process.exit(1);
  }
}

createDemoAccounts();
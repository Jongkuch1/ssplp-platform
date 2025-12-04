const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '../.env' });

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// User Schema (inline for this script)
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'teacher', 'admin'], default: 'student' },
  grade: String,
  subjects: [String],
  profilePicture: String,
  lastActive: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);

async function createDemoAccounts() {
  try {
    // Clear existing demo accounts
    await User.deleteMany({ 
      email: { 
        $in: ['student@ssplp.org', 'teacher@ssplp.org', 'admin@ssplp.org'] 
      } 
    });
    
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    const demoAccounts = [
      {
        name: 'Demo Student',
        email: 'student@ssplp.org',
        password: hashedPassword,
        role: 'student',
        grade: 'Grade 10',
        subjects: ['Mathematics', 'English', 'Science']
      },
      {
        name: 'Demo Teacher',
        email: 'teacher@ssplp.org',
        password: hashedPassword,
        role: 'teacher',
        subjects: ['Mathematics', 'Science']
      },
      {
        name: 'Admin User',
        email: 'admin@ssplp.org',
        password: hashedPassword,
        role: 'admin'
      }
    ];
    
    await User.insertMany(demoAccounts);
    
    console.log('✅ Demo accounts created successfully!');
    console.log('\n📋 Login Credentials:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Student: student@ssplp.org / password123');
    console.log('Teacher: teacher@ssplp.org / password123');
    console.log('Admin:   admin@ssplp.org / password123');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating demo accounts:', error);
    process.exit(1);
  }
}

createDemoAccounts();
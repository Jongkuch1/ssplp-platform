const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Try Atlas connection first
    let mongoUri = process.env.MONGODB_URI;
    
    // Fallback to local MongoDB if Atlas fails
    if (!mongoUri || mongoUri.includes('<cluster-url>')) {
      mongoUri = 'mongodb://localhost:27017/ssplp_db';
      console.log('Using local MongoDB connection');
    }
    
    const conn = await mongoose.connect(mongoUri);
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error);
    console.log('\nTo fix this:');
    console.log('1. Get your Atlas connection string from MongoDB Atlas dashboard');
    console.log('2. Update MONGODB_URI in .env file');
    console.log('3. Or install local MongoDB for development');
    process.exit(1);
  }
};

module.exports = connectDB;
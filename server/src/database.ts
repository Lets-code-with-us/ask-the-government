import mongoose from 'mongoose';
import { User, Question, Vote } from './models';

export const connectDatabase = async (uri: string) => {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
    
    // Ensure indexes are created
    await User.ensureIndexes();
    await Question.ensureIndexes();
    await Vote.ensureIndexes();
    
    console.log('Database indexes ensured');
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
};

export const disconnectDatabase = async () => {
  try {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Database disconnection error:', error);
    throw error;
  }
};

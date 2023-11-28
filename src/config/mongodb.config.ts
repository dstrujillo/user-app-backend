import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const uri = process.env.MONGO_DB_API_KEY || '';

export const connectToMongoDb = async (): Promise<void> => {
  try {
    await mongoose.connect(uri);
    console.log('Connected to mongodb');
  } catch (err) {
    console.log('Failed to connect to mongodb', err);
  }
};

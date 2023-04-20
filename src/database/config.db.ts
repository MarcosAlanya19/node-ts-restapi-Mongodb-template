import mongoose from 'mongoose';

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN || '');

    console.log('Database connection');
  } catch (error) {
    console.log(error);
    throw new Error('Error connecting to database');
  }
};

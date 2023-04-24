import dotenv from 'dotenv';
dotenv.config();

export const config = {
  PORT: process.env.PORT || 3000,
  SECRET_JWT: process.env.SECRET_JWT?.toString() || '123456',
  SGOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',
  DB: {
    MONGODB_CNN: process.env.MONGODB_CNN,
  },
};

import dotenv from 'dotenv';
dotenv.config();

export const config = {
  PORT: process.env.PORT || 3000,
  SECRET_JWT: process.env.SECRET_JWT?.toString() || '123456',
  DB: {
    MONGODB_CNN: process.env.MONGODB_CNN,
  },
};

import jwt from 'jsonwebtoken';
import { config } from '../config';

export const generateJWT = async (uuid: string): Promise<string | null> => {
  try {
    const payload = { uuid };
    const token = jwt.sign(payload, config.SECRET_JWT, {
      expiresIn: '4h',
    });
    return token;
  } catch (err) {
    console.log(err);
    return null;
  }
};

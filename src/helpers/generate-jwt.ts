import jwt from 'jsonwebtoken';
import { config } from '../config';

export const generateJWT = async (uuid: string): Promise<string | null> => {
  try {
    // Payload hace referencia a mi User, desestructurando su uuid
    const payload = { uuid };
    // Genera un jwt, mediante el uuid y el secret key necesario de jwt
    const token = jwt.sign(payload, config.SECRET_JWT, {
      // Tiempo de vida del jwt
      expiresIn: '48h',
    });
    return token;
  } catch (err) {
    console.log(err);
    return null;
  }
};

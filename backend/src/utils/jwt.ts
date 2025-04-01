import jwt, { SignOptions } from 'jsonwebtoken';
import { IUser } from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export const generateToken = (user: IUser): string => {
  const payload = {
    id: user._id,
    username: user.username,
    email: user.email,
  };

  const options: SignOptions = {
    expiresIn: parseInt(JWT_EXPIRES_IN) || 7 * 24 * 60 * 60, // 7 days in seconds
  };

  return jwt.sign(payload, JWT_SECRET, options);
};

export const verifyToken = (token: string): jwt.JwtPayload => {
  try {
    return jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
  } catch (error) {
    throw new Error('Invalid token');
  }
}; 
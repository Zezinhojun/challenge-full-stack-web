import type { JwtPayload } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';

export const generateToken = (userId: number): string => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET ?? 'anykey', {
    expiresIn: '1h',
  });
};

export const verifyToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET ?? 'anykey') as JwtPayload;
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
};

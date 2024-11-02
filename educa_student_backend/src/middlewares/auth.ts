import type { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/jwt';

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const auth = (
  req: Request,
  res: Response,
  next: NextFunction,
): Response<any, Record<string, any>> | undefined => {
  try {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: 'Authorization token is required' });
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error('Error during authentication:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

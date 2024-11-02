import type { NextFunction, Request, Response } from 'express';
import type { IUser } from '../models/user';

export const validateUserData = async (
  req: Request<unknown, unknown, IUser>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        message: 'All fields are required: name, email, and password',
      });
      return;
    }

    if (!email || !password) {
      res.status(400).json({
        message: 'Both email and password are required',
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({
        message: 'Invalid email',
      });
      return;
    }

    next();
  } catch (error) {
    next(error);
  }
};

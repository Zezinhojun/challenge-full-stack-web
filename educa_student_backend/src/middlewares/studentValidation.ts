import type { NextFunction, Request, Response } from 'express';
import type { IStudent } from '../models/student';

export const validateStudentData = async (
  req: Request<unknown, unknown, IStudent>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { name, email, cpf, ra } = req.body;

    if (!name || !email || !ra || !cpf) {
      res.status(400).json({
        message: 'All fields are required: name, email, RA, and CPF',
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

    const cpfRegex = /^\d{11}$/;
    if (!cpfRegex.test(cpf)) {
      res.status(400).json({
        message: 'CPF must contain 11 numeric digits',
      });
      return;
    }

    next();
  } catch (error) {
    next(error);
  }
};

export const validateStudentUpdateData = async (
  req: Request<unknown, unknown, Partial<IStudent>>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { email, cpf } = req.body;

    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        res.status(400).json({
          message: 'Invalid email',
        });
        return;
      }
    }

    if (cpf) {
      const cpfRegex = /^\d{11}$/;
      if (!cpfRegex.test(cpf)) {
        res.status(400).json({
          message: 'Invalid CPF must contain 11 numeric digits',
        });
        return;
      }
    }
    next();
  } catch (error) {
    next(error);
  }
};

export const validateId = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id) || id <= 0) {
      res.status(400).json({
        message: 'Invalid ID',
      });
      return;
    }

    next();
  } catch (error) {
    next(error);
  }
};

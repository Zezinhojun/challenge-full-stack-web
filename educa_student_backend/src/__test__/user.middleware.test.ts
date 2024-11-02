import type { Request, Response, NextFunction } from 'express';
import { validateUserData } from '../middlewares/userValidation';
import type { IUser } from '../models/user';

describe('User Validation Middleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: jest.MockedFunction<NextFunction>;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
  });

  const validUserData: Partial<IUser> = {
    email: 'john@example.com',
    password: 'senha123',
  };

  describe('validateUserData', () => {
    it('should call next when all validations pass', async () => {
      mockRequest.body = validUserData;

      await validateUserData(
        mockRequest as Request<unknown, unknown, IUser>,
        mockResponse as Response,
        mockNext,
      );

      expect(mockNext).toHaveBeenCalled();
      expect(mockResponse.status).not.toHaveBeenCalled();
    });

    it('should return 400 when required fields are missing', async () => {
      mockRequest.body = {};

      await validateUserData(
        mockRequest as Request<unknown, unknown, IUser>,
        mockResponse as Response,
        mockNext,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'All fields are required: name, email, and password',
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should return 400 when email is invalid', async () => {
      mockRequest.body = { ...validUserData, email: 'invalid-email' };

      await validateUserData(
        mockRequest as Request<unknown, unknown, IUser>,
        mockResponse as Response,
        mockNext,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Invalid email',
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should return 400 when password is missing', async () => {
      mockRequest.body = { email: 'john@example.com' };

      await validateUserData(
        mockRequest as Request<unknown, unknown, IUser>,
        mockResponse as Response,
        mockNext,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'All fields are required: name, email, and password',
      });
      expect(mockNext).not.toHaveBeenCalled();
    });
  });
});

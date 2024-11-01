import type { Request, Response, NextFunction } from 'express';
import type { IStudent } from '../models/student';
import {
  validateId,
  validateStudentData,
  validateStudentUpdateData,
} from '../middlewares/studentValidation';

describe('Student Validation Middlewares', () => {
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

  const validStudentData = {
    name: 'John Doe',
    email: 'john@example.com',
    ra: '12345',
    cpf: '12345678901',
  };

  describe('validateStudentData', () => {
    it('should call next when all validations pass', async () => {
      mockRequest.body = validStudentData;

      await validateStudentData(
        mockRequest as Request<unknown, unknown, IStudent>,
        mockResponse as Response,
        mockNext,
      );

      expect(mockNext).toHaveBeenCalled();
      expect(mockResponse.status).not.toHaveBeenCalled();
    });

    it('should return 400 when required fields are missing', async () => {
      mockRequest.body = {};

      await validateStudentData(
        mockRequest as Request<unknown, unknown, IStudent>,
        mockResponse as Response,
        mockNext,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'All fields are required: name, email, RA, and CPF',
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should return 400 when email is invalid', async () => {
      mockRequest.body = { ...validStudentData, email: 'invalid-email' };

      await validateStudentData(
        mockRequest as Request<unknown, unknown, IStudent>,
        mockResponse as Response,
        mockNext,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Invalid email',
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should return 400 when CPF is invalid', async () => {
      mockRequest.body = { ...validStudentData, cpf: 'invalid-cpf' };

      await validateStudentData(
        mockRequest as Request<unknown, unknown, IStudent>,
        mockResponse as Response,
        mockNext,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'CPF must contain 11 numeric digits',
      });
      expect(mockNext).not.toHaveBeenCalled();
    });
  });

  describe('validateStudentUpdateData', () => {
    it('should call next when no updates are provided', async () => {
      mockRequest.body = {};

      await validateStudentUpdateData(
        mockRequest as Request<unknown, unknown, Partial<IStudent>>,
        mockResponse as Response,
        mockNext,
      );

      expect(mockNext).toHaveBeenCalled();
      expect(mockResponse.status).not.toHaveBeenCalled();
    });

    it('should return 400 when email is invalid', async () => {
      mockRequest.body = {
        email: 'invalid-email',
      };

      await validateStudentUpdateData(
        mockRequest as Request<unknown, unknown, Partial<IStudent>>,
        mockResponse as Response,
        mockNext,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Invalid email',
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should return 400 when CPF is invalid', async () => {
      mockRequest.body = {
        cpf: 'invalid',
      };

      await validateStudentUpdateData(
        mockRequest as Request<unknown, unknown, Partial<IStudent>>,
        mockResponse as Response,
        mockNext,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Invalid CPF must contain 11 numeric digits',
      });
      expect(mockNext).not.toHaveBeenCalled();
    });
  });

  describe('validateId', () => {
    it('should call next when ID is valid', async () => {
      mockRequest.params = { id: '1' };

      await validateId(
        mockRequest as Request,
        mockResponse as Response,
        mockNext,
      );

      expect(mockNext).toHaveBeenCalled();
      expect(mockResponse.status).not.toHaveBeenCalled();
    });

    it('should return 400 when ID is not a number', async () => {
      mockRequest.params = { id: 'abc' };

      await validateId(
        mockRequest as Request,
        mockResponse as Response,
        mockNext,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Invalid ID',
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should return 400 when ID is not positive', async () => {
      mockRequest.params = { id: '0' };

      await validateId(
        mockRequest as Request,
        mockResponse as Response,
        mockNext,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Invalid ID',
      });
      expect(mockNext).not.toHaveBeenCalled();
    });
  });
});

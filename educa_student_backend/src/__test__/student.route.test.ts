/* eslint-disable @typescript-eslint/unbound-method */
import { StudentRoutes } from './../routes/student';
import type { NextFunction, Request, Response } from 'express';
import { StudentController } from '../controllers/student';

jest.mock('../controllers/student', () => {
  return {
    StudentController: jest.fn().mockImplementation(() => {
      return {
        create: jest.fn(),
        findAll: jest.fn(),
        findById: jest.fn(),
        update: jest.fn(),
        remove: jest.fn(),
      };
    }),
  };
});

describe('StudentRoutes', () => {
  let studentRoutes: StudentRoutes;
  let mockStudentController: jest.Mocked<StudentController>;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: jest.MockedFunction<NextFunction>;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});

    studentRoutes = new StudentRoutes();
    mockStudentController =
      new StudentController() as jest.Mocked<StudentController>;
    (studentRoutes as any).studentController = mockStudentController;

    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };
    mockNext = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('createHandler', () => {
    it('should call studentController.create', async () => {
      await studentRoutes.createHandler(
        mockRequest as Request,
        mockResponse as Response,
        mockNext,
      );

      expect(mockStudentController.create).toHaveBeenCalledWith(
        mockRequest,
        mockResponse,
      );
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should call next when an error occurs', async () => {
      const error = new Error('Test error');
      mockStudentController.create.mockRejectedValue(error);

      await studentRoutes.createHandler(
        mockRequest as Request,
        mockResponse as Response,
        mockNext,
      );

      expect(mockStudentController.create).toHaveBeenCalledWith(
        mockRequest,
        mockResponse,
      );
      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe('findAllHandler', () => {
    it('should call studentController.findAll', async () => {
      await studentRoutes.findAllHandler(
        mockRequest as Request,
        mockResponse as Response,
        mockNext,
      );

      expect(mockStudentController.findAll).toHaveBeenCalledWith(
        mockRequest,
        mockResponse,
      );
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should call next when an error occurs', async () => {
      const error = new Error('Test error');
      mockStudentController.findAll.mockRejectedValue(error);

      await studentRoutes.findAllHandler(
        mockRequest as Request,
        mockResponse as Response,
        mockNext,
      );

      expect(mockStudentController.findAll).toHaveBeenCalledWith(
        mockRequest,
        mockResponse,
      );
      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe('findByIdHandler', () => {
    it('should call studentController.findById', async () => {
      await studentRoutes.findByIdHandler(
        mockRequest as Request,
        mockResponse as Response,
        mockNext,
      );

      expect(mockStudentController.findById).toHaveBeenCalledWith(
        mockRequest,
        mockResponse,
      );
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should call next when an error occurs', async () => {
      const error = new Error('Test error');
      mockStudentController.findById.mockRejectedValue(error);

      await studentRoutes.findByIdHandler(
        mockRequest as Request,
        mockResponse as Response,
        mockNext,
      );

      expect(mockStudentController.findById).toHaveBeenCalledWith(
        mockRequest,
        mockResponse,
      );
      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe('updateHandler', () => {
    it('should call studentController.update', async () => {
      await studentRoutes.updateHandler(
        mockRequest as Request,
        mockResponse as Response,
        mockNext,
      );

      expect(mockStudentController.update).toHaveBeenCalledWith(
        mockRequest,
        mockResponse,
      );
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should call next when an error occurs', async () => {
      const error = new Error('Test error');
      mockStudentController.update.mockRejectedValue(error);

      await studentRoutes.updateHandler(
        mockRequest as Request,
        mockResponse as Response,
        mockNext,
      );

      expect(mockStudentController.update).toHaveBeenCalledWith(
        mockRequest,
        mockResponse,
      );
      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe('removeHandler', () => {
    it('should call studentController.remove', async () => {
      await studentRoutes.removeHandler(
        mockRequest as Request,
        mockResponse as Response,
        mockNext,
      );

      expect(mockStudentController.remove).toHaveBeenCalledWith(
        mockRequest,
        mockResponse,
      );
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should call next when an error occurs', async () => {
      const error = new Error('Test error');
      mockStudentController.remove.mockRejectedValue(error);

      await studentRoutes.removeHandler(
        mockRequest as Request,
        mockResponse as Response,
        mockNext,
      );

      expect(mockStudentController.remove).toHaveBeenCalledWith(
        mockRequest,
        mockResponse,
      );
      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });
});

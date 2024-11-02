/* eslint-disable @typescript-eslint/unbound-method */
import type { IUser } from '../models/user';
import type { NextFunction, Request, Response } from 'express';
import { UserRoutes } from './../routes/user';
import { UserController } from '../controllers/user';

jest.mock('../controllers/user', () => {
  return {
    UserController: jest.fn().mockImplementation(() => {
      return {
        create: jest.fn(),
        login: jest.fn(),
      };
    }),
  };
});

describe('UserRoutes', () => {
  let userRoutes: UserRoutes;
  let mockUserController: jest.Mocked<UserController>;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: jest.MockedFunction<NextFunction>;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});

    userRoutes = new UserRoutes();
    mockUserController = new UserController() as jest.Mocked<UserController>;
    (userRoutes as any).userController = mockUserController;

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
    it('should call userController.create', async () => {
      await userRoutes.createHandler(
        mockRequest as Request,
        mockResponse as Response,
        mockNext,
      );

      expect(mockUserController.create).toHaveBeenCalledWith(
        mockRequest,
        mockResponse,
      );
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should call next when an error occurs', async () => {
      const error = new Error('Test error');
      mockUserController.create.mockRejectedValue(error);

      await userRoutes.createHandler(
        mockRequest as Request,
        mockResponse as Response,
        mockNext,
      );

      expect(mockUserController.create).toHaveBeenCalledWith(
        mockRequest,
        mockResponse,
      );
      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe('loginHandler', () => {
    it('should call userController.login', async () => {
      await userRoutes.loginHandler(
        mockRequest as Request<unknown, unknown, IUser>,
        mockResponse as Response,
        mockNext,
      );

      expect(mockUserController.login).toHaveBeenCalledWith(
        mockRequest,
        mockResponse,
      );
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should call next when an error occurs', async () => {
      const error = new Error('Test error');
      mockUserController.login.mockRejectedValue(error);

      await userRoutes.loginHandler(
        mockRequest as Request<unknown, unknown, IUser>,
        mockResponse as Response,
        mockNext,
      );

      expect(mockUserController.login).toHaveBeenCalledWith(
        mockRequest,
        mockResponse,
      );
      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });
});

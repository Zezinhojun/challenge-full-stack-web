import type { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/jwt';
import { auth } from '../middlewares/auth';

jest.mock('../utils/jwt');

describe('Auth Middleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: jest.MockedFunction<NextFunction>;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});

    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
  });

  it('should call next when the token is valid', () => {
    const mockUserId = '12345';
    mockRequest.header = jest.fn().mockReturnValue(`Bearer valid_token`);
    (verifyToken as jest.Mock).mockReturnValue({ id: mockUserId });

    auth(mockRequest as Request, mockResponse as Response, mockNext);

    expect(mockRequest.userId).toBe(mockUserId);
    expect(mockNext).toHaveBeenCalled();
    expect(mockResponse.status).not.toHaveBeenCalled();
  });

  it('should return 401 if no token is provided', () => {
    mockRequest.header = jest.fn().mockReturnValue(undefined);

    auth(mockRequest as Request, mockResponse as Response, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Authorization token is required',
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should return 401 if the token is invalid', () => {
    mockRequest.header = jest.fn().mockReturnValue(`Bearer invalid_token`);
    (verifyToken as jest.Mock).mockReturnValue(null);

    auth(mockRequest as Request, mockResponse as Response, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Unauthorized',
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should return 500 if an error occurs during token verification', () => {
    mockRequest.header = jest.fn().mockReturnValue(`Bearer valid_token`);
    (verifyToken as jest.Mock).mockImplementation(() => {
      throw new Error('Token verification error');
    });

    auth(mockRequest as Request, mockResponse as Response, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Internal Server Error',
    });
    expect(mockNext).not.toHaveBeenCalled();
  });
});

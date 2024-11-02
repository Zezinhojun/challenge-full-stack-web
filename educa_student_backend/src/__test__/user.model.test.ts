import type { Repository } from 'typeorm';
import { AppDataSource } from '../config/db';
import bcrypt from 'bcrypt';
import { User } from '../models/user';

jest.mock('../config/db', () => ({
  AppDataSource: {
    getRepository: () => jest.fn(),
  },
}));

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
  hash: jest.fn().mockImplementation(() => 'hashed_password'),
}));

describe('User model', () => {
  let user: User;
  let mockRepository: jest.Mocked<
    Pick<
      Repository<User>,
      'create' | 'save' | 'find' | 'findOneBy' | 'delete' | 'findOne'
    >
  >;

  const mockUserData: Partial<User> = {
    email: 'email@email.com',
    password: 'password',
    role: 'admin',
  };

  const mockId = 4;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});

    mockRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      findOneBy: jest.fn(),
      delete: jest.fn(),
    };

    jest
      .spyOn(AppDataSource, 'getRepository')
      .mockReturnValue(mockRepository as unknown as Repository<User>);
    user = new User();
  });

  describe('createUser', () => {
    it('should create and save a new user successfully', async () => {
      const hashedPassword = 'hashed_password';
      const userWithHashedPassword = {
        ...mockUserData,
        id: mockId,
        password: hashedPassword,
      };

      mockRepository.create.mockReturnValue(userWithHashedPassword as User);
      mockRepository.save.mockResolvedValue(userWithHashedPassword as User);
      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);

      const result = await user.createUser(
        mockUserData.email ?? '',
        mockUserData.password ?? '',
        mockUserData.role ?? '',
      );

      expect(bcrypt.hash).toHaveBeenCalledWith(mockUserData.password, 10);
      expect(mockRepository.create).toHaveBeenCalledWith({
        email: mockUserData.email,
        password: hashedPassword,
        role: mockUserData.role,
      });
      expect(mockRepository.save).toHaveBeenCalledWith(userWithHashedPassword);
      expect(result).toEqual(userWithHashedPassword);
    });

    it('should throw an error when failing to add a user', async () => {
      mockRepository.save.mockRejectedValue(new Error('Database error'));
      await expect(
        user.createUser(user.email, user.password, user.role),
      ).rejects.toThrow('Could not add user');
    });
  });

  describe('login', () => {
    const testEmail = 'test@email.com';
    const testPassword = 'password123;';
    const hashedPassword = 'hashed_password';

    it('should return user when credentials are valid', async () => {
      const mockeUser = {
        id: 1,
        email: testEmail,
        password: hashedPassword,
        role: 'user',
      };

      mockRepository.findOne.mockResolvedValue(mockeUser as User);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await user.login(testEmail, testPassword);

      expect(result).toEqual(mockeUser);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { email: testEmail },
      });
      expect(bcrypt.compare).toHaveBeenCalledWith(testPassword, hashedPassword);
    });

    it('should return null when user is not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      const result = await user.login(testEmail, testPassword);

      expect(result).toBeNull();
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { email: testEmail },
      });
      expect(bcrypt.compare).not.toHaveBeenCalled();
    });

    it('should return null when password is invalid', async () => {
      const mockedUser = {
        id: 1,
        email: testEmail,
        password: hashedPassword,
        role: 'user',
      };

      mockRepository.findOne.mockResolvedValue(mockedUser as User);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      const result = await user.login(testEmail, testPassword);

      expect(result).toBeNull();
      expect(bcrypt.compare).toHaveBeenCalledWith(testPassword, hashedPassword);
    });

    it('should throw error when database operation fails', async () => {
      mockRepository.findOne.mockRejectedValue(new Error('Database error'));

      await expect(user.login(testEmail, testPassword)).rejects.toThrow(
        'Could not log in user',
      );
    });
  });
});

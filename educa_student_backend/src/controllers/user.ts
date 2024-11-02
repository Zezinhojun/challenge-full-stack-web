import type { Request, Response } from 'express';
import { User } from '../models/user';
import type { IUser } from '../models/user';
import { generateToken } from '../utils/jwt';

export class UserController {
  private readonly userModel: User;

  constructor() {
    this.userModel = new User();
  }

  async create(
    req: Request,
    res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const userData: IUser = req.body;
      const newUser = await this.userModel.createUser(
        userData.email,
        userData.password,
        userData.role,
      );
      return res.status(201).json({
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
      });
    } catch (error) {
      console.error('Error creating user:', error);
      return res.status(500).json({ message: 'Could not create user' });
    }
  }

  async login(
    req: Request<unknown, unknown, IUser>,
    res: Response,
  ): Promise<Response<any, Record<string, any>> | undefined> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: 'Email and password are required' });
      }

      const user = await this.userModel.login(email, password);

      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = generateToken(Number(user.id));

      const { password: _, ...userWithoutPassword } = user;
      return res.status(200).json({
        user: userWithoutPassword,
        token,
      });
    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({ message: 'Could not process login' });
    }
  }
}

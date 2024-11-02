import type { NextFunction, Request, Response } from 'express';
import type { IUser } from '../models/user';
import { Router } from 'express';
import { UserController } from '../controllers/user';
import { validateUserData } from '../middlewares/userValidation';

export class UserRoutes {
  public router: Router;
  private readonly userController: UserController;

  constructor() {
    this.router = Router();
    this.userController = new UserController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/register', validateUserData, this.createHandler);
    this.router.post('/login', validateUserData, this.loginHandler);
  }

  readonly createHandler = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await this.userController.create(req, res);
    } catch (error) {
      next(error);
    }
  };

  readonly loginHandler = async (
    req: Request<unknown, unknown, IUser>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await this.userController.login(req, res);
    } catch (error) {
      next(error);
    }
  };
}

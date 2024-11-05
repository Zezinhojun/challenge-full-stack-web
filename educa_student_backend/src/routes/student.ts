import { type NextFunction, type Request, type Response } from 'express';
import { Router } from 'express';
import { StudentController } from '../controllers/student';
import {
  validateId,
  validateStudentData,
  validateStudentUpdateData,
} from '../middlewares/studentValidation';

export class StudentRoutes {
  public router: Router;
  private readonly studentController: StudentController;

  constructor() {
    this.router = Router();
    this.studentController = new StudentController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/', validateStudentData, this.createHandler);
    this.router.get('/', this.findAllHandler);
    this.router.get('/:id', validateId, this.findByIdHandler);
    this.router.put(
      '/:id',
      validateId,
      validateStudentUpdateData,
      this.updateHandler,
    );
    this.router.delete('/:id', validateId, this.removeHandler);
    this.router.post('/populate', this.populateWithFakeDataHandler);

  }

  readonly createHandler = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await this.studentController.create(req, res);
    } catch (error) {
      next(error);
    }
  };

  readonly findAllHandler = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await this.studentController.findAll(req, res);
    } catch (error) {
      next(error);
    }
  };

  readonly findByIdHandler = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await this.studentController.findById(req, res);
    } catch (error) {
      next(error);
    }
  };

  readonly updateHandler = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await this.studentController.update(req, res);
    } catch (error) {
      next(error);
    }
  };

  readonly removeHandler = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await this.studentController.remove(req, res);
    } catch (error) {
      next(error);
    }
  };

  readonly populateWithFakeDataHandler = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await this.studentController.populateWithFakeData(req, res);
    } catch (error) {
      next(error);
    }
  };
}

import 'reflect-metadata';
import type { Application } from 'express';
import express, { json } from 'express';
import cors from 'cors';
import { connectDB } from './config/db';
import { StudentRoutes } from './routes/student';
import { errorHandler } from './middlewares/errorHandler';
import { UserRoutes } from './routes/user';
import { swaggerSpec } from '../swagger';
import swaggerUi from 'swagger-ui-express';

export class App {
  private readonly app: Application;
  private readonly port: number;

  constructor() {
    this.app = express();
    this.port = parseInt(process.env.PORT ?? '3000');
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initalizedErrorHandling();
  }

  private initializeMiddlewares(): void {
    this.app.use(json());
    this.app.use(cors());
  }

  private initializeRoutes(): void {
    const studentRoutes = new StudentRoutes();
    const userRoutes = new UserRoutes();
    this.app.use('/api/students', studentRoutes.router);
    this.app.use('/api/users', userRoutes.router);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  }

  private initalizedErrorHandling(): void {
    this.app.use(errorHandler);
  }

  public async start(): Promise<void> {
    try {
      await connectDB();
      this.app.listen(this.port, () => {
        console.log(`Server running at http://localhost:${this.port}`);
        console.log(
          `Students API available at http://localhost:${this.port}/api/students\nUser API available at http://localhost:${this.port}/api/user`,
        );
      });
    } catch (error) {
      console.error('Failed to start the server:', error);
      process.exit(1);
    }
  }
}

const app = new App();
app.start().catch((error) => {
  console.error('Failed to start the application', error);
  process.exit(1);
});

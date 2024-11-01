import 'reflect-metadata';
import type { Application } from 'express';
import express, { json } from 'express';
import cors from 'cors';
import { connectDB } from './config/db';
import { StudentRoutes } from './routes/student';
import { errorHandler } from './middlewares/errorHandler';

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
    this.app.use('/api/students', studentRoutes.router);
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
          `Students API available at http://localhost:${this.port}/api/students`,
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

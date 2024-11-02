import { join } from 'path';
import { DataSource } from 'typeorm';
import { Student } from '../models/student';
import { User } from '../models/user';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: parseInt(process.env.DB_PORT ?? '5432'),
  username: process.env.DB_USER ?? 'user',
  password: process.env.DB_PASSWORD ?? 'postgres',
  database: process.env.DB_NAME ?? 'postgres',
  synchronize: process.env.NODE_ENV === 'development',
  logging: process.env.NODE_ENV === 'development',
  entities: [Student, User],
  migrations: [join(__dirname, '..', 'migrations', '*.{ts,js}')],
});

export const connectDB = async (): Promise<void> => {
  try {
    await AppDataSource.initialize();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Error connecting to the database', error);
    process.exit(1);
  }
};

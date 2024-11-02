import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AppDataSource } from '../config/db';
import bcrypt from 'bcrypt';

export interface IUser {
  id?: number;
  email: string;
  password: string;
  role: string;
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  email!: string;

  @Column({ type: 'varchar', length: 255 })
  password!: string;

  @Column({ type: 'varchar', length: 50 })
  role!: string;

  async createUser(
    email: string,
    password: string,
    role: string = 'admin',
  ): Promise<User> {
    try {
      const userRepository = AppDataSource.getRepository(User);
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = userRepository.create({
        email,
        password: hashedPassword,
        role,
      });

      return await userRepository.save(user);
    } catch (error) {
      console.error('Error adding user:', error);
      throw new Error('Could not add user');
    }
  }

  async login(email: string, password: string): Promise<User | null> {
    try {
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({ where: { email } });

      if (!user) return null;

      const isValid = await bcrypt.compare(password, user.password);
      return isValid ? user : null;
    } catch (error) {
      console.error('Error during user login:', error);
      throw new Error('Could not log in user');
    }
  }
}

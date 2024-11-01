import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { AppDataSource } from "../config/db";

export interface IStudent {
    id?: number;
    name: string;
    email: string;
    ra: string;
    cpf: string
}

@Entity()
export class Student {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name?: string;

    @Column({ unique: true })
    email?: string;

    @Column({ unique: true })
    ra?: string;

    @Column({ unique: true })
    cpf?: string

    async addStudent(studentData: IStudent): Promise<Student> {
        const studentRepository = AppDataSource.getRepository(Student)
        try {
            const student = studentRepository.create(studentData)
            return await studentRepository.save(student)
        } catch (error) {
            console.error('Error adding student:', error);
            throw new Error('Could not add student');
        }
    }

    async getAllStudents(): Promise<Student[]> {
        const studentRepository = AppDataSource.getRepository(Student)
        try {
            return await studentRepository.find()
        } catch (error) {
            console.error('Error fetching students:', error);
            throw new Error('Could not fetch students');
        }
    }

    async getStudentById(id: number): Promise<Student | null> {
        const studentRepository = AppDataSource.getRepository(Student)
        try {
            return await studentRepository.findOneBy({ id })
        } catch (error) {
            console.error(`Error fetching student with id ${id}:`, error);
            throw new Error(`Could not fetch student with id ${id}`);
        }
    }

    async updateStudent(id: number, studentData: Partial<IStudent | null>): Promise<Student> {
        const studentRepository = AppDataSource.getRepository(Student)
        try {
            const student = await studentRepository.findOneBy({ id })
            if (!student) {
                throw new Error('Student not found');
            }
            Object.assign(student, studentData)
            return await studentRepository.save(student)
        } catch (error) {
            console.error(`Error updating student with id ${id}:`, error);
            throw new Error(`Could not update student with id ${id}`)
        }
    }

    async removeStudent(id: number): Promise<void> {
        const studentRepository = AppDataSource.getRepository(Student)
        try {
            await studentRepository.delete(id)
        } catch (error) {
            console.error(`Error removing student with id ${id}:`, error);
            throw new Error(`Could not remove student with id ${id}`);
        }
    }
}
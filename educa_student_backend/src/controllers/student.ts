import type { Request, Response } from 'express';
import type { IStudent } from '../models/student';
import { Student } from '../models/student';

export class StudentController {
  private readonly studentModel: Student;

  constructor() {
    this.studentModel = new Student();
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const studentData: IStudent = req.body;
      const existingStudentByEmail =
        await this.studentModel.studentExistsByEmail(studentData.email);
      const existingStudentByRA = await this.studentModel.studentExistsByRA(
        studentData.ra,
      );
      const existingStudentByCpf = await this.studentModel.studentExistsByCpf(
        studentData.cpf,
      );

      if (
        existingStudentByEmail ??
        existingStudentByRA ??
        existingStudentByCpf
      ) {
        return res
          .status(409)
          .json({
            message:
              'Student already exists with the provided email, ID, RA or CPF',
          });
      }
      const newStudent = await this.studentModel.addStudent(studentData);
      return res.status(201).json(newStudent);
    } catch (error) {
      console.error('Error creating student:', error);
      return res.status(500).json({ message: 'Could not create student' });
    }
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const students = await this.studentModel.getAllStudents();
      return res.status(200).json(students);
    } catch (error) {
      console.error('Error fetching students:', error);
      return res.status(500).json({ message: 'Could not fetch students' });
    }
  }

  async findById(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      const student = await this.studentModel.getStudentById(id);
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }

      return res.status(200).json(student);
    } catch (error) {
      console.error('Error fetching student:', error);
      return res.status(500).json({ message: 'Could not fetch student' });
    }
  }

  async update(
    req: Request,
    res: Response,
  ): Promise<Response<any, Record<string, any>> | undefined> {
    try {
      const id = Number(req.params.id);
      const studentData: Partial<IStudent> = req.body;
      const updatedStudent = await this.studentModel.updateStudent(
        id,
        studentData,
      );
      return res.status(200).json(updatedStudent);
    } catch (error) {
      console.error('Error updating student:', error);
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
    }
  }

  async remove(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      await this.studentModel.removeStudent(id);
      return res.status(204).send();
    } catch (error) {
      console.error('Error removing student:', error);
      return res.status(500).json({ message: 'Could not remove student' });
    }
  }
}

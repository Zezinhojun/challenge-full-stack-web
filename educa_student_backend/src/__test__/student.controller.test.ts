import type { Request, Response } from "express";
import { StudentController } from "../controllers/student"
import { Student } from "../models/student";

jest.mock('../models/student', () => {
  return {
    Student: jest.fn().mockImplementation(() => {
      return {
        addStudent: jest.fn(),
        getAllStudents: jest.fn(),
        getStudentById: jest.fn(),
        updateStudent: jest.fn(),
        removeStudent: jest.fn(),
        studentExistsByEmail: jest.fn(),
        studentExistsById: jest.fn(),
        studentExistsByRA: jest.fn(),
        studentExistsByCpf: jest.fn(),
      }
    })
  }
})

describe('StudentController', () => {
  let studentController: StudentController;
  let mockRequest: Partial<Request>
  let mockResponse: Partial<Response>;
  let mockStudent: InstanceType<typeof Student>

  const mockStudentData = {
    id: 1,
    name: 'Some Name',
    email: 'email@example.com',
    ra: '12345',
    cpf: '123.456.789-00'
  };

  beforeEach(() => {
    jest.clearAllMocks()

    mockStudent = new Student()
    studentController = new StudentController();
    (studentController as any).studentModel = mockStudent;

    mockRequest = {}
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn()
    }
  })

  describe('create', () => {
    it('should create a new student successfully', async () => {
      (mockStudent.studentExistsByEmail as jest.Mock).mockResolvedValue(false);
      (mockStudent.studentExistsById as jest.Mock).mockResolvedValue(false);
      (mockStudent.studentExistsByRA as jest.Mock).mockResolvedValue(false);
      (mockStudent.studentExistsByCpf as jest.Mock).mockResolvedValue(false);
      (mockStudent.addStudent as jest.Mock).mockResolvedValue(mockStudentData);

      mockRequest.body = mockStudentData;

      await studentController.create(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(mockStudentData);
    });

    it('should return 409 if student already exists', async () => {
      (mockStudent.studentExistsByEmail as jest.Mock).mockResolvedValue(true);
      (mockStudent.studentExistsById as jest.Mock).mockResolvedValue(true);
      (mockStudent.studentExistsByRA as jest.Mock).mockResolvedValue(false);
      (mockStudent.studentExistsByCpf as jest.Mock).mockResolvedValue(false);

      mockRequest.body = mockStudentData;

      await studentController.create(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(409);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Student already exists with the provided email, ID, RA or CPF' });
    });

    it('should handle error when creating a student fails', async () => {
      mockRequest.body = mockStudentData;
      (mockStudent.addStudent as jest.Mock).mockRejectedValue(new Error('Error'));

      await studentController.create(
        mockRequest as Request,
        mockResponse as Response
      )

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Could not create student' })
    })
  })

  describe('findAll', () => {
    it('should return all students successfully', async () => {
      const mockStudents = [mockStudentData];
      (mockStudent.getAllStudents as jest.Mock).mockResolvedValue(mockStudents);

      await studentController.findAll(
        mockRequest as Request,
        mockResponse as Response
      )

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockStudents)
    })

    it('should handler error when fetching students fails', async () => {
      (mockStudent.getAllStudents as jest.Mock).mockRejectedValue(new Error('Error'));

      await studentController.findAll(
        mockRequest as Request,
        mockResponse as Response
      )

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Could not fetch students' })
    })
  })

  describe('findById', () => {
    it('should return a student by id successfully', async () => {
      mockRequest.params = { id: '1' };
      (mockStudent.getStudentById as jest.Mock).mockResolvedValue(mockStudentData);

      await studentController.findById(
        mockRequest as Request,
        mockResponse as Response
      )

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockStudentData)
    })

    it('should return 404 when student is not found', async () => {
      mockRequest.params = { id: '999' };
      (mockStudent.getStudentById as jest.Mock).mockResolvedValue(null);

      await studentController.findById(
        mockRequest as Request,
        mockResponse as Response
      )

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Student not found' })
    })

  })
  describe('update', () => {
    it('should update a student sucessfully', async () => {
      const updateData = { name: 'any name updated' };
      const updatedStudent = { ...mockStudentData, ...updateData };

      mockRequest.params = { id: '1' };
      mockRequest.body = updateData;
      (mockStudent.updateStudent as jest.Mock).mockResolvedValue(updatedStudent);

      await studentController.update(
        mockRequest as Request,
        mockResponse as Response
      )

      expect(mockResponse.status).toHaveBeenCalledWith(200)
      expect(mockResponse.json).toHaveBeenCalledWith(updatedStudent);
    })
  })

  describe('remove', () => {
    it('should remove a student successfully', async () => {
      mockRequest.params = { id: '1' };
      (mockStudent.removeStudent as jest.Mock).mockResolvedValue(undefined);

      await studentController.remove(
        mockRequest as Request,
        mockResponse as Response
      )

      expect(mockResponse.status).toHaveBeenCalledWith(204)
      expect(mockResponse.send).toHaveBeenCalled()
    })

    it('should handle error when removing a student fails', async () => {
      mockRequest.params = { id: '1' };
      (mockStudent.removeStudent as jest.Mock).mockRejectedValue(new Error('Error'));

      await studentController.remove(
        mockRequest as Request,
        mockResponse as Response
      )

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Could not remove student' })
    })
  })
})
import type { DeleteResult, Repository } from "typeorm";
import type { IStudent } from '../models/student'
import { Student } from "../models/student";
import { AppDataSource } from "../config/db";

jest.mock("../config/db", () => ({
    AppDataSource: {
        getRepository: () => jest.fn(),
    },
}));

describe('Student model', () => {
    let student: Student;
    let mockRepository: jest.Mocked<Pick<Repository<Student>, 'create' | 'save' | 'find' | 'findOneBy' | 'delete' | 'findOne'>>;

    const mockStudentData: Partial<Student> & IStudent = {
        name: 'Some Name',
        email: 'email@example.com',
        ra: '12345',
        cpf: '123.456.789-00'
    }

    const mockId = 4

    beforeEach(() => {
        jest.clearAllMocks()

        mockRepository = {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            findOneBy: jest.fn(),
            delete: jest.fn(),
        }

        jest.spyOn(AppDataSource, 'getRepository').mockReturnValue(mockRepository as unknown as Repository<Student>);
        student = new Student()
    })

    describe('addStudent', () => {
        it('should create and save a new student successfully.', async () => {

            const studentEntity = new Student();
            Object.assign(studentEntity, { ...mockStudentData, id: mockId });

            mockRepository.create.mockReturnValue(studentEntity);
            mockRepository.save.mockResolvedValue(studentEntity);

            const result = await student.addStudent(mockStudentData);
            expect(mockRepository.create).toHaveBeenCalledWith(mockStudentData);
            expect(mockRepository.save).toHaveBeenCalledWith(studentEntity);
            expect(result).toEqual({ id: mockId, ...mockStudentData })
        })

        it('should throw an error when failing to add a student', async () => {
            mockRepository.save.mockRejectedValue(new Error('Database error'));

            await expect(student.addStudent(mockStudentData))
                .rejects
                .toThrow('Could not add student')
        })
    })

    describe('getAllStudents', () => {
        it('should return a list of students successfully.', async () => {
            const mockStudents: Student[] = [
                { id: 1, ...mockStudentData },
                { id: 2, ...mockStudentData, email: 'maria@example.com' }
            ] as Student[];

            mockRepository.find.mockResolvedValue(mockStudents)

            const result = await student.getAllStudents()

            expect(mockRepository.find).toHaveBeenCalled()
            expect(result).toEqual(mockStudents)
        })

        it('should throw an error when failing to fetch students.', async () => {
            mockRepository.find.mockRejectedValue(new Error('Database error'));

            await expect(student.getAllStudents())
                .rejects
                .toThrow('Could not fetch students')
        })
    })

    describe('getStudentById', () => {
        it('should return a specific student successfully.', async () => {
            const mockStudent: Partial<Student> = { id: mockId, ...mockStudentData }
            mockRepository.findOneBy.mockResolvedValue(mockStudent as Student)

            const result = await student.getStudentById(mockId);

            expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: mockId })
            expect(result).toEqual(mockStudent)
        })

        it('should return null when failing to fetch a student by id.', async () => {
            mockRepository.findOneBy.mockResolvedValue(null);

            const result = await student.getStudentById(999)
            expect(result).toBeNull()
        })
    })
    describe('updateStudent', () => {
        it('should update a student successfully.', async () => {
            const updateData = { name: 'some name updated' };
            const existingStudent: Partial<Student> = { id: mockId, ...mockStudentData }
            const updatedStudent: Partial<Student> = { ...existingStudent, ...updateData };

            mockRepository.findOneBy.mockResolvedValue(existingStudent as Student);
            mockRepository.save.mockResolvedValue(updatedStudent as Student);

            const result = await student.updateStudent(mockId, updateData);

            expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: mockId })
            expect(mockRepository.save).toHaveBeenCalled();
            expect(result).toEqual(updatedStudent)
        })

        it('should throw an error when a student is not found.', async () => {
            mockRepository.findOneBy.mockRejectedValue(null)

            await expect(student.updateStudent(mockId, { name: 'any name' }))
                .rejects
                .toThrow(`Could not update student with id ${mockId}`)
        })
    })
    describe('removeStudent', () => {
        it('should remove a student successfully.', async () => {
            const deleteResult: DeleteResult = { affected: 1, raw: {} }
            mockRepository.delete.mockResolvedValue(deleteResult);

            await student.removeStudent(mockId);
            expect(mockRepository.delete).toHaveBeenCalledWith(mockId)
        })

        it('should throw an error when failing to remove a student.', async () => {

            mockRepository.delete.mockRejectedValue(new Error('Database error'));

            await expect(student.removeStudent(mockId))
                .rejects
                .toThrow(`Could not remove student with id ${mockId}`);
        });
    })

    describe('studentExistsByEmail', () => {
        it('should return a student if exists by email.', async () => {
            mockRepository.findOne.mockResolvedValue(mockStudentData as Student);

            const result = await student.studentExistsByEmail(mockStudentData.email);

            expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { email: mockStudentData.email } });
            expect(result).toEqual(mockStudentData);
        });

        it('should return null if does not exist by email.', async () => {
            mockRepository.findOne.mockResolvedValue(null);

            const result = await student.studentExistsByEmail(mockStudentData.email);

            expect(result).toBeNull();
        });

        it('should throw an error when failing to check for a student by email.', async () => {
            mockRepository.findOne.mockRejectedValue(new Error('Database error'));

            await expect(student.studentExistsByEmail(mockStudentData.email))
                .rejects
                .toThrow('Could not check for student by email');
        });
    });

    describe('studentExistsById', () => {
        it('should return a student if exists by id.', async () => {
            const mockId = 4;
            const mockStudentData = { id: mockId, name: 'Test Student' };
            mockRepository.findOneBy.mockResolvedValue(mockStudentData as Student);

            const result = await student.studentExistsById(mockId);

            expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: mockId });
            expect(result).toEqual(mockStudentData);
        });

        it('should return null if does not exist by id.', async () => {
            const mockId = 4;
            mockRepository.findOneBy.mockResolvedValue(null);

            const result = await student.studentExistsById(mockId);

            expect(result).toBeNull();
        });

        it('should throw an error when failing to check for a student by id.', async () => {
            const mockId = 4;
            mockRepository.findOneBy.mockRejectedValue(new Error('Database error'));

            await expect(student.studentExistsById(mockId)).rejects.toThrow('Could not check for student by id');
        });
    });

    describe('studentExistsByRA', () => {
        it('should return a student if exists by RA.', async () => {
            mockRepository.findOne.mockResolvedValue(mockStudentData as Student);

            const result = await student.studentExistsByRA(mockStudentData.ra);

            expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { ra: mockStudentData.ra } });
            expect(result).toEqual(mockStudentData);
        });

        it('should return null if does not exist by RA.', async () => {
            mockRepository.findOne.mockResolvedValue(null);

            const result = await student.studentExistsByRA(mockStudentData.ra);

            expect(result).toBeNull();
        });

        it('should throw an error when failing to check for a student by RA.', async () => {
            mockRepository.findOne.mockRejectedValue(new Error('Database error'));

            await expect(student.studentExistsByRA(mockStudentData.ra))
                .rejects
                .toThrow('Could not check for student by ra');
        });
    });

    describe('studentExistsByCpf', () => {
        it('should return a student if exists by CPF.', async () => {
            mockRepository.findOne.mockResolvedValue(mockStudentData as Student);

            const result = await student.studentExistsByCpf(mockStudentData.cpf);

            expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { cpf: mockStudentData.cpf } });
            expect(result).toEqual(mockStudentData);
        });

        it('should return null if does not exist by CPF.', async () => {
            mockRepository.findOne.mockResolvedValue(null);

            const result = await student.studentExistsByCpf(mockStudentData.cpf);

            expect(result).toBeNull();
        });

        it('should throw an error when failing to check for a student by CPF.', async () => {
            mockRepository.findOne.mockRejectedValue(new Error('Database error'));

            await expect(student.studentExistsByCpf(mockStudentData.cpf))
                .rejects
                .toThrow('Could not check for student by CPF');
        });
    });
})




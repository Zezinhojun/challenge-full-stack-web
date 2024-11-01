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
    let mockRepository: jest.Mocked<Pick<Repository<Student>, 'create' | 'save' | 'find' | 'findOneBy' | 'delete'>>;

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
            findOneBy: jest.fn(),
            delete: jest.fn(),
        }

        jest.spyOn(AppDataSource, 'getRepository').mockReturnValue(mockRepository as unknown as Repository<Student>);
        student = new Student()
    })

    describe('addStudent', () => {
        it('deve criar e salvar um novo estudante com sucesso', async () => {

            const studentEntity = new Student();
            Object.assign(studentEntity, { ...mockStudentData, id: mockId });

            mockRepository.create.mockReturnValue(studentEntity);
            mockRepository.save.mockResolvedValue(studentEntity);

            const result = await student.addStudent(mockStudentData);
            expect(mockRepository.create).toHaveBeenCalledWith(mockStudentData);
            expect(mockRepository.save).toHaveBeenCalledWith(studentEntity);
            expect(result).toEqual({ id: mockId, ...mockStudentData })
        })

        it('deve lançar erro quando falhar ao adicionar estudante', async () => {
            mockRepository.save.mockRejectedValue(new Error('Database error'));

            await expect(student.addStudent(mockStudentData))
                .rejects
                .toThrow('Could not add student')
        })
    })

    describe('getAllStudents', () => {
        it('deve retornar lista de estudantes com sucess', async () => {
            const mockStudents: Student[] = [
                { id: 1, ...mockStudentData },
                { id: 2, ...mockStudentData, email: 'maria@example.com' }
            ] as Student[];

            mockRepository.find.mockResolvedValue(mockStudents)

            const result = await student.getAllStudents()

            expect(mockRepository.find).toHaveBeenCalled()
            expect(result).toEqual(mockStudents)
        })

        it('deve lançar erro quando falhar ao buscar estudantes', async () => {
            mockRepository.find.mockRejectedValue(new Error('Database error'));

            await expect(student.getAllStudents())
                .rejects
                .toThrow('Could not fetch students')
        })
    })

    describe('getStudentById', () => {
        it('deve retornar um estudante específico com sucesso', async () => {
            const mockStudent: Partial<Student> = { id: mockId, ...mockStudentData }
            mockRepository.findOneBy.mockResolvedValue(mockStudent as Student)

            const result = await student.getStudentById(mockId);

            expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: mockId })
            expect(result).toEqual(mockStudent)
        })

        it('deve lancar erro quando falhar ao buscar estudate por id', async () => {
            mockRepository.findOneBy.mockResolvedValue(null);

            const result = await student.getStudentById(999)
            expect(result).toBeNull()
        })
    })
    describe('updateStudent', () => {
        it('deve atualizar um estudante com sucess', async () => {
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

        it('deve lançar erro quando estudante não for encontrado', async () => {
            mockRepository.findOneBy.mockRejectedValue(null)

            await expect(student.updateStudent(mockId, { name: 'any name' }))
                .rejects
                .toThrow(`Could not update student with id ${mockId}`)
        })
    })
    describe('removeStudent', () => {
        it('deve remover um estudante com sucess', async () => {
            const deleteResult: DeleteResult = { affected: 1, raw: {} }
            mockRepository.delete.mockResolvedValue(deleteResult);

            await student.removeStudent(mockId);
            expect(mockRepository.delete).toHaveBeenCalledWith(mockId)
        })

        it('deve lançar erro quando falhar ao remover estudante', async () => {

            mockRepository.delete.mockRejectedValue(new Error('Database error'));

            await expect(student.removeStudent(mockId))
                .rejects
                .toThrow(`Could not remove student with id ${mockId}`);
        });
    })


})




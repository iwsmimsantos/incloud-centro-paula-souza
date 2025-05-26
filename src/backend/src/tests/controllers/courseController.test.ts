// src/controllers/courseController.test.ts
import { Request, Response } from 'express';
import axios from 'axios';
import * as courseController from '../../controllers/courseController';

// Mock do axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('CourseController', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let responseJson: jest.Mock;
  let responseStatus: jest.Mock;

  beforeEach(() => {
    responseJson = jest.fn().mockReturnThis();
    responseStatus = jest.fn().mockReturnValue({ json: responseJson });
    
    mockRequest = {};
    mockResponse = {
      json: responseJson,
      status: responseStatus,
    };

    jest.clearAllMocks();
  });

  describe('getAllCourses', () => {
    it('deve retornar todos os cursos com status 200', async () => {
      const mockCourses = [
        { id: 1, name: 'Curso 1' },
        { id: 2, name: 'Curso 2' }
      ];
      
      mockedAxios.get.mockResolvedValue({ data: mockCourses });

      await courseController.getAllCourses(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://two025-1a-t13-es05-api2.onrender.com/courses',
        { headers: { 'Authorization': 'Bearer g3-d72f4d0e90fce94208a9cc383c7e10ae7b' } }
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(responseJson).toHaveBeenCalledWith(mockCourses);
    });

    it('deve retornar status 500 quando ocorrer um erro', async () => {
      const errorMessage = 'Network Error';
      mockedAxios.get.mockRejectedValue(new Error(errorMessage));

      await courseController.getAllCourses(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(responseJson).toHaveBeenCalledWith({ 
        message: 'Erro ao buscar cursos', 
        error: errorMessage 
      });
    });
  });

  describe('getCourseById', () => {
    it('deve retornar um curso por ID com status 200', async () => {
      const mockCourse = { id: 1, name: 'Curso 1' };
      mockRequest.params = { id: '1' };
      
      mockedAxios.get.mockResolvedValue({ data: mockCourse });

      await courseController.getCourseById(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://two025-1a-t13-es05-api2.onrender.com/courses/1',
        { headers: { 'Authorization': 'Bearer g3-d72f4d0e90fce94208a9cc383c7e10ae7b' } }
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(responseJson).toHaveBeenCalledWith(mockCourse);
    });

    it('deve retornar status 404 quando o curso não for encontrado', async () => {
      mockRequest.params = { id: '999' };
      
      mockedAxios.get.mockResolvedValue({ data: null });

      await courseController.getCourseById(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(responseJson).toHaveBeenCalledWith({ message: 'Curso não encontrado' });
    });

    it('deve retornar status 500 quando ocorrer um erro', async () => {
      mockRequest.params = { id: '1' };
      const errorMessage = 'Network Error';
      
      mockedAxios.get.mockRejectedValue(new Error(errorMessage));

      await courseController.getCourseById(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(responseJson).toHaveBeenCalledWith({ 
        message: 'Erro ao buscar curso', 
        error: errorMessage 
      });
    });
  });

  describe('getCourseStudents', () => {
    it('deve retornar alunos de um curso com status 200', async () => {
      const mockStudents = [
        { id: 1, name: 'Aluno 1' },
        { id: 2, name: 'Aluno 2' }
      ];
      mockRequest.params = { id: '1' };
      
      mockedAxios.get.mockResolvedValue({ data: mockStudents });

      await courseController.getCourseStudents(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://two025-1a-t13-es05-api2.onrender.com/courses/1/students',
        { headers: { 'Authorization': 'Bearer g3-d72f4d0e90fce94208a9cc383c7e10ae7b' } }
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(responseJson).toHaveBeenCalledWith(mockStudents);
    });

    it('deve retornar status 500 quando ocorrer um erro', async () => {
      mockRequest.params = { id: '1' };
      const errorMessage = 'Network Error';
      
      mockedAxios.get.mockRejectedValue(new Error(errorMessage));

      await courseController.getCourseStudents(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(responseJson).toHaveBeenCalledWith({ 
        message: 'Erro ao buscar alunos do curso', 
        error: errorMessage 
      });
    });
  });
});

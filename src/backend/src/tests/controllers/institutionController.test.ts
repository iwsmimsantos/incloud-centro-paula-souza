// src/controllers/institutionController.test.ts
import { Request, Response } from 'express';
import axios from 'axios';
import * as institutionController from '../../controllers/institutionController';

// Mock do axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('InstitutionController', () => {
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

  describe('getAllInstitutions', () => {
    it('deve retornar todas as instituições com status 200', async () => {
      const mockInstitutions = [
        { id: 1, name: 'Instituição 1' },
        { id: 2, name: 'Instituição 2' }
      ];
      
      mockedAxios.get.mockResolvedValue({ data: mockInstitutions });

      await institutionController.getAllInstitutions(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://two025-1a-t13-es05-api2.onrender.com/institutions',
        { headers: { 'Authorization': 'Bearer g3-d72f4d0e90fce94208a9cc383c7e10ae7b' } }
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(responseJson).toHaveBeenCalledWith(mockInstitutions);
    });

    it('deve retornar status 500 quando ocorrer um erro', async () => {
      const errorMessage = 'Network Error';
      mockedAxios.get.mockRejectedValue(new Error(errorMessage));

      await institutionController.getAllInstitutions(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(responseJson).toHaveBeenCalledWith({ 
        message: 'Erro ao buscar instituições', 
        error: errorMessage 
      });
    });
  });

  describe('getInstitutionById', () => {
    it('deve retornar uma instituição por ID com status 200', async () => {
      const mockInstitution = { id: 1, name: 'Instituição 1' };
      mockRequest.params = { id: '1' };
      
      mockedAxios.get.mockResolvedValue({ data: mockInstitution });

      await institutionController.getInstitutionById(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://two025-1a-t13-es05-api2.onrender.com/institutions/1',
        { headers: { 'Authorization': 'Bearer g3-d72f4d0e90fce94208a9cc383c7e10ae7b' } }
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(responseJson).toHaveBeenCalledWith(mockInstitution);
    });

    it('deve retornar status 404 quando a instituição não for encontrada', async () => {
      mockRequest.params = { id: '999' };
      
      mockedAxios.get.mockResolvedValue({ data: null });

      await institutionController.getInstitutionById(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(responseJson).toHaveBeenCalledWith({ message: 'Instituição não encontrada' });
    });

    it('deve retornar status 500 quando ocorrer um erro', async () => {
      mockRequest.params = { id: '1' };
      const errorMessage = 'Network Error';
      
      mockedAxios.get.mockRejectedValue(new Error(errorMessage));

      await institutionController.getInstitutionById(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(responseJson).toHaveBeenCalledWith({ 
        message: 'Erro ao buscar instituição', 
        error: errorMessage 
      });
    });
  });

  describe('getInstitutionStudents', () => {
    it('deve retornar alunos de uma instituição com status 200', async () => {
      const mockStudents = [
        { id: 1, name: 'Aluno 1' },
        { id: 2, name: 'Aluno 2' }
      ];
      mockRequest.params = { id: '1' };
      
      mockedAxios.get.mockResolvedValue({ data: mockStudents });

      await institutionController.getInstitutionStudents(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://two025-1a-t13-es05-api2.onrender.com/institutions/1/students',
        { headers: { 'Authorization': 'Bearer g3-d72f4d0e90fce94208a9cc383c7e10ae7b' } }
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(responseJson).toHaveBeenCalledWith(mockStudents);
    });

    it('deve retornar status 500 quando ocorrer um erro', async () => {
      mockRequest.params = { id: '1' };
      const errorMessage = 'Network Error';
      
      mockedAxios.get.mockRejectedValue(new Error(errorMessage));

      await institutionController.getInstitutionStudents(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(responseJson).toHaveBeenCalledWith({ 
        message: 'Erro ao buscar alunos da instituição', 
        error: errorMessage 
      });
    });
  });
});

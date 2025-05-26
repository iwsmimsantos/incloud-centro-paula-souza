// src/controllers/statsController.test.ts
import { Request, Response } from 'express';
import axios from 'axios';
import * as statsController from '../../controllers/statsController';

// Mock do axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('StatsController', () => {
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

  describe('getStats', () => {
    it('deve retornar estatísticas com status 200', async () => {
      const mockStats = {
        totalStudents: 150,
        totalInstitutions: 5,
        totalCourses: 20,
        studentsPerInstitution: [
          { institution: "Instituição A", count: 50 },
          { institution: "Instituição B", count: 100 }
        ],
        studentsPerCourse: [
          { course: "Curso X", count: 75 },
          { course: "Curso Y", count: 75 }
        ]
      };
      
      mockedAxios.get.mockResolvedValue({ data: mockStats });

      await statsController.getStats(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://two025-1a-t13-es05-api2.onrender.com/stats',
        { headers: { 'Authorization': 'Bearer g3-d72f4d0e90fce94208a9cc383c7e10ae7b' } }
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(responseJson).toHaveBeenCalledWith(mockStats);
    });

    it('deve retornar status 500 quando ocorrer um erro', async () => {
      const errorMessage = 'Network Error';
      mockedAxios.get.mockRejectedValue(new Error(errorMessage));

      await statsController.getStats(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(responseJson).toHaveBeenCalledWith({ 
        message: 'Erro ao obter estatísticas', 
        error: errorMessage 
      });
    });
  });
});

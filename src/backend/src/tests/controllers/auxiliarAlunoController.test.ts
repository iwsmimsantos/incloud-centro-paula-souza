// auxiliarAlunoController.test.ts
import { Request, Response } from 'express';
import * as auxiliarAlunoController from '../../controllers/auxiliarAlunoController';
import AuxiliarAluno from '../../models/AuxiliarAluno';

// Mock do modelo AuxiliarAluno
jest.mock('../../models/AuxiliarAluno', () => ({
  findAll: jest.fn(),
  findById: jest.fn(),
  findByAlunoId: jest.fn(),
  findByAuxiliarId: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
  deleteByAlunoAndAuxiliar: jest.fn(),
}));

describe('AuxiliarAlunoController', () => {
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

  describe('getAuxiliaresAlunos', () => {
    it('deve retornar todos os auxiliares e alunos com status 200', async () => {
      const mockAuxiliaresAlunos = [
        { id: 1, id_aluno: 1, id_auxiliar: 1 },
        { id: 2, id_aluno: 2, id_auxiliar: 1 }
      ];
      
      (AuxiliarAluno.findAll as jest.Mock).mockResolvedValue(mockAuxiliaresAlunos);

      await auxiliarAlunoController.getAuxiliaresAlunos(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(AuxiliarAluno.findAll).toHaveBeenCalled();
      expect(mockResponse.json).toHaveBeenCalledWith(mockAuxiliaresAlunos);
    });

    it('deve retornar status 500 quando ocorrer um erro', async () => {
      const errorMessage = 'Erro ao buscar';
      (AuxiliarAluno.findAll as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await auxiliarAlunoController.getAuxiliaresAlunos(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(responseJson).toHaveBeenCalledWith({ message: 'Erro ao buscar auxiliares e alunos' });
    });
  });

  describe('getAuxiliarAlunoById', () => {
    it('deve retornar um auxiliar aluno por ID com status 200', async () => {
      const mockAuxiliarAluno = [{ id: 1, id_aluno: 1, id_auxiliar: 1 }];
      mockRequest.params = { id: '1' };
      
      (AuxiliarAluno.findById as jest.Mock).mockResolvedValue(mockAuxiliarAluno);

      await auxiliarAlunoController.getAuxiliarAlunoById(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(AuxiliarAluno.findById).toHaveBeenCalledWith(1);
      expect(mockResponse.json).toHaveBeenCalledWith(mockAuxiliarAluno[0]);
    });

    it('deve retornar status 404 quando a associação não for encontrada', async () => {
      mockRequest.params = { id: '999' };
      
      (AuxiliarAluno.findById as jest.Mock).mockResolvedValue([]);

      await auxiliarAlunoController.getAuxiliarAlunoById(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(responseJson).toHaveBeenCalledWith({ message: 'Associação não encontrada' });
    });

    it('deve retornar status 500 quando ocorrer um erro', async () => {
      mockRequest.params = { id: '1' };
      
      (AuxiliarAluno.findById as jest.Mock).mockRejectedValue(new Error('Erro ao buscar'));

      await auxiliarAlunoController.getAuxiliarAlunoById(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(responseJson).toHaveBeenCalledWith({ message: 'Erro ao buscar associação' });
    });
  });

  describe('getAuxiliaresByAlunoId', () => {
    it('deve retornar auxiliares por ID do aluno com status 200', async () => {
      const mockAuxiliares = [
        { id: 1, nome: 'Auxiliar 1' },
        { id: 2, nome: 'Auxiliar 2' }
      ];
      mockRequest.params = { id_aluno: '1' };
      
      (AuxiliarAluno.findByAlunoId as jest.Mock).mockResolvedValue(mockAuxiliares);

      await auxiliarAlunoController.getAuxiliaresByAlunoId(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(AuxiliarAluno.findByAlunoId).toHaveBeenCalledWith(1);
      expect(mockResponse.json).toHaveBeenCalledWith(mockAuxiliares);
    });

    it('deve retornar status 500 quando ocorrer um erro', async () => {
      mockRequest.params = { id_aluno: '1' };
      
      (AuxiliarAluno.findByAlunoId as jest.Mock).mockRejectedValue(new Error('Erro ao buscar'));

      await auxiliarAlunoController.getAuxiliaresByAlunoId(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(responseJson).toHaveBeenCalledWith({ message: 'Erro ao buscar auxiliares do aluno' });
    });
  });

  describe('getAlunosByAuxiliarId', () => {
    it('deve retornar alunos por ID do auxiliar com status 200', async () => {
      const mockAlunos = [
        { id: 1, nome: 'Aluno 1' },
        { id: 2, nome: 'Aluno 2' }
      ];
      mockRequest.params = { id_auxiliar: '1' };
      
      (AuxiliarAluno.findByAuxiliarId as jest.Mock).mockResolvedValue(mockAlunos);

      await auxiliarAlunoController.getAlunosByAuxiliarId(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(AuxiliarAluno.findByAuxiliarId).toHaveBeenCalledWith(1);
      expect(mockResponse.json).toHaveBeenCalledWith(mockAlunos);
    });

    it('deve retornar status 500 quando ocorrer um erro', async () => {
      mockRequest.params = { id_auxiliar: '1' };
      
      (AuxiliarAluno.findByAuxiliarId as jest.Mock).mockRejectedValue(new Error('Erro ao buscar'));

      await auxiliarAlunoController.getAlunosByAuxiliarId(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(responseJson).toHaveBeenCalledWith({ message: 'Erro ao buscar alunos do auxiliar' });
    });
  });

  describe('createAuxiliarAluno', () => {
    it('deve criar uma associação com status 201', async () => {
      mockRequest.body = { id_aluno: 1, id_auxiliar: 2 };
      
      (AuxiliarAluno.create as jest.Mock).mockResolvedValue({ affectedRows: 1 });

      await auxiliarAlunoController.createAuxiliarAluno(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(AuxiliarAluno.create).toHaveBeenCalledWith(1, 2);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(responseJson).toHaveBeenCalledWith({ message: 'Associação criada com sucesso' });
    });

    it('deve retornar status 400 quando a criação falhar', async () => {
      mockRequest.body = { id_aluno: 1, id_auxiliar: 2 };
      
      (AuxiliarAluno.create as jest.Mock).mockResolvedValue({ affectedRows: 0 });

      await auxiliarAlunoController.createAuxiliarAluno(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(responseJson).toHaveBeenCalledWith({ message: 'Erro ao criar associação' });
    });

    it('deve retornar status 500 quando ocorrer um erro', async () => {
      mockRequest.body = { id_aluno: 1, id_auxiliar: 2 };
      
      (AuxiliarAluno.create as jest.Mock).mockRejectedValue(new Error('Erro ao criar'));

      await auxiliarAlunoController.createAuxiliarAluno(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(responseJson).toHaveBeenCalledWith({ message: 'Erro ao criar associação' });
    });
  });

  describe('deleteAuxiliarAluno', () => {
    it('deve deletar uma associação com status 200', async () => {
      mockRequest.params = { id: '1' };
      
      (AuxiliarAluno.delete as jest.Mock).mockResolvedValue({ affectedRows: 1 });

      await auxiliarAlunoController.deleteAuxiliarAluno(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(AuxiliarAluno.delete).toHaveBeenCalledWith(1);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Associação removida com sucesso' });
    });

    it('deve retornar status 404 quando a associação não for encontrada', async () => {
      mockRequest.params = { id: '999' };
      
      (AuxiliarAluno.delete as jest.Mock).mockResolvedValue({ affectedRows: 0 });

      await auxiliarAlunoController.deleteAuxiliarAluno(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(responseJson).toHaveBeenCalledWith({ message: 'Associação não encontrada' });
    });

    it('deve retornar status 500 quando ocorrer um erro', async () => {
      mockRequest.params = { id: '1' };
      
      (AuxiliarAluno.delete as jest.Mock).mockRejectedValue(new Error('Erro ao deletar'));

      await auxiliarAlunoController.deleteAuxiliarAluno(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(responseJson).toHaveBeenCalledWith({ message: 'Erro ao remover associação' });
    });
  });

  describe('deleteAuxiliarAlunoByAlunoAndAuxiliar', () => {
    it('deve deletar uma associação por IDs de aluno e auxiliar com status 200', async () => {
      mockRequest.body = { id_aluno: 1, id_auxiliar: 2 };
      
      (AuxiliarAluno.deleteByAlunoAndAuxiliar as jest.Mock).mockResolvedValue({ affectedRows: 1 });

      await auxiliarAlunoController.deleteAuxiliarAlunoByAlunoAndAuxiliar(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(AuxiliarAluno.deleteByAlunoAndAuxiliar).toHaveBeenCalledWith(1, 2);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Associação removida com sucesso' });
    });

    it('deve retornar status 404 quando a associação não for encontrada', async () => {
      mockRequest.body = { id_aluno: 1, id_auxiliar: 2 };
      
      (AuxiliarAluno.deleteByAlunoAndAuxiliar as jest.Mock).mockResolvedValue({ affectedRows: 0 });

      await auxiliarAlunoController.deleteAuxiliarAlunoByAlunoAndAuxiliar(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(responseJson).toHaveBeenCalledWith({ message: 'Associação não encontrada' });
    });

    it('deve retornar status 500 quando ocorrer um erro', async () => {
      mockRequest.body = { id_aluno: 1, id_auxiliar: 2 };
      
      (AuxiliarAluno.deleteByAlunoAndAuxiliar as jest.Mock).mockRejectedValue(new Error('Erro ao deletar'));

      await auxiliarAlunoController.deleteAuxiliarAlunoByAlunoAndAuxiliar(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(responseJson).toHaveBeenCalledWith({ message: 'Erro ao remover associação' });
    });
  });
});

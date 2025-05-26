// necessidadeEspecialAlunoController.test.ts
import { Request, Response } from 'express';
import * as necessidadeEspecialAlunoController from '../../controllers/necessidadeEspecialAlunoController';
import NecessidadeEspecialAluno from '../../models/NecessidadeEspecialAluno';

// Mock do modelo NecessidadeEspecialAluno
jest.mock('../../models/NecessidadeEspecialAluno', () => ({
  findAll: jest.fn(),
  findById: jest.fn(),
  findByAlunoId: jest.fn(),
  findByNecessidadeId: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
  deleteByAlunoAndNecessidade: jest.fn(),
}));

describe('NecessidadeEspecialAlunoController', () => {
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

  describe('getNecessidadesEspeciaisAlunos', () => {
    it('deve retornar todas as associações com status 200', async () => {
      const mockNecessidadesEspeciaisAlunos = [
        { id: 1, id_aluno: 1, id_necessidade: 1 },
        { id: 2, id_aluno: 2, id_necessidade: 3 }
      ];
      
      (NecessidadeEspecialAluno.findAll as jest.Mock).mockResolvedValue(mockNecessidadesEspeciaisAlunos);

      await necessidadeEspecialAlunoController.getNecessidadesEspeciaisAlunos(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(NecessidadeEspecialAluno.findAll).toHaveBeenCalled();
      expect(mockResponse.json).toHaveBeenCalledWith(mockNecessidadesEspeciaisAlunos);
    });

    it('deve retornar status 500 quando ocorrer um erro', async () => {
      const errorMessage = 'Erro ao buscar';
      (NecessidadeEspecialAluno.findAll as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await necessidadeEspecialAlunoController.getNecessidadesEspeciaisAlunos(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(responseJson).toHaveBeenCalledWith({ message: "Erro ao buscar necessidades especiais dos alunos" });
    });
  });

  describe('getNecessidadeEspecialAlunoById', () => {
    it('deve retornar uma associação por ID com status 200', async () => {
      const mockNecessidadeEspecialAluno = [{ id: 1, id_aluno: 1, id_necessidade: 1 }];
      mockRequest.params = { id: '1' };
      
      (NecessidadeEspecialAluno.findById as jest.Mock).mockResolvedValue(mockNecessidadeEspecialAluno);

      await necessidadeEspecialAlunoController.getNecessidadeEspecialAlunoById(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(NecessidadeEspecialAluno.findById).toHaveBeenCalledWith(1);
      expect(mockResponse.json).toHaveBeenCalledWith(mockNecessidadeEspecialAluno[0]);
    });

    it('deve retornar status 404 quando a associação não for encontrada', async () => {
      mockRequest.params = { id: '999' };
      
      (NecessidadeEspecialAluno.findById as jest.Mock).mockResolvedValue([]);

      await necessidadeEspecialAlunoController.getNecessidadeEspecialAlunoById(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(responseJson).toHaveBeenCalledWith({ message: "Associação não encontrada" });
    });

    it('deve retornar status 500 quando ocorrer um erro', async () => {
      mockRequest.params = { id: '1' };
      
      (NecessidadeEspecialAluno.findById as jest.Mock).mockRejectedValue(new Error('Erro ao buscar'));

      await necessidadeEspecialAlunoController.getNecessidadeEspecialAlunoById(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(responseJson).toHaveBeenCalledWith({ message: "Erro ao buscar associação" });
    });
  });

  describe('getNecessidadesByAlunoId', () => {
    it('deve retornar necessidades por ID do aluno com status 200', async () => {
      const mockNecessidades = [
        { id: 1, nome: 'Autismo' },
        { id: 3, nome: 'Deficiência Visual' }
      ];
      mockRequest.params = { id_aluno: '1' };
      
      (NecessidadeEspecialAluno.findByAlunoId as jest.Mock).mockResolvedValue(mockNecessidades);

      await necessidadeEspecialAlunoController.getNecessidadesByAlunoId(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(NecessidadeEspecialAluno.findByAlunoId).toHaveBeenCalledWith(1);
      expect(mockResponse.json).toHaveBeenCalledWith(mockNecessidades);
    });

    it('deve retornar status 500 quando ocorrer um erro', async () => {
      mockRequest.params = { id_aluno: '1' };
      
      (NecessidadeEspecialAluno.findByAlunoId as jest.Mock).mockRejectedValue(new Error('Erro ao buscar'));

      await necessidadeEspecialAlunoController.getNecessidadesByAlunoId(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(responseJson).toHaveBeenCalledWith({ message: "Erro ao buscar necessidades do aluno" });
    });
  });

  describe('getAlunosByNecessidadeId', () => {
    it('deve retornar alunos por ID da necessidade com status 200', async () => {
      const mockAlunos = [
        { id: 1, nome: 'João' },
        { id: 2, nome: 'Maria' }
      ];
      mockRequest.params = { id_necessidade: '1' };
      
      (NecessidadeEspecialAluno.findByNecessidadeId as jest.Mock).mockResolvedValue(mockAlunos);

      await necessidadeEspecialAlunoController.getAlunosByNecessidadeId(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(NecessidadeEspecialAluno.findByNecessidadeId).toHaveBeenCalledWith(1);
      expect(mockResponse.json).toHaveBeenCalledWith(mockAlunos);
    });

    it('deve retornar status 500 quando ocorrer um erro', async () => {
      mockRequest.params = { id_necessidade: '1' };
      
      (NecessidadeEspecialAluno.findByNecessidadeId as jest.Mock).mockRejectedValue(new Error('Erro ao buscar'));

      await necessidadeEspecialAlunoController.getAlunosByNecessidadeId(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(responseJson).toHaveBeenCalledWith({ message: "Erro ao buscar alunos com a necessidade especial" });
    });
  });

  describe('createNecessidadeEspecialAluno', () => {
    it('deve criar uma associação com status 201', async () => {
      mockRequest.body = { id_aluno: 1, id_necessidade: 2 };
      
      (NecessidadeEspecialAluno.create as jest.Mock).mockResolvedValue({ affectedRows: 1 });

      await necessidadeEspecialAlunoController.createNecessidadeEspecialAluno(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(NecessidadeEspecialAluno.create).toHaveBeenCalledWith(1, 2);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(responseJson).toHaveBeenCalledWith({ message: "Associação criada com sucesso" });
    });

    it('deve retornar status 400 quando a criação falhar', async () => {
      mockRequest.body = { id_aluno: 1, id_necessidade: 2 };
      
      (NecessidadeEspecialAluno.create as jest.Mock).mockResolvedValue({ affectedRows: 0 });

      await necessidadeEspecialAlunoController.createNecessidadeEspecialAluno(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(responseJson).toHaveBeenCalledWith({ message: "Erro ao criar associação" });
    });

    it('deve retornar status 500 quando ocorrer um erro', async () => {
      mockRequest.body = { id_aluno: 1, id_necessidade: 2 };
      
      (NecessidadeEspecialAluno.create as jest.Mock).mockRejectedValue(new Error('Erro ao criar'));

      await necessidadeEspecialAlunoController.createNecessidadeEspecialAluno(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(responseJson).toHaveBeenCalledWith({ message: "Erro ao criar associação" });
    });
  });

  describe('deleteNecessidadeEspecialAluno', () => {
    it('deve deletar uma associação com status 200', async () => {
      mockRequest.params = { id: '1' };
      
      (NecessidadeEspecialAluno.delete as jest.Mock).mockResolvedValue({ affectedRows: 1 });

      await necessidadeEspecialAlunoController.deleteNecessidadeEspecialAluno(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(NecessidadeEspecialAluno.delete).toHaveBeenCalledWith(1);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: "Associação removida com sucesso" });
    });

    it('deve retornar status 404 quando a associação não for encontrada', async () => {
      mockRequest.params = { id: '999' };
      
      (NecessidadeEspecialAluno.delete as jest.Mock).mockResolvedValue({ affectedRows: 0 });

      await necessidadeEspecialAlunoController.deleteNecessidadeEspecialAluno(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(responseJson).toHaveBeenCalledWith({ message: "Associação não encontrada" });
    });

    it('deve retornar status 500 quando ocorrer um erro', async () => {
      mockRequest.params = { id: '1' };
      
      (NecessidadeEspecialAluno.delete as jest.Mock).mockRejectedValue(new Error('Erro ao deletar'));

      await necessidadeEspecialAlunoController.deleteNecessidadeEspecialAluno(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(responseJson).toHaveBeenCalledWith({ message: "Erro ao remover associação" });
    });
  });

  describe('deleteNecessidadeEspecialAlunoByAlunoAndNecessidade', () => {
    it('deve deletar uma associação por IDs de aluno e necessidade com status 200', async () => {
      mockRequest.body = { id_aluno: 1, id_necessidade: 2 };
      
      (NecessidadeEspecialAluno.deleteByAlunoAndNecessidade as jest.Mock).mockResolvedValue({ affectedRows: 1 });

      await necessidadeEspecialAlunoController.deleteNecessidadeEspecialAlunoByAlunoAndNecessidade(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(NecessidadeEspecialAluno.deleteByAlunoAndNecessidade).toHaveBeenCalledWith(1, 2);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: "Associação removida com sucesso" });
    });

    it('deve retornar status 404 quando a associação não for encontrada', async () => {
      mockRequest.body = { id_aluno: 1, id_necessidade: 2 };
      
      (NecessidadeEspecialAluno.deleteByAlunoAndNecessidade as jest.Mock).mockResolvedValue({ affectedRows: 0 });

      await necessidadeEspecialAlunoController.deleteNecessidadeEspecialAlunoByAlunoAndNecessidade(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(responseJson).toHaveBeenCalledWith({ message: "Associação não encontrada" });
    });

    it('deve retornar status 500 quando ocorrer um erro', async () => {
      mockRequest.body = { id_aluno: 1, id_necessidade: 2 };
      
      (NecessidadeEspecialAluno.deleteByAlunoAndNecessidade as jest.Mock).mockRejectedValue(new Error('Erro ao deletar'));

      await necessidadeEspecialAlunoController.deleteNecessidadeEspecialAlunoByAlunoAndNecessidade(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(responseJson).toHaveBeenCalledWith({ message: "Erro ao remover associação" });
    });
  });
});

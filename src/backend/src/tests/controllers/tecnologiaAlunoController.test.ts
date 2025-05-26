// tecnologiaAlunoController.test.ts
import { Request, Response, NextFunction } from 'express';
import * as tecnologiaAlunoController from '../../controllers/tecnologiaAlunoController';
import TecnologiaAluno from '../../models/TecnologiaAluno';

// Mock do modelo TecnologiaAluno
jest.mock('../../models/TecnologiaAluno', () => ({
  findAll: jest.fn(),
  findById: jest.fn(),
  findByAlunoId: jest.fn(),
  findByTecnologiaId: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
  deleteByAlunoAndTecnologia: jest.fn(),
  update: jest.fn()
}));

describe('TecnologiaAlunoController', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: Partial<NextFunction>;
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
    mockNext = jest.fn();

    jest.clearAllMocks();
  });

  describe('getTecnologiasAlunos', () => {
    it('deve retornar todas as associações com status 200', async () => {
      const mockTecnologiasAlunos = [
        { id: 1, id_aluno: 1, id_tecnologia: 1 },
        { id: 2, id_aluno: 2, id_tecnologia: 3 }
      ];
      
      (TecnologiaAluno.findAll as jest.Mock).mockResolvedValue(mockTecnologiasAlunos);

      await tecnologiaAlunoController.getTecnologiasAlunos(
        mockRequest as Request,
        mockResponse as Response,
        mockNext as NextFunction
      );

      expect(TecnologiaAluno.findAll).toHaveBeenCalled();
      expect(mockResponse.json).toHaveBeenCalledWith(mockTecnologiasAlunos);
    });

    it('deve retornar status 500 quando ocorrer um erro', async () => {
      const errorMessage = 'Erro ao buscar';
      (TecnologiaAluno.findAll as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await tecnologiaAlunoController.getTecnologiasAlunos(
        mockRequest as Request,
        mockResponse as Response,
        mockNext as NextFunction
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(responseJson).toHaveBeenCalledWith({ message: "Internal Server Error" });
    });
  });

  describe('getTecnologiaAlunoById', () => {
    it('deve retornar uma associação por ID com status 200', async () => {
      const mockTecnologiaAluno = [{ id: 1, id_aluno: 1, id_tecnologia: 1 }];
      mockRequest.params = { id: '1' };
      
      (TecnologiaAluno.findById as jest.Mock).mockResolvedValue(mockTecnologiaAluno);

      await tecnologiaAlunoController.getTecnologiaAlunoById(
        mockRequest as Request,
        mockResponse as Response,
        mockNext as NextFunction
      );

      expect(TecnologiaAluno.findById).toHaveBeenCalledWith(1);
      expect(mockResponse.json).toHaveBeenCalledWith(mockTecnologiaAluno[0]);
    });

    it('deve retornar status 404 quando a associação não for encontrada', async () => {
      mockRequest.params = { id: '999' };
      
      (TecnologiaAluno.findById as jest.Mock).mockResolvedValue([]);

      await tecnologiaAlunoController.getTecnologiaAlunoById(
        mockRequest as Request,
        mockResponse as Response,
        mockNext as NextFunction
      );

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(responseJson).toHaveBeenCalledWith({ message: "Associação não encontrada" });
    });

    it('deve retornar status 500 quando ocorrer um erro', async () => {
      mockRequest.params = { id: '1' };
      
      (TecnologiaAluno.findById as jest.Mock).mockRejectedValue(new Error('Erro ao buscar'));

      await tecnologiaAlunoController.getTecnologiaAlunoById(
        mockRequest as Request,
        mockResponse as Response,
        mockNext as NextFunction
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(responseJson).toHaveBeenCalledWith({ message: "Internal Server Error" });
    });
  });

  describe('getTecnologiasByAlunoId', () => {
    it('deve retornar tecnologias por ID do aluno com status 200', async () => {
      const mockTecnologias = [
        { id: 1, nome: 'JavaScript' },
        { id: 3, nome: 'React' }
      ];
      mockRequest.params = { id_aluno: '1' };
      
      (TecnologiaAluno.findByAlunoId as jest.Mock).mockResolvedValue(mockTecnologias);

      await tecnologiaAlunoController.getTecnologiasByAlunoId(
        mockRequest as Request,
        mockResponse as Response,
        mockNext as NextFunction
      );

      expect(TecnologiaAluno.findByAlunoId).toHaveBeenCalledWith(1);
      expect(mockResponse.json).toHaveBeenCalledWith(mockTecnologias);
    });

    it('deve retornar status 500 quando ocorrer um erro', async () => {
      mockRequest.params = { id_aluno: '1' };
      
      (TecnologiaAluno.findByAlunoId as jest.Mock).mockRejectedValue(new Error('Erro ao buscar'));

      await tecnologiaAlunoController.getTecnologiasByAlunoId(
        mockRequest as Request,
        mockResponse as Response,
        mockNext as NextFunction
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(responseJson).toHaveBeenCalledWith({ message: "Internal Server Error" });
    });
  });

  describe('getAlunosByTecnologiaId', () => {
    it('deve retornar alunos por ID da tecnologia com status 200', async () => {
      const mockAlunos = [
        { id: 1, nome: 'João' },
        { id: 2, nome: 'Maria' }
      ];
      mockRequest.params = { id_tecnologia: '1' };
      
      (TecnologiaAluno.findByTecnologiaId as jest.Mock).mockResolvedValue(mockAlunos);

      await tecnologiaAlunoController.getAlunosByTecnologiaId(
        mockRequest as Request,
        mockResponse as Response,
        mockNext as NextFunction
      );

      expect(TecnologiaAluno.findByTecnologiaId).toHaveBeenCalledWith(1);
      expect(mockResponse.json).toHaveBeenCalledWith(mockAlunos);
    });

    it('deve retornar status 500 quando ocorrer um erro', async () => {
      mockRequest.params = { id_tecnologia: '1' };
      
      (TecnologiaAluno.findByTecnologiaId as jest.Mock).mockRejectedValue(new Error('Erro ao buscar'));

      await tecnologiaAlunoController.getAlunosByTecnologiaId(
        mockRequest as Request,
        mockResponse as Response,
        mockNext as NextFunction
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(responseJson).toHaveBeenCalledWith({ message: "Internal Server Error" });
    });
  });

  describe('createTecnologiaAluno', () => {
    it('deve criar uma associação com status 201', async () => {
      mockRequest.body = { id_aluno: 1, id_tecnologia: 2 };
      
      (TecnologiaAluno.create as jest.Mock).mockResolvedValue({ affectedRows: 1 });

      await tecnologiaAlunoController.createTecnologiaAluno(
        mockRequest as Request,
        mockResponse as Response,
        mockNext as NextFunction
      );

      expect(TecnologiaAluno.create).toHaveBeenCalledWith(1, 2);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(responseJson).toHaveBeenCalledWith({ message: "Associação criada com sucesso" });
    });

    it('deve retornar status 400 quando a criação falhar', async () => {
      mockRequest.body = { id_aluno: 1, id_tecnologia: 2 };
      
      (TecnologiaAluno.create as jest.Mock).mockResolvedValue({ affectedRows: 0 });

      await tecnologiaAlunoController.createTecnologiaAluno(
        mockRequest as Request,
        mockResponse as Response,
        mockNext as NextFunction
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(responseJson).toHaveBeenCalledWith({ message: "Erro ao criar associação" });
    });

    it('deve retornar status 500 quando ocorrer um erro', async () => {
      mockRequest.body = { id_aluno: 1, id_tecnologia: 2 };
      
      (TecnologiaAluno.create as jest.Mock).mockRejectedValue(new Error('Erro ao criar'));

      await tecnologiaAlunoController.createTecnologiaAluno(
        mockRequest as Request,
        mockResponse as Response,
        mockNext as NextFunction
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(responseJson).toHaveBeenCalledWith({ message: "Internal Server Error" });
    });
  });

  describe('deleteTecnologiaAluno', () => {
    it('deve deletar uma associação com status 200', async () => {
      mockRequest.params = { id: '1' };
      
      (TecnologiaAluno.delete as jest.Mock).mockResolvedValue({ affectedRows: 1 });

      await tecnologiaAlunoController.deleteTecnologiaAluno(
        mockRequest as Request,
        mockResponse as Response,
        mockNext as NextFunction
      );

      expect(TecnologiaAluno.delete).toHaveBeenCalledWith(1);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: "Associação removida com sucesso" });
    });

    it('deve retornar status 404 quando a associação não for encontrada', async () => {
      mockRequest.params = { id: '999' };
      
      (TecnologiaAluno.delete as jest.Mock).mockResolvedValue({ affectedRows: 0 });

      await tecnologiaAlunoController.deleteTecnologiaAluno(
        mockRequest as Request,
        mockResponse as Response,
        mockNext as NextFunction
      );

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(responseJson).toHaveBeenCalledWith({ message: "Associação não encontrada" });
    });

    it('deve retornar status 500 quando ocorrer um erro', async () => {
      mockRequest.params = { id: '1' };
      
      (TecnologiaAluno.delete as jest.Mock).mockRejectedValue(new Error('Erro ao deletar'));

      await tecnologiaAlunoController.deleteTecnologiaAluno(
        mockRequest as Request,
        mockResponse as Response,
        mockNext as NextFunction
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(responseJson).toHaveBeenCalledWith({ message: "Internal Server Error" });
    });
  });

  describe('deleteTecnologiaAlunoByAlunoAndTecnologia', () => {
    it('deve deletar uma associação por IDs de aluno e tecnologia com status 200', async () => {
      mockRequest.body = { id_aluno: 1, id_tecnologia: 2 };
      
      (TecnologiaAluno.deleteByAlunoAndTecnologia as jest.Mock).mockResolvedValue({ affectedRows: 1 });

      await tecnologiaAlunoController.deleteTecnologiaAlunoByAlunoAndTecnologia(
        mockRequest as Request,
        mockResponse as Response,
        mockNext as NextFunction
      );

      expect(TecnologiaAluno.deleteByAlunoAndTecnologia).toHaveBeenCalledWith(1, 2);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: "Associação removida com sucesso" });
    });

    it('deve retornar status 404 quando a associação não for encontrada', async () => {
      mockRequest.body = { id_aluno: 1, id_tecnologia: 2 };
      
      (TecnologiaAluno.deleteByAlunoAndTecnologia as jest.Mock).mockResolvedValue({ affectedRows: 0 });

      await tecnologiaAlunoController.deleteTecnologiaAlunoByAlunoAndTecnologia(
        mockRequest as Request,
        mockResponse as Response,
        mockNext as NextFunction
      );

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(responseJson).toHaveBeenCalledWith({ message: "Associação não encontrada" });
    });

    it('deve retornar status 500 quando ocorrer um erro', async () => {
      mockRequest.body = { id_aluno: 1, id_tecnologia: 2 };
      
      (TecnologiaAluno.deleteByAlunoAndTecnologia as jest.Mock).mockRejectedValue(new Error('Erro ao deletar'));

      await tecnologiaAlunoController.deleteTecnologiaAlunoByAlunoAndTecnologia(
        mockRequest as Request,
        mockResponse as Response,
        mockNext as NextFunction
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(responseJson).toHaveBeenCalledWith({ message: "Internal Server Error" });
    });
  });

  describe('updateTecnologiaAluno', () => {
    it('deve atualizar uma associação com status 200', async () => {
      mockRequest.params = { id: '1' };
      mockRequest.body = { id_aluno: 1, id_tecnologia: 2 };
      
      (TecnologiaAluno.update as jest.Mock).mockResolvedValue({ affectedRows: 1 });

      await tecnologiaAlunoController.updateTecnologiaAluno(
        mockRequest as Request,
        mockResponse as Response,
        mockNext as NextFunction
      );

      expect(TecnologiaAluno.update).toHaveBeenCalledWith(1, 1, 2);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Associação atualizada com sucesso',
        dadosAtualizados: { id: '1', id_aluno: 1, id_tecnologia: 2 }
      });
    });

    it('deve retornar status 404 quando a associação não for encontrada', async () => {
      mockRequest.params = { id: '999' };
      mockRequest.body = { id_aluno: 1, id_tecnologia: 2 };
      
      (TecnologiaAluno.update as jest.Mock).mockResolvedValue({ affectedRows: 0 });

      await tecnologiaAlunoController.updateTecnologiaAluno(
        mockRequest as Request,
        mockResponse as Response,
        mockNext as NextFunction
      );

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(responseJson).toHaveBeenCalledWith({ message: 'Associação não encontrada' });
    });

    it('deve retornar status 500 quando ocorrer um erro', async () => {
      mockRequest.params = { id: '1' };
      mockRequest.body = { id_aluno: 1, id_tecnologia: 2 };
      
      (TecnologiaAluno.update as jest.Mock).mockRejectedValue(new Error('Erro ao atualizar'));

      await tecnologiaAlunoController.updateTecnologiaAluno(
        mockRequest as Request,
        mockResponse as Response,
        mockNext as NextFunction
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(responseJson).toHaveBeenCalledWith({ message: 'Internal Server Error' });
    });
  });
});

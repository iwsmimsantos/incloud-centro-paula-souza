import AutenticacaoController from '../../controllers/autenticacaoController';
import Autenticacao from '../../models/Autenticacao';
import { Request, Response } from 'express';

jest.mock('../../models/Autenticacao', () => ({
  findAll: jest.fn(),
  findAllComRelacionamentos: jest.fn(),
  findById: jest.fn(),
  findByFuncionarioId: jest.fn(),
  findByAlunoId: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn()
}));

describe('AutenticacaoController', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let responseObject = {};

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockImplementation(result => {
        responseObject = result;
        return mockResponse;
      })
    };
    jest.clearAllMocks();
  });

  // Testes para o método create
  describe('create', () => {
    test('should return 201 with success message when valid data is provided', async () => {
      mockRequest.body = { id_funcionario: 1, nivel_acesso: 2 };
      (Autenticacao.create as jest.Mock).mockResolvedValue({ insertId: 1 });

      await AutenticacaoController.create(mockRequest as Request, mockResponse as Response);

      expect(Autenticacao.create).toHaveBeenCalledWith(1, 2);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(responseObject).toHaveProperty('message', 'Autenticação criada com sucesso.');
    });

    test('should return 400 when required data is missing', async () => {
      mockRequest.body = { id_funcionario: 1 }; // nivel_acesso missing
      
      await AutenticacaoController.create(mockRequest as Request, mockResponse as Response);

      expect(Autenticacao.create).not.toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(responseObject).toHaveProperty('message', 'Dados insuficientes.');
    });

    test('should return 500 when database operation fails', async () => {
      mockRequest.body = { id_funcionario: 1, nivel_acesso: 2 };
      (Autenticacao.create as jest.Mock).mockRejectedValue(new Error('Database error'));

      await AutenticacaoController.create(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(responseObject).toHaveProperty('message', 'Erro ao criar autenticação.');
    });
  });

  // Testes para o método findById
  describe('findById', () => {
    test('should return 200 with autenticacao data when found', async () => {
      mockRequest.params = { id_autenticacao: '1' };
      const mockAutenticacao = [{ id_autenticacao: 1, id_funcionario: 1, nivel_acesso: 2 }];
      (Autenticacao.findById as jest.Mock).mockResolvedValue(mockAutenticacao);

      await AutenticacaoController.findById(mockRequest as Request, mockResponse as Response);

      expect(Autenticacao.findById).toHaveBeenCalledWith(1);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(responseObject).toEqual(mockAutenticacao[0]);
    });

    test('should return 404 when autenticacao is not found', async () => {
      mockRequest.params = { id_autenticacao: '999' };
      (Autenticacao.findById as jest.Mock).mockResolvedValue([]);

      await AutenticacaoController.findById(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(responseObject).toHaveProperty('message', 'Autenticação não encontrada.');
    });

    test('should return 400 when id is not provided', async () => {
      mockRequest.params = {};

      await AutenticacaoController.findById(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(responseObject).toHaveProperty('message', 'ID da autenticação não fornecido.');
    });

    test('should return 500 when database operation fails', async () => {
      mockRequest.params = { id_autenticacao: '1' };
      (Autenticacao.findById as jest.Mock).mockRejectedValue(new Error('Database error'));

      await AutenticacaoController.findById(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(responseObject).toHaveProperty('message', 'Erro ao buscar autenticação.');
    });
  });

  // Testes para o método findByFuncionarioId
  describe('findByFuncionarioId', () => {
    test('should return 200 with autenticacoes when found', async () => {
      mockRequest.params = { id_funcionario: '1' };
      const mockAutenticacoes = [
        { id_autenticacao: 1, id_funcionario: 1, nivel_acesso: 2 },
        { id_autenticacao: 2, id_funcionario: 1, nivel_acesso: 3 }
      ];
      (Autenticacao.findByFuncionarioId as jest.Mock).mockResolvedValue(mockAutenticacoes);

      await AutenticacaoController.findByFuncionarioId(mockRequest as Request, mockResponse as Response);

      expect(Autenticacao.findByFuncionarioId).toHaveBeenCalledWith(1);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(responseObject).toEqual(mockAutenticacoes);
    });

    test('should return 404 when no autenticacoes are found', async () => {
      mockRequest.params = { id_funcionario: '999' };
      (Autenticacao.findByFuncionarioId as jest.Mock).mockResolvedValue([]);

      await AutenticacaoController.findByFuncionarioId(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(responseObject).toHaveProperty('message', 'Nenhuma autenticação encontrada para o funcionário.');
    });

    test('should return 400 when id_funcionario is not provided', async () => {
      mockRequest.params = {};

      await AutenticacaoController.findByFuncionarioId(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(responseObject).toHaveProperty('message', 'ID do funcionário não fornecido.');
    });

    test('should return 500 when database operation fails', async () => {
      mockRequest.params = { id_funcionario: '1' };
      (Autenticacao.findByFuncionarioId as jest.Mock).mockRejectedValue(new Error('Database error'));

      await AutenticacaoController.findByFuncionarioId(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(responseObject).toHaveProperty('message', 'Erro ao buscar autenticações do funcionário.');
    });
  });

  // Testes para o método findAll
  describe('findAll', () => {
    test('should return 200 with all autenticacoes', async () => {
      const mockAutenticacoes = [
        { id_autenticacao: 1, id_funcionario: 1, nivel_acesso: 2 },
        { id_autenticacao: 2, id_funcionario: 2, nivel_acesso: 1 }
      ];
      (Autenticacao.findAll as jest.Mock).mockResolvedValue(mockAutenticacoes);

      await AutenticacaoController.findAll(mockRequest as Request, mockResponse as Response);

      expect(Autenticacao.findAll).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(responseObject).toEqual(mockAutenticacoes);
    });

    test('should return 500 when database operation fails', async () => {
      (Autenticacao.findAll as jest.Mock).mockRejectedValue(new Error('Database error'));

      await AutenticacaoController.findAll(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(responseObject).toHaveProperty('message', 'Erro ao buscar todas as autenticações.');
    });
  });

  // Testes para o método update
  describe('update', () => {
    test('should return 200 when autenticacao is updated successfully', async () => {
      mockRequest.params = { id_autenticacao: '1' };
      mockRequest.body = { nivel_acesso: 3 };
      (Autenticacao.update as jest.Mock).mockResolvedValue({ affectedRows: 1 });

      await AutenticacaoController.update(mockRequest as Request, mockResponse as Response);

      expect(Autenticacao.update).toHaveBeenCalledWith(1, 3);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(responseObject).toHaveProperty('message', 'Autenticação atualizada com sucesso.');
    });

    test('should return 404 when autenticacao is not found', async () => {
      mockRequest.params = { id_autenticacao: '999' };
      mockRequest.body = { nivel_acesso: 3 };
      (Autenticacao.update as jest.Mock).mockResolvedValue({ affectedRows: 0 });

      await AutenticacaoController.update(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(responseObject).toHaveProperty('message', 'Autenticação não encontrada para atualização.');
    });

    test('should return 400 when required data is missing', async () => {
      mockRequest.params = { id_autenticacao: '1' };
      mockRequest.body = {}; // nivel_acesso missing

      await AutenticacaoController.update(mockRequest as Request, mockResponse as Response);

      expect(Autenticacao.update).not.toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(responseObject).toHaveProperty('message', 'Dados insuficientes para atualização.');
    });

    test('should return 500 when database operation fails', async () => {
      mockRequest.params = { id_autenticacao: '1' };
      mockRequest.body = { nivel_acesso: 3 };
      (Autenticacao.update as jest.Mock).mockRejectedValue(new Error('Database error'));

      await AutenticacaoController.update(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(responseObject).toHaveProperty('message', 'Erro ao atualizar autenticação.');
    });
  });

  // Testes para o método delete
  describe('delete', () => {
    test('should return 200 when autenticacao is deleted successfully', async () => {
      mockRequest.params = { id_autenticacao: '1' };
      (Autenticacao.delete as jest.Mock).mockResolvedValue({ affectedRows: 1 });

      await AutenticacaoController.delete(mockRequest as Request, mockResponse as Response);

      expect(Autenticacao.delete).toHaveBeenCalledWith(1);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(responseObject).toHaveProperty('message', 'Autenticação excluída com sucesso.');
    });

    test('should return 404 when autenticacao is not found', async () => {
      mockRequest.params = { id_autenticacao: '999' };
      (Autenticacao.delete as jest.Mock).mockResolvedValue({ affectedRows: 0 });

      await AutenticacaoController.delete(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(responseObject).toHaveProperty('message', 'Autenticação não encontrada para exclusão.');
    });

    test('should return 400 when id is not provided', async () => {
      mockRequest.params = {};

      await AutenticacaoController.delete(mockRequest as Request, mockResponse as Response);

      expect(Autenticacao.delete).not.toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(responseObject).toHaveProperty('message', 'ID da autenticação não fornecido.');
    });

    test('should return 500 when database operation fails', async () => {
      mockRequest.params = { id_autenticacao: '1' };
      (Autenticacao.delete as jest.Mock).mockRejectedValue(new Error('Database error'));

      await AutenticacaoController.delete(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(responseObject).toHaveProperty('message', 'Erro ao excluir autenticação.');
    });
  });
});

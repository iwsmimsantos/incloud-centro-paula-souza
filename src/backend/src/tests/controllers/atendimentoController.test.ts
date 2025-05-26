// tests/controllers/atendimentoController.test.ts
import { Request, Response } from 'express';
import * as atendimentoController from '../../controllers/atendimentoController';
import Atendimento from '../../models/Atendimento';

// Mock do modelo Atendimento
jest.mock('../../models/Atendimento', () => ({
  findAll: jest.fn(),
  findAllComRelacionamentos: jest.fn(),
  findById: jest.fn(),
  findByFuncionarioId: jest.fn(),
  findByAlunoId: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn()
}));

describe('Atendimento Controller', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let responseObject: any = {};

  beforeEach(() => {
    mockRequest = {};
    responseObject = {
      statusCode: 0,
      json: jest.fn().mockReturnThis()
    };
    mockResponse = {
      status: jest.fn().mockImplementation((code) => {
        responseObject.statusCode = code;
        return responseObject;
      }),
      json: responseObject.json
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAtendimentos', () => {
    it('deve retornar todos os atendimentos formatados com status 200', async () => {
      const mockAtendimentos = [
        { id_atendimento: 1, nome_aluno: 'João', nome_profissional: 'Dr. Silva' },
        { id_atendimento: 2, nome_aluno: 'Maria', nome_profissional: 'Dra. Santos' }
      ];
      
      (Atendimento.findAllComRelacionamentos as jest.Mock).mockResolvedValue(mockAtendimentos);
      
      await atendimentoController.getAtendimentos(mockRequest as Request, mockResponse as Response);
      
      expect(Atendimento.findAllComRelacionamentos).toHaveBeenCalled();
      
      // Verifica se a formatação está sendo aplicada corretamente
      const expectedFormatted = [
        { id_atendimento: 1, atendimento: 'Atendimento 0', nomeAluno: 'João', profissional: 'Dr. Silva' },
        { id_atendimento: 2, atendimento: 'Atendimento 1', nomeAluno: 'Maria', profissional: 'Dra. Santos' }
      ];
      
      expect(mockResponse.json).toHaveBeenCalledWith(expectedFormatted);
    });

    it('deve usar valores padrão quando nome_aluno ou nome_profissional for null', async () => {
      const mockAtendimentos = [
        { id_atendimento: 1, nome_aluno: null, nome_profissional: null }
      ];
      
      (Atendimento.findAllComRelacionamentos as jest.Mock).mockResolvedValue(mockAtendimentos);
      
      await atendimentoController.getAtendimentos(mockRequest as Request, mockResponse as Response);
      
      const expectedFormatted = [
        { id_atendimento: 1, atendimento: 'Atendimento 0', nomeAluno: 'Desconhecido', profissional: 'Desconhecido' }
      ];
      
      expect(mockResponse.json).toHaveBeenCalledWith(expectedFormatted);
    });

    it('deve retornar status 500 quando ocorrer um erro', async () => {
      (Atendimento.findAllComRelacionamentos as jest.Mock).mockRejectedValue(new Error('Erro de banco de dados'));
      
      await atendimentoController.getAtendimentos(mockRequest as Request, mockResponse as Response);
      
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Erro ao buscar atendimentos' });
    });
  });

  describe('getAtendimentoById', () => {
    it('deve retornar um atendimento quando encontrado', async () => {
      const mockAtendimento = [{ id_atendimento: 1, status_atendimento: 1, id_funcionario: 1, id_aluno: 1 }];
      mockRequest.params = { id: '1' };
      (Atendimento.findById as jest.Mock).mockResolvedValue(mockAtendimento);
      
      await atendimentoController.getAtendimentoById(mockRequest as Request, mockResponse as Response);
      
      expect(Atendimento.findById).toHaveBeenCalledWith(1);
      expect(mockResponse.json).toHaveBeenCalledWith(mockAtendimento[0]);
    });

    it('deve retornar status 404 quando atendimento não for encontrado', async () => {
      mockRequest.params = { id: '999' };
      (Atendimento.findById as jest.Mock).mockResolvedValue([]);
      
      await atendimentoController.getAtendimentoById(mockRequest as Request, mockResponse as Response);
      
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Atendimento não encontrado' });
    });

    it('deve retornar status 500 quando ocorrer um erro', async () => {
      mockRequest.params = { id: '1' };
      (Atendimento.findById as jest.Mock).mockRejectedValue(new Error('Erro de banco de dados'));
      
      await atendimentoController.getAtendimentoById(mockRequest as Request, mockResponse as Response);
      
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Erro ao buscar Atendimento' });
    });
  });

  describe('getAtendimentosByFuncionario', () => {
    it('deve retornar atendimentos de um funcionário', async () => {
      const mockAtendimentos = [
        { id_atendimento: 1, status_atendimento: 1, id_funcionario: 1, id_aluno: 1 },
        { id_atendimento: 3, status_atendimento: 2, id_funcionario: 1, id_aluno: 3 }
      ];
      mockRequest.params = { id_funcionario: '1' };
      (Atendimento.findByFuncionarioId as jest.Mock).mockResolvedValue(mockAtendimentos);
      
      await atendimentoController.getAtendimentosByFuncionario(mockRequest as Request, mockResponse as Response);
      
      expect(Atendimento.findByFuncionarioId).toHaveBeenCalledWith(1);
      expect(mockResponse.json).toHaveBeenCalledWith(mockAtendimentos);
    });

    it('deve retornar status 500 quando ocorrer um erro', async () => {
      mockRequest.params = { id_funcionario: '1' };
      (Atendimento.findByFuncionarioId as jest.Mock).mockRejectedValue(new Error('Erro de banco de dados'));
      
      await atendimentoController.getAtendimentosByFuncionario(mockRequest as Request, mockResponse as Response);
      
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Erro ao buscar atendimentos do funcionário' });
    });
  });

  describe('getAtendimentosByAluno', () => {
    it('deve retornar atendimentos de um aluno', async () => {
      const mockAtendimentos = [
        { id_atendimento: 1, status_atendimento: 1, id_funcionario: 1, id_aluno: 1 },
        { id_atendimento: 4, status_atendimento: 3, id_funcionario: 2, id_aluno: 1 }
      ];
      mockRequest.params = { id_aluno: '1' };
      (Atendimento.findByAlunoId as jest.Mock).mockResolvedValue(mockAtendimentos);
      
      await atendimentoController.getAtendimentosByAluno(mockRequest as Request, mockResponse as Response);
      
      expect(Atendimento.findByAlunoId).toHaveBeenCalledWith(1);
      expect(mockResponse.json).toHaveBeenCalledWith(mockAtendimentos);
    });

    it('deve retornar status 500 quando ocorrer um erro', async () => {
      mockRequest.params = { id_aluno: '1' };
      (Atendimento.findByAlunoId as jest.Mock).mockRejectedValue(new Error('Erro de banco de dados'));
      
      await atendimentoController.getAtendimentosByAluno(mockRequest as Request, mockResponse as Response);
      
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Erro ao buscar atendimentos do aluno' });
    });
  });

  describe('createAtendimento', () => {
    it('deve criar um novo atendimento com sucesso', async () => {
      const novoAtendimento = { 
        status_atendimento: 1,
        id_funcionario: 1,
        id_aluno: 2
      };
      mockRequest.body = novoAtendimento;
      
      const mockInsertResult = { insertId: 1 };
      const mockAtendimentoResult = [{ id_atendimento: 1, ...novoAtendimento }];
      
      (Atendimento.create as jest.Mock).mockResolvedValue(mockInsertResult);
      (Atendimento.findById as jest.Mock).mockResolvedValue(mockAtendimentoResult);
      
      await atendimentoController.createAtendimento(mockRequest as Request, mockResponse as Response);
      
      expect(Atendimento.create).toHaveBeenCalledWith(
        novoAtendimento.status_atendimento,
        novoAtendimento.id_funcionario,
        novoAtendimento.id_aluno
      );
      expect(Atendimento.findById).toHaveBeenCalledWith(1);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(mockAtendimentoResult[0]);
    });

    it('deve retornar status 400 quando falhar ao criar atendimento', async () => {
      mockRequest.body = { status_atendimento: 1 };
      (Atendimento.create as jest.Mock).mockResolvedValue({});
      
      await atendimentoController.createAtendimento(mockRequest as Request, mockResponse as Response);
      
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Erro ao criar Atendimento' });
    });

    it('deve retornar status 500 quando ocorrer um erro', async () => {
      mockRequest.body = { status_atendimento: 1 };
      (Atendimento.create as jest.Mock).mockRejectedValue(new Error('Erro de banco de dados'));
      
      await atendimentoController.createAtendimento(mockRequest as Request, mockResponse as Response);
      
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Erro ao criar Atendimento' });
    });
  });

  describe('updateAtendimento', () => {
    it('deve atualizar um atendimento existente', async () => {
      const atendimentoAtualizado = { 
        status_atendimento: 2,
        id_funcionario: 3,
        id_aluno: 1
      };
      mockRequest.params = { id: '1' };
      mockRequest.body = atendimentoAtualizado;
      
      const mockAtendimentoAntes = [{ id_atendimento: 1, status_atendimento: 1, id_funcionario: 1, id_aluno: 1 }];
      const mockAtendimentoDepois = [{ id_atendimento: 1, ...atendimentoAtualizado }];
      
      (Atendimento.findById as jest.Mock).mockResolvedValueOnce(mockAtendimentoAntes);
      (Atendimento.update as jest.Mock).mockResolvedValue({ affectedRows: 1 });
      (Atendimento.findById as jest.Mock).mockResolvedValueOnce(mockAtendimentoDepois);
      
      await atendimentoController.updateAtendimento(mockRequest as Request, mockResponse as Response);
      
      expect(Atendimento.findById).toHaveBeenCalledWith(1);
      expect(Atendimento.update).toHaveBeenCalledWith(
        1,
        atendimentoAtualizado.status_atendimento,
        atendimentoAtualizado.id_funcionario,
        atendimentoAtualizado.id_aluno
      );
      expect(mockResponse.json).toHaveBeenCalledWith(mockAtendimentoDepois[0]);
    });

    it('deve retornar status 404 quando atendimento não existir', async () => {
      mockRequest.params = { id: '999' };
      mockRequest.body = { status_atendimento: 2 };
      (Atendimento.findById as jest.Mock).mockResolvedValue([]);
      
      await atendimentoController.updateAtendimento(mockRequest as Request, mockResponse as Response);
      
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Atendimento não encontrado' });
    });

    it('deve retornar status 500 quando ocorrer um erro', async () => {
      mockRequest.params = { id: '1' };
      mockRequest.body = { status_atendimento: 2 };
      (Atendimento.findById as jest.Mock).mockRejectedValue(new Error('Erro de banco de dados'));
      
      await atendimentoController.updateAtendimento(mockRequest as Request, mockResponse as Response);
      
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Erro ao atualizar Atendimento' });
    });
  });

  describe('deleteAtendimento', () => {
    it('deve excluir um atendimento existente', async () => {
      mockRequest.params = { id: '1' };
      const mockAtendimento = [{ id_atendimento: 1, status_atendimento: 1, id_funcionario: 1, id_aluno: 1 }];
      
      (Atendimento.findById as jest.Mock).mockResolvedValue(mockAtendimento);
      (Atendimento.delete as jest.Mock).mockResolvedValue({ affectedRows: 1 });
      
      await atendimentoController.deleteAtendimento(mockRequest as Request, mockResponse as Response);
      
      expect(Atendimento.findById).toHaveBeenCalledWith(1);
      expect(Atendimento.delete).toHaveBeenCalledWith(1);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Atendimento removido com sucesso' });
    });

    it('deve retornar status 404 quando atendimento não existir', async () => {
      mockRequest.params = { id: '999' };
      (Atendimento.findById as jest.Mock).mockResolvedValue([]);
      
      await atendimentoController.deleteAtendimento(mockRequest as Request, mockResponse as Response);
      
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Atendimento não encontrado' });
    });

    it('deve retornar status 500 quando ocorrer um erro', async () => {
      mockRequest.params = { id: '1' };
      (Atendimento.findById as jest.Mock).mockRejectedValue(new Error('Erro de banco de dados'));
      
      await atendimentoController.deleteAtendimento(mockRequest as Request, mockResponse as Response);
      
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Erro ao remover Atendimento' });
    });
  });

  describe('atribuirProfissional', () => {
    it('deve atribuir um profissional a um atendimento existente', async () => {
      mockRequest.params = { id: '1' };
      mockRequest.body = { id_funcionario: 3 };
      
      const mockAtendimentoAntes = [{ id_atendimento: 1, status_atendimento: 1, id_funcionario: 1, id_aluno: 1 }];
      const mockAtendimentoDepois = [{ id_atendimento: 1, status_atendimento: 1, id_funcionario: 3, id_aluno: 1 }];
      
      (Atendimento.findById as jest.Mock).mockResolvedValueOnce(mockAtendimentoAntes);
      (Atendimento.update as jest.Mock).mockResolvedValue({ affectedRows: 1 });
      (Atendimento.findById as jest.Mock).mockResolvedValueOnce(mockAtendimentoDepois);
      
      await atendimentoController.atribuirProfissional(mockRequest as Request, mockResponse as Response);
      
      expect(Atendimento.findById).toHaveBeenCalledWith(1);
      expect(Atendimento.update).toHaveBeenCalledWith(
        1,
        mockAtendimentoAntes[0].status_atendimento,
        3,
        mockAtendimentoAntes[0].id_aluno
      );
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Profissional atribuído com sucesso',
        atendimento: mockAtendimentoDepois[0]
      });
    });

    it('deve retornar status 400 quando id_funcionario não for fornecido', async () => {
      mockRequest.params = { id: '1' };
      mockRequest.body = {};
      
      await atendimentoController.atribuirProfissional(mockRequest as Request, mockResponse as Response);
      
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'ID do funcionário é obrigatório' });
    });

    it('deve retornar status 404 quando atendimento não existir', async () => {
      mockRequest.params = { id: '999' };
      mockRequest.body = { id_funcionario: 3 };
      (Atendimento.findById as jest.Mock).mockResolvedValue([]);
      
      await atendimentoController.atribuirProfissional(mockRequest as Request, mockResponse as Response);
      
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Atendimento não encontrado' });
    });

    it('deve retornar status 500 quando ocorrer um erro', async () => {
      mockRequest.params = { id: '1' };
      mockRequest.body = { id_funcionario: 3 };
      (Atendimento.findById as jest.Mock).mockRejectedValue(new Error('Erro de banco de dados'));
      
      await atendimentoController.atribuirProfissional(mockRequest as Request, mockResponse as Response);
      
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Erro ao atribuir profissional ao atendimento' });
    });
  });
});
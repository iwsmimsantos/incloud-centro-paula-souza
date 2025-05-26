// tests/controllers/funcionarioController.test.ts
import { Request, Response } from 'express';
import * as funcionarioController from '../../controllers/funcionarioController';
import Funcionario from '../../models/Funcionario';

// Mock do modelo Funcionario
jest.mock('../../models/Funcionario', () => ({
  findAll: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn()
}));

describe('Funcionario Controller', () => {
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

  describe('getFuncionarios', () => {
    it('deve retornar todos os funcionários com status 200', async () => {
      const mockFuncionarios = [
        { id_funcionario: 1, nome: 'João Silva', cargo: 'Professor' },
        { id_funcionario: 2, nome: 'Maria Santos', cargo: 'Coordenadora' }
      ];
      (Funcionario.findAll as jest.Mock).mockResolvedValue(mockFuncionarios);
      
      await funcionarioController.getFuncionarios(mockRequest as Request, mockResponse as Response);
      
      expect(Funcionario.findAll).toHaveBeenCalled();
      expect(mockResponse.json).toHaveBeenCalledWith(mockFuncionarios);
    });

    it('deve retornar status 500 quando ocorrer um erro', async () => {
      (Funcionario.findAll as jest.Mock).mockRejectedValue(new Error('Erro de banco de dados'));
      
      await funcionarioController.getFuncionarios(mockRequest as Request, mockResponse as Response);
      
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Erro ao buscar Funcionarios' });
    });
  });

  describe('getFuncionarioById', () => {
    it('deve retornar um funcionário quando encontrado', async () => {
      const mockFuncionario = [{ id_funcionario: 1, nome: 'João Silva', cargo: 'Professor' }];
      mockRequest.params = { id: '1' };
      (Funcionario.findById as jest.Mock).mockResolvedValue(mockFuncionario);
      
      await funcionarioController.getFuncionarioById(mockRequest as Request, mockResponse as Response);
      
      expect(Funcionario.findById).toHaveBeenCalledWith(1);
      expect(mockResponse.json).toHaveBeenCalledWith(mockFuncionario[0]);
    });

    it('deve retornar status 404 quando funcionário não for encontrado', async () => {
      mockRequest.params = { id: '999' };
      (Funcionario.findById as jest.Mock).mockResolvedValue([]);
      
      await funcionarioController.getFuncionarioById(mockRequest as Request, mockResponse as Response);
      
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Funcionario não encontrado' });
    });

    it('deve retornar status 500 quando ocorrer um erro', async () => {
      mockRequest.params = { id: '1' };
      (Funcionario.findById as jest.Mock).mockRejectedValue(new Error('Erro de banco de dados'));
      
      await funcionarioController.getFuncionarioById(mockRequest as Request, mockResponse as Response);
      
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Erro ao buscar Funcionario' });
    });
  });

  describe('createFuncionario', () => {
    it('deve criar um novo funcionário com sucesso', async () => {
      const novoFuncionario = { 
        nome: 'João Silva',
        cargo: 'Professor',
        departamento: 'Educação',
        email: 'joao.silva@example.com',
        possui_deficiencia: false,
        configuracoes_acessibilidade: null
      };
      mockRequest.body = novoFuncionario;
      
      const mockInsertResult = { insertId: 1 };
      const mockFuncionarioResult = [{ id_funcionario: 1, ...novoFuncionario }];
      
      (Funcionario.create as jest.Mock).mockResolvedValue(mockInsertResult);
      (Funcionario.findById as jest.Mock).mockResolvedValue(mockFuncionarioResult);
      
      await funcionarioController.createFuncionario(mockRequest as Request, mockResponse as Response);
      
      expect(Funcionario.create).toHaveBeenCalledWith(
        novoFuncionario.nome,
        novoFuncionario.cargo,
        novoFuncionario.departamento,
        novoFuncionario.email,
        novoFuncionario.possui_deficiencia,
        novoFuncionario.configuracoes_acessibilidade
      );
      expect(Funcionario.findById).toHaveBeenCalledWith(1);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(mockFuncionarioResult[0]);
    });

    it('deve retornar status 400 quando falhar ao criar funcionário', async () => {
      mockRequest.body = { nome: 'João Silva' };
      (Funcionario.create as jest.Mock).mockResolvedValue({});
      
      await funcionarioController.createFuncionario(mockRequest as Request, mockResponse as Response);
      
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Erro ao criar Funcionario' });
    });

    it('deve retornar status 500 quando ocorrer um erro', async () => {
      mockRequest.body = { nome: 'João Silva' };
      (Funcionario.create as jest.Mock).mockRejectedValue(new Error('Erro de banco de dados'));
      
      await funcionarioController.createFuncionario(mockRequest as Request, mockResponse as Response);
      
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Erro ao criar Funcionario' });
    });
  });

  describe('updateFuncionario', () => {
    it('deve atualizar um funcionário existente', async () => {
      const funcionarioAtualizado = { 
        nome: 'João Silva Atualizado',
        cargo: 'Professor Titular',
        departamento: 'Educação',
        email: 'joao.silva.atualizado@example.com',
        possui_deficiencia: false,
        configuracoes_acessibilidade: null
      };
      mockRequest.params = { id: '1' };
      mockRequest.body = funcionarioAtualizado;
      
      const mockFuncionarioAntes = [{ id_funcionario: 1, nome: 'João Silva', cargo: 'Professor', departamento: 'Educação', email: 'joao.silva@example.com', possui_deficiencia: false, configuracoes_acessibilidade: null }];
      const mockFuncionarioDepois = [{ id_funcionario: 1, ...funcionarioAtualizado }];
      
      (Funcionario.findById as jest.Mock).mockResolvedValueOnce(mockFuncionarioAntes);
      (Funcionario.update as jest.Mock).mockResolvedValue({ affectedRows: 1 });
      (Funcionario.findById as jest.Mock).mockResolvedValueOnce(mockFuncionarioDepois);
      
      await funcionarioController.updateFuncionario(mockRequest as Request, mockResponse as Response);
      
      expect(Funcionario.findById).toHaveBeenCalledWith(1);
      expect(Funcionario.update).toHaveBeenCalledWith(
        1,
        funcionarioAtualizado.nome,
        funcionarioAtualizado.cargo,
        funcionarioAtualizado.departamento,
        funcionarioAtualizado.email,
        funcionarioAtualizado.possui_deficiencia,
        funcionarioAtualizado.configuracoes_acessibilidade
      );
      expect(mockResponse.json).toHaveBeenCalledWith(mockFuncionarioDepois[0]);
    });

    it('deve retornar status 404 quando funcionário não existir', async () => {
      mockRequest.params = { id: '999' };
      mockRequest.body = { nome: 'João Silva Atualizado' };
      (Funcionario.findById as jest.Mock).mockResolvedValue([]);
      
      await funcionarioController.updateFuncionario(mockRequest as Request, mockResponse as Response);
      
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Funcionario não encontrado' });
    });

    it('deve retornar status 500 quando ocorrer um erro', async () => {
      mockRequest.params = { id: '1' };
      mockRequest.body = { nome: 'João Silva Atualizado' };
      (Funcionario.findById as jest.Mock).mockRejectedValue(new Error('Erro de banco de dados'));
      
      await funcionarioController.updateFuncionario(mockRequest as Request, mockResponse as Response);
      
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Erro ao atualizar Funcionario' });
    });
  });

  describe('deleteFuncionario', () => {
    it('deve excluir um funcionário existente', async () => {
      mockRequest.params = { id: '1' };
      const mockFuncionario = [{ id_funcionario: 1, nome: 'João Silva', cargo: 'Professor' }];
      
      (Funcionario.findById as jest.Mock).mockResolvedValue(mockFuncionario);
      (Funcionario.delete as jest.Mock).mockResolvedValue({ affectedRows: 1 });
      
      await funcionarioController.deleteFuncionario(mockRequest as Request, mockResponse as Response);
      
      expect(Funcionario.findById).toHaveBeenCalledWith(1);
      expect(Funcionario.delete).toHaveBeenCalledWith(1);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Funcionario removido com sucesso' });
    });

    it('deve retornar status 404 quando funcionário não existir', async () => {
      mockRequest.params = { id: '999' };
      (Funcionario.findById as jest.Mock).mockResolvedValue([]);
      
      await funcionarioController.deleteFuncionario(mockRequest as Request, mockResponse as Response);
      
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Funcionario não encontrado' });
    });

    it('deve retornar status 500 quando ocorrer um erro', async () => {
      mockRequest.params = { id: '1' };
      (Funcionario.findById as jest.Mock).mockRejectedValue(new Error('Erro de banco de dados'));
      
      await funcionarioController.deleteFuncionario(mockRequest as Request, mockResponse as Response);
      
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Erro ao remover Funcionario' });
    });
  });
});

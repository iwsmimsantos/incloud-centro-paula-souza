// tests/controllers/alunoController.test.ts
import { Request, Response } from 'express';
import * as alunoController from '../../controllers/alunoController';
import Aluno from '../../models/Aluno';

// Mock do modelo Aluno
jest.mock('../../models/Aluno', () => ({
  findAll: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn()
}));

describe('Aluno Controller', () => {
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

  describe('getAlunos', () => {
    it('deve retornar todos os alunos com status 200', async () => {
      const mockAlunos = [
        { id_aluno: 1, nome: 'João' },
        { id_aluno: 2, nome: 'Maria' }
      ];
      (Aluno.findAll as jest.Mock).mockResolvedValue(mockAlunos);
      
      await alunoController.getAlunos(mockRequest as Request, mockResponse as Response);
      
      expect(Aluno.findAll).toHaveBeenCalled();
      expect(mockResponse.json).toHaveBeenCalledWith(mockAlunos);
    });

    it('deve retornar status 500 quando ocorrer um erro', async () => {
      (Aluno.findAll as jest.Mock).mockRejectedValue(new Error('Erro de banco de dados'));
      
      await alunoController.getAlunos(mockRequest as Request, mockResponse as Response);
      
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Erro ao buscar alunos' });
    });
  });

  describe('getAlunoById', () => {
    it('deve retornar um aluno quando encontrado', async () => {
      const mockAluno = [{ id_aluno: 1, nome: 'João' }];
      mockRequest.params = { id: '1' };
      (Aluno.findById as jest.Mock).mockResolvedValue(mockAluno);
      
      await alunoController.getAlunoById(mockRequest as Request, mockResponse as Response);
      
      expect(Aluno.findById).toHaveBeenCalledWith(1);
      expect(mockResponse.json).toHaveBeenCalledWith(mockAluno[0]);
    });

    it('deve retornar status 404 quando aluno não for encontrado', async () => {
      mockRequest.params = { id: '999' };
      (Aluno.findById as jest.Mock).mockResolvedValue([]);
      
      await alunoController.getAlunoById(mockRequest as Request, mockResponse as Response);
      
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Aluno não encontrado' });
    });

    it('deve retornar status 500 quando ocorrer um erro', async () => {
      mockRequest.params = { id: '1' };
      (Aluno.findById as jest.Mock).mockRejectedValue(new Error('Erro de banco de dados'));
      
      await alunoController.getAlunoById(mockRequest as Request, mockResponse as Response);
      
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Erro ao buscar aluno' });
    });
  });

  describe('createAluno', () => {
    it('deve criar um novo aluno com sucesso', async () => {
      const novoAluno = { 
        nome: 'João Silva',
        data_nascimento: '2000-01-01'
      };
      mockRequest.body = novoAluno;
      
      const mockInsertResult = { insertId: 1 };
      const mockAlunoResult = [{ id_aluno: 1, nome: 'João Silva', data_nascimento: '2000-01-01' }];
      
      (Aluno.create as jest.Mock).mockResolvedValue(mockInsertResult);
      (Aluno.findById as jest.Mock).mockResolvedValue(mockAlunoResult);
      
      await alunoController.createAluno(mockRequest as Request, mockResponse as Response);
      
      expect(Aluno.create).toHaveBeenCalledWith(
        novoAluno.nome,
        novoAluno.data_nascimento,
        undefined, // unidade
        undefined, // curso
        undefined, // turno
        undefined, // tipo_necessidade
        undefined, // necessita_tecnologia_assistiva
        undefined, // necessita_acompanhamento
        undefined, // ano_matricula
        undefined, // data_da_matricula
        undefined, // data_fim_do_curso
        undefined, // tipo_do_curso
        undefined, // nome_do_responsavel
        undefined, // email_do_responsavel
        undefined, // telefone_do_responsavel
        undefined, // atendimento_unidade_anterior
        undefined, // casos_na_familia
        undefined  // observacao_casos_familia
      );
      expect(Aluno.findById).toHaveBeenCalledWith(1);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(mockAlunoResult[0]);
    });

    it('deve retornar status 400 quando falhar ao criar aluno', async () => {
      mockRequest.body = { nome: 'João Silva' };
      (Aluno.create as jest.Mock).mockResolvedValue({});
      
      await alunoController.createAluno(mockRequest as Request, mockResponse as Response);
      
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Erro ao criar aluno' });
    });

    it('deve retornar status 500 quando ocorrer um erro', async () => {
      mockRequest.body = { nome: 'João Silva' };
      (Aluno.create as jest.Mock).mockRejectedValue(new Error('Erro de banco de dados'));
      
      await alunoController.createAluno(mockRequest as Request, mockResponse as Response);
      
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Erro ao criar aluno' });
    });
  });

  describe('updateAluno', () => {
    it('deve atualizar um aluno existente', async () => {
      const alunoAtualizado = { 
        nome: 'João Silva Atualizado',
        curso: 'Engenharia'
      };
      mockRequest.params = { id: '1' };
      mockRequest.body = alunoAtualizado;
      
      const mockAlunoAntes = [{ id_aluno: 1, nome: 'João Silva', curso: 'Computação' }];
      const mockAlunoDepois = [{ id_aluno: 1, nome: 'João Silva Atualizado', curso: 'Engenharia' }];
      
      (Aluno.findById as jest.Mock).mockResolvedValueOnce(mockAlunoAntes);
      (Aluno.update as jest.Mock).mockResolvedValue({ affectedRows: 1 });
      (Aluno.findById as jest.Mock).mockResolvedValueOnce(mockAlunoDepois);
      
      await alunoController.updateAluno(mockRequest as Request, mockResponse as Response);
      
      expect(Aluno.findById).toHaveBeenCalledWith(1);
      expect(Aluno.update).toHaveBeenCalledWith(
        1,
        alunoAtualizado.nome,
        undefined, // data_nascimento
        undefined, // unidade
        alunoAtualizado.curso,
        undefined, // turno
        undefined, // tipo_necessidade
        undefined, // necessita_tecnologia_assistiva
        undefined, // necessita_acompanhamento
        undefined, // ano_matricula
        undefined, // data_da_matricula
        undefined, // data_fim_do_curso
        undefined, // tipo_do_curso
        undefined, // nome_do_responsavel
        undefined, // email_do_responsavel
        undefined, // telefone_do_responsavel
        undefined, // atendimento_unidade_anterior
        undefined, // casos_na_familia
        undefined  // observacao_casos_familia
      );
      expect(mockResponse.json).toHaveBeenCalledWith(mockAlunoDepois[0]);
    });

    it('deve retornar status 404 quando aluno não existir', async () => {
      mockRequest.params = { id: '999' };
      mockRequest.body = { nome: 'João Silva Atualizado' };
      (Aluno.findById as jest.Mock).mockResolvedValue([]);
      
      await alunoController.updateAluno(mockRequest as Request, mockResponse as Response);
      
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Aluno não encontrado' });
    });

    it('deve retornar status 500 quando ocorrer um erro', async () => {
      mockRequest.params = { id: '1' };
      mockRequest.body = { nome: 'João Silva Atualizado' };
      (Aluno.findById as jest.Mock).mockRejectedValue(new Error('Erro de banco de dados'));
      
      await alunoController.updateAluno(mockRequest as Request, mockResponse as Response);
      
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Erro ao atualizar aluno' });
    });
  });

  describe('deleteAluno', () => {
    it('deve excluir um aluno existente', async () => {
      mockRequest.params = { id: '1' };
      const mockAluno = [{ id_aluno: 1, nome: 'João Silva' }];
      
      (Aluno.findById as jest.Mock).mockResolvedValue(mockAluno);
      (Aluno.delete as jest.Mock).mockResolvedValue({ affectedRows: 1 });
      
      await alunoController.deleteAluno(mockRequest as Request, mockResponse as Response);
      
      expect(Aluno.findById).toHaveBeenCalledWith(1);
      expect(Aluno.delete).toHaveBeenCalledWith(1);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Aluno removido com sucesso' });
    });

    it('deve retornar status 404 quando aluno não existir', async () => {
      mockRequest.params = { id: '999' };
      (Aluno.findById as jest.Mock).mockResolvedValue([]);
      
      await alunoController.deleteAluno(mockRequest as Request, mockResponse as Response);
      
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Aluno não encontrado' });
    });

    it('deve retornar status 500 quando ocorrer um erro', async () => {
      mockRequest.params = { id: '1' };
      (Aluno.findById as jest.Mock).mockRejectedValue(new Error('Erro de banco de dados'));
      
      await alunoController.deleteAluno(mockRequest as Request, mockResponse as Response);
      
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Erro ao remover aluno' });
    });
  });
});

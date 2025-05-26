// auxiliarDeAcompanhamentoController.test.ts
import { Request, Response } from 'express';
import * as auxiliarController from '../../controllers/auxiliarDeAcompanhamentoController';
import AuxiliarDeAcompanhamento from '../../models/AuxiliarDeAcompanhamento';

// Mock do modelo AuxiliarDeAcompanhamento
jest.mock('../../models/AuxiliarDeAcompanhamento', () => ({
  findAll: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
}));

describe('AuxiliarDeAcompanhamentoController', () => {
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

  describe('getAuxiliares', () => {
    it('deve retornar todos os auxiliares com status 200', async () => {
      const mockAuxiliares = [
        { id_auxiliar: 1, nome: 'João', especializacoes: 'Psicologia' },
        { id_auxiliar: 2, nome: 'Maria', especializacoes: 'Pedagogia' }
      ];
      
      (AuxiliarDeAcompanhamento.findAll as jest.Mock).mockResolvedValue(mockAuxiliares);

      await auxiliarController.getAuxiliares(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(AuxiliarDeAcompanhamento.findAll).toHaveBeenCalled();
      expect(mockResponse.json).toHaveBeenCalledWith(mockAuxiliares);
    });

    it('deve retornar status 500 quando ocorrer um erro', async () => {
      const errorMessage = 'Erro ao buscar';
      (AuxiliarDeAcompanhamento.findAll as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await auxiliarController.getAuxiliares(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(responseJson).toHaveBeenCalledWith({ message: 'Erro ao buscar auxiliares' });
    });
  });

  describe('getAuxiliarById', () => {
    it('deve retornar um auxiliar por ID com status 200', async () => {
      const mockAuxiliar = [{ id_auxiliar: 1, nome: 'João', especializacoes: 'Psicologia' }];
      mockRequest.params = { id: '1' };
      
      (AuxiliarDeAcompanhamento.findById as jest.Mock).mockResolvedValue(mockAuxiliar);

      await auxiliarController.getAuxiliarById(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(AuxiliarDeAcompanhamento.findById).toHaveBeenCalledWith(1);
      expect(mockResponse.json).toHaveBeenCalledWith(mockAuxiliar[0]);
    });

    it('deve retornar status 404 quando o auxiliar não for encontrado', async () => {
      mockRequest.params = { id: '999' };
      
      (AuxiliarDeAcompanhamento.findById as jest.Mock).mockResolvedValue([]);

      await auxiliarController.getAuxiliarById(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(responseJson).toHaveBeenCalledWith({ message: 'Auxiliar não encontrado' });
    });

    it('deve retornar status 500 quando ocorrer um erro', async () => {
      mockRequest.params = { id: '1' };
      
      (AuxiliarDeAcompanhamento.findById as jest.Mock).mockRejectedValue(new Error('Erro ao buscar'));

      await auxiliarController.getAuxiliarById(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(responseJson).toHaveBeenCalledWith({ message: 'Erro ao buscar auxiliar' });
    });
  });

  describe('createAuxiliar', () => {
    it('deve criar um auxiliar com status 201', async () => {
      const novoAuxiliar = { 
        nome: 'João', 
        especializacoes: 'Psicologia', 
        email: 'joao@email.com',
        telefone: 123456789,
        empresa: 'Empresa A'
      };
      
      const mockInsertResult = { insertId: 1, affectedRows: 1 };
      const mockAuxiliarCriado = [{ 
        id_auxiliar: 1, 
        ...novoAuxiliar 
      }];
      
      mockRequest.body = novoAuxiliar;
      
      (AuxiliarDeAcompanhamento.create as jest.Mock).mockResolvedValue(mockInsertResult);
      (AuxiliarDeAcompanhamento.findById as jest.Mock).mockResolvedValue(mockAuxiliarCriado);

      await auxiliarController.createAuxiliar(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(AuxiliarDeAcompanhamento.create).toHaveBeenCalledWith(
        novoAuxiliar.nome,
        novoAuxiliar.especializacoes,
        novoAuxiliar.email,
        novoAuxiliar.telefone,
        novoAuxiliar.empresa
      );
      expect(AuxiliarDeAcompanhamento.findById).toHaveBeenCalledWith(1);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(responseJson).toHaveBeenCalledWith(mockAuxiliarCriado[0]);
    });

    it('deve retornar status 400 quando a criação falhar', async () => {
      const novoAuxiliar = { 
        nome: 'João', 
        especializacoes: 'Psicologia' 
      };
      
      mockRequest.body = novoAuxiliar;
      
      (AuxiliarDeAcompanhamento.create as jest.Mock).mockResolvedValue({ affectedRows: 0 });

      await auxiliarController.createAuxiliar(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(responseJson).toHaveBeenCalledWith({ message: 'Erro ao criar auxiliar' });
    });

    it('deve retornar status 500 quando ocorrer um erro', async () => {
      const novoAuxiliar = { 
        nome: 'João', 
        especializacoes: 'Psicologia' 
      };
      
      mockRequest.body = novoAuxiliar;
      
      (AuxiliarDeAcompanhamento.create as jest.Mock).mockRejectedValue(new Error('Erro ao criar'));

      await auxiliarController.createAuxiliar(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(responseJson).toHaveBeenCalledWith({ message: 'Erro ao criar auxiliar' });
    });
  });

  describe('updateAuxiliar', () => {
    it('deve atualizar um auxiliar com status 200', async () => {
      const dadosAtualizacao = { 
        nome: 'João Silva', 
        especializacoes: 'Psicologia Infantil',
        email: 'joao.silva@email.com'
      };
      
      const mockAuxiliarExistente = [{ 
        id_auxiliar: 1, 
        nome: 'João', 
        especializacoes: 'Psicologia',
        email: 'joao@email.com',
        telefone: 123456789,
        empresa: 'Empresa A'
      }];
      
      const mockAuxiliarAtualizado = [{ 
        id_auxiliar: 1, 
        ...dadosAtualizacao,
        telefone: 123456789,
        empresa: 'Empresa A'
      }];
      
      mockRequest.params = { id: '1' };
      mockRequest.body = dadosAtualizacao;
      
      (AuxiliarDeAcompanhamento.findById as jest.Mock)
        .mockResolvedValueOnce(mockAuxiliarExistente)
        .mockResolvedValueOnce(mockAuxiliarAtualizado);
      
      (AuxiliarDeAcompanhamento.update as jest.Mock).mockResolvedValue({ affectedRows: 1 });

      await auxiliarController.updateAuxiliar(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(AuxiliarDeAcompanhamento.findById).toHaveBeenCalledWith(1);
      expect(AuxiliarDeAcompanhamento.update).toHaveBeenCalledWith(
        1,
        dadosAtualizacao.nome,
        dadosAtualizacao.especializacoes,
        dadosAtualizacao.email,
        undefined,
        undefined
      );
      expect(mockResponse.json).toHaveBeenCalledWith(mockAuxiliarAtualizado[0]);
    });

    it('deve retornar status 404 quando o auxiliar não for encontrado', async () => {
      mockRequest.params = { id: '999' };
      mockRequest.body = { nome: 'João Silva' };
      
      (AuxiliarDeAcompanhamento.findById as jest.Mock).mockResolvedValue([]);

      await auxiliarController.updateAuxiliar(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(responseJson).toHaveBeenCalledWith({ message: 'Auxiliar não encontrado' });
    });

    it('deve retornar status 500 quando ocorrer um erro', async () => {
      mockRequest.params = { id: '1' };
      mockRequest.body = { nome: 'João Silva' };
      
      (AuxiliarDeAcompanhamento.findById as jest.Mock).mockRejectedValue(new Error('Erro ao buscar'));

      await auxiliarController.updateAuxiliar(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(responseJson).toHaveBeenCalledWith({ message: 'Erro ao atualizar auxiliar' });
    });
  });

  describe('deleteAuxiliar', () => {
    it('deve deletar um auxiliar com status 200', async () => {
      const mockAuxiliar = [{ id_auxiliar: 1, nome: 'João' }];
      mockRequest.params = { id: '1' };
      
      (AuxiliarDeAcompanhamento.findById as jest.Mock).mockResolvedValue(mockAuxiliar);
      (AuxiliarDeAcompanhamento.delete as jest.Mock).mockResolvedValue({ affectedRows: 1 });

      await auxiliarController.deleteAuxiliar(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(AuxiliarDeAcompanhamento.findById).toHaveBeenCalledWith(1);
      expect(AuxiliarDeAcompanhamento.delete).toHaveBeenCalledWith(1);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Auxiliar removido com sucesso' });
    });

    it('deve retornar status 404 quando o auxiliar não for encontrado', async () => {
      mockRequest.params = { id: '999' };
      
      (AuxiliarDeAcompanhamento.findById as jest.Mock).mockResolvedValue([]);

      await auxiliarController.deleteAuxiliar(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(responseJson).toHaveBeenCalledWith({ message: 'Auxiliar não encontrado' });
    });

    it('deve retornar status 500 quando ocorrer um erro', async () => {
      mockRequest.params = { id: '1' };
      
      (AuxiliarDeAcompanhamento.findById as jest.Mock).mockRejectedValue(new Error('Erro ao buscar'));

      await auxiliarController.deleteAuxiliar(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(responseJson).toHaveBeenCalledWith({ message: 'Erro ao remover auxiliar' });
    });
  });
});

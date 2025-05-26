// necessidadeEspecialController.test.ts
import { Request, Response } from 'express';
import * as necessidadeEspecialController from '../../controllers/necessidadeEspecialController';
import NecessidadeEspecial from '../../models/NecessidadeEspecial';

// Mock do modelo NecessidadeEspecial
jest.mock('../../models/NecessidadeEspecial', () => ({
  findAll: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
}));

describe('NecessidadeEspecialController', () => {
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

  describe('getNecessidadesEspeciais', () => {
    it('deve retornar todas as necessidades especiais com status 200', async () => {
      const mockNecessidadesEspeciais = [
        { id: 1, descricao: 'Autismo' },
        { id: 2, descricao: 'Deficiência Visual' }
      ];
      
      (NecessidadeEspecial.findAll as jest.Mock).mockResolvedValue(mockNecessidadesEspeciais);

      await necessidadeEspecialController.getNecessidadesEspeciais(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(NecessidadeEspecial.findAll).toHaveBeenCalled();
      expect(mockResponse.json).toHaveBeenCalledWith(mockNecessidadesEspeciais);
    });

    it('deve retornar status 500 quando ocorrer um erro', async () => {
      const errorMessage = 'Erro ao buscar';
      (NecessidadeEspecial.findAll as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await necessidadeEspecialController.getNecessidadesEspeciais(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(responseJson).toHaveBeenCalledWith({ message: "Erro ao buscar necessidades especiais" });
    });
  });

  describe('getNecessidadeEspecialById', () => {
    it('deve retornar uma necessidade especial por ID com status 200', async () => {
      const mockNecessidadeEspecial = [{ id: 1, descricao: 'Autismo' }];
      mockRequest.params = { id: '1' };
      
      (NecessidadeEspecial.findById as jest.Mock).mockResolvedValue(mockNecessidadeEspecial);

      await necessidadeEspecialController.getNecessidadeEspecialById(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(NecessidadeEspecial.findById).toHaveBeenCalledWith(1);
      expect(mockResponse.json).toHaveBeenCalledWith(mockNecessidadeEspecial[0]);
    });

    it('deve retornar status 404 quando a necessidade especial não for encontrada', async () => {
      mockRequest.params = { id: '999' };
      
      (NecessidadeEspecial.findById as jest.Mock).mockResolvedValue([]);

      await necessidadeEspecialController.getNecessidadeEspecialById(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(responseJson).toHaveBeenCalledWith({ message: "Necessidade especial não encontrada" });
    });

    it('deve retornar status 500 quando ocorrer um erro', async () => {
      mockRequest.params = { id: '1' };
      
      (NecessidadeEspecial.findById as jest.Mock).mockRejectedValue(new Error('Erro ao buscar'));

      await necessidadeEspecialController.getNecessidadeEspecialById(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(responseJson).toHaveBeenCalledWith({ message: "Erro ao buscar necessidade especial" });
    });
  });

  describe('createNecessidadeEspecial', () => {
    it('deve criar uma necessidade especial com status 201', async () => {
      mockRequest.body = { descricao: 'Nova Necessidade' };
      
      (NecessidadeEspecial.create as jest.Mock).mockResolvedValue({ affectedRows: 1 });

      await necessidadeEspecialController.createNecessidadeEspecial(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(NecessidadeEspecial.create).toHaveBeenCalledWith('Nova Necessidade');
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(responseJson).toHaveBeenCalledWith({ message: "Necessidade especial criada com sucesso" });
    });

    it('deve retornar status 400 quando a criação falhar', async () => {
      mockRequest.body = { descricao: 'Nova Necessidade' };
      
      (NecessidadeEspecial.create as jest.Mock).mockResolvedValue({ affectedRows: 0 });

      await necessidadeEspecialController.createNecessidadeEspecial(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(responseJson).toHaveBeenCalledWith({ message: "Erro ao criar necessidade especial" });
    });

    it('deve retornar status 500 quando ocorrer um erro', async () => {
      mockRequest.body = { descricao: 'Nova Necessidade' };
      
      (NecessidadeEspecial.create as jest.Mock).mockRejectedValue(new Error('Erro ao criar'));

      await necessidadeEspecialController.createNecessidadeEspecial(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(responseJson).toHaveBeenCalledWith({ message: "Erro ao criar necessidade especial" });
    });
  });

  describe('updateNecessidadeEspecial', () => {
    it('deve atualizar uma necessidade especial com status 200', async () => {
      mockRequest.params = { id: '1' };
      mockRequest.body = { descricao: 'Necessidade Atualizada' };
      
      const mockNecessidadeEspecial = [{ id: 1, descricao: 'Autismo' }];
      const mockNecessidadeEspecialAtualizada = [{ id: 1, descricao: 'Necessidade Atualizada' }];
      
      (NecessidadeEspecial.findById as jest.Mock)
        .mockResolvedValueOnce(mockNecessidadeEspecial)
        .mockResolvedValueOnce(mockNecessidadeEspecialAtualizada);
      (NecessidadeEspecial.update as jest.Mock).mockResolvedValue({ affectedRows: 1 });

      await necessidadeEspecialController.updateNecessidadeEspecial(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(NecessidadeEspecial.findById).toHaveBeenCalledWith(1);
      expect(NecessidadeEspecial.update).toHaveBeenCalledWith(1, 'Necessidade Atualizada');
      expect(mockResponse.json).toHaveBeenCalledWith(mockNecessidadeEspecialAtualizada[0]);
    });

    it('deve retornar status 404 quando a necessidade especial não for encontrada', async () => {
      mockRequest.params = { id: '999' };
      mockRequest.body = { descricao: 'Necessidade Atualizada' };
      
      (NecessidadeEspecial.findById as jest.Mock).mockResolvedValue([]);

      await necessidadeEspecialController.updateNecessidadeEspecial(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(responseJson).toHaveBeenCalledWith({ message: "Necessidade especial não encontrada" });
    });

    it('deve retornar status 500 quando ocorrer um erro', async () => {
      mockRequest.params = { id: '1' };
      mockRequest.body = { descricao: 'Necessidade Atualizada' };
      
      (NecessidadeEspecial.findById as jest.Mock).mockRejectedValue(new Error('Erro ao buscar'));

      await necessidadeEspecialController.updateNecessidadeEspecial(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(responseJson).toHaveBeenCalledWith({ message: "Erro ao atualizar necessidade especial" });
    });
  });

  describe('deleteNecessidadeEspecial', () => {
    it('deve deletar uma necessidade especial com status 200', async () => {
      mockRequest.params = { id: '1' };
      
      const mockNecessidadeEspecial = [{ id: 1, descricao: 'Autismo' }];
      
      (NecessidadeEspecial.findById as jest.Mock).mockResolvedValue(mockNecessidadeEspecial);
      (NecessidadeEspecial.delete as jest.Mock).mockResolvedValue({ affectedRows: 1 });

      await necessidadeEspecialController.deleteNecessidadeEspecial(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(NecessidadeEspecial.findById).toHaveBeenCalledWith(1);
      expect(NecessidadeEspecial.delete).toHaveBeenCalledWith(1);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: "Necessidade especial removida com sucesso" });
    });

    it('deve retornar status 404 quando a necessidade especial não for encontrada', async () => {
      mockRequest.params = { id: '999' };
      
      (NecessidadeEspecial.findById as jest.Mock).mockResolvedValue([]);

      await necessidadeEspecialController.deleteNecessidadeEspecial(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(responseJson).toHaveBeenCalledWith({ message: "Necessidade especial não encontrada" });
    });

    it('deve retornar status 500 quando ocorrer um erro', async () => {
      mockRequest.params = { id: '1' };
      
      (NecessidadeEspecial.findById as jest.Mock).mockRejectedValue(new Error('Erro ao buscar'));

      await necessidadeEspecialController.deleteNecessidadeEspecial(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(responseJson).toHaveBeenCalledWith({ message: "Erro ao remover necessidade especial" });
    });
  });
});

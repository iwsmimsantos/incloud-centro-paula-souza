import TecnologiaAssistivaController from '../../controllers/tecnologiaAssistivaController';
import TecnologiaAssistiva from '../../models/TecnologiaAssistiva';
import { Request, Response } from 'express';

jest.mock('../../models/TecnologiaAssistiva');

describe('TecnologiaAssistivaController', () => {
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
    test('should return 201 when technology is created successfully', async () => {
      mockRequest.body = { nome: 'Leitor de Tela', descricao: 'Software para leitura de tela', tipo: 'Visual' };
      (TecnologiaAssistiva.create as jest.Mock).mockResolvedValue({ insertId: 1 });

      await TecnologiaAssistivaController.create(mockRequest as Request, mockResponse as Response);

      expect(TecnologiaAssistiva.create).toHaveBeenCalledWith('Leitor de Tela', 'Software para leitura de tela', 'Visual');
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(responseObject).toHaveProperty('message', 'Tecnologia Assistiva criada com sucesso.');
    });

    test('should return 400 when nome is not provided', async () => {
      mockRequest.body = { descricao: 'Software para leitura de tela', tipo: 'Visual' };
      
      await TecnologiaAssistivaController.create(mockRequest as Request, mockResponse as Response);

      expect(TecnologiaAssistiva.create).not.toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(responseObject).toHaveProperty('message', 'Nome é obrigatório.');
    });

    test('should return 500 when database operation fails', async () => {
      mockRequest.body = { nome: 'Leitor de Tela', descricao: 'Software para leitura de tela', tipo: 'Visual' };
      (TecnologiaAssistiva.create as jest.Mock).mockRejectedValue(new Error('Database error'));

      await TecnologiaAssistivaController.create(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(responseObject).toHaveProperty('message', 'Erro ao criar Tecnologia Assistiva.');
    });
  });

  // Testes para o método findById
  describe('findById', () => {
    test('should return 200 with technology data when found', async () => {
      mockRequest.params = { id_tecnologia: '1' };
      const mockTecnologia = [{ id_tecnologia: 1, nome: 'Leitor de Tela', descricao: 'Software para leitura de tela', tipo: 'Visual' }];
      (TecnologiaAssistiva.findById as jest.Mock).mockResolvedValue(mockTecnologia);

      await TecnologiaAssistivaController.findById(mockRequest as Request, mockResponse as Response);

      expect(TecnologiaAssistiva.findById).toHaveBeenCalledWith(1);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(responseObject).toEqual(mockTecnologia[0]);
    });

    test('should return 404 when technology is not found', async () => {
      mockRequest.params = { id_tecnologia: '999' };
      (TecnologiaAssistiva.findById as jest.Mock).mockResolvedValue([]);

      await TecnologiaAssistivaController.findById(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(responseObject).toHaveProperty('message', 'Tecnologia Assistiva não encontrada.');
    });

    test('should return 500 when database operation fails', async () => {
      mockRequest.params = { id_tecnologia: '1' };
      (TecnologiaAssistiva.findById as jest.Mock).mockRejectedValue(new Error('Database error'));

      await TecnologiaAssistivaController.findById(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(responseObject).toHaveProperty('message', 'Erro ao buscar Tecnologia Assistiva.');
    });
  });

  // Testes para o método findAll
  describe('findAll', () => {
    test('should return 200 with all technologies', async () => {
      const mockTecnologias = [
        { id_tecnologia: 1, nome: 'Leitor de Tela', descricao: 'Software para leitura de tela', tipo: 'Visual' },
        { id_tecnologia: 2, nome: 'Teclado Adaptado', descricao: 'Teclado com teclas maiores', tipo: 'Motor' }
      ];
      (TecnologiaAssistiva.findAll as jest.Mock).mockResolvedValue(mockTecnologias);

      await TecnologiaAssistivaController.findAll(mockRequest as Request, mockResponse as Response);

      expect(TecnologiaAssistiva.findAll).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(responseObject).toEqual(mockTecnologias);
    });

    test('should return 500 when database operation fails', async () => {
      (TecnologiaAssistiva.findAll as jest.Mock).mockRejectedValue(new Error('Database error'));

      await TecnologiaAssistivaController.findAll(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(responseObject).toHaveProperty('message', 'Erro ao buscar todas as Tecnologias Assistivas.');
    });
  });

  // Testes para o método findByTipo
  describe('findByTipo', () => {
    test('should return 200 with technologies of specified type', async () => {
      mockRequest.query = { tipo: 'Visual' };
      const mockTecnologias = [
        { id_tecnologia: 1, nome: 'Leitor de Tela', descricao: 'Software para leitura de tela', tipo: 'Visual' }
      ];
      (TecnologiaAssistiva.findByTipo as jest.Mock).mockResolvedValue(mockTecnologias);

      await TecnologiaAssistivaController.findByTipo(mockRequest as Request, mockResponse as Response);

      expect(TecnologiaAssistiva.findByTipo).toHaveBeenCalledWith('Visual');
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(responseObject).toEqual(mockTecnologias);
    });

    test('should return 400 when tipo is invalid', async () => {
      mockRequest.query = { tipo: ['Visual'] }; // Tipo inválido (array em vez de string)

      await TecnologiaAssistivaController.findByTipo(mockRequest as Request, mockResponse as Response);

      expect(TecnologiaAssistiva.findByTipo).not.toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(responseObject).toHaveProperty('message', 'Tipo inválido.');
    });

    test('should return 500 when database operation fails', async () => {
      mockRequest.query = { tipo: 'Visual' };
      (TecnologiaAssistiva.findByTipo as jest.Mock).mockRejectedValue(new Error('Database error'));

      await TecnologiaAssistivaController.findByTipo(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(responseObject).toHaveProperty('message', 'Erro ao buscar Tecnologias Assistivas por tipo.');
    });
  });

  // Testes para o método update
  describe('update', () => {
    test('should return 200 when technology is updated successfully', async () => {
      mockRequest.params = { id_tecnologia: '1' };
      mockRequest.body = { nome: 'Leitor de Tela Atualizado', descricao: 'Nova descrição', tipo: 'Visual' };
      (TecnologiaAssistiva.update as jest.Mock).mockResolvedValue({ affectedRows: 1 });

      await TecnologiaAssistivaController.update(mockRequest as Request, mockResponse as Response);

      expect(TecnologiaAssistiva.update).toHaveBeenCalledWith(1, 'Leitor de Tela Atualizado', 'Nova descrição', 'Visual');
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(responseObject).toHaveProperty('message', 'Tecnologia Assistiva atualizada com sucesso.');
    });

    test('should return 404 when technology is not found', async () => {
      mockRequest.params = { id_tecnologia: '999' };
      mockRequest.body = { nome: 'Leitor de Tela Atualizado' };
      (TecnologiaAssistiva.update as jest.Mock).mockResolvedValue({ affectedRows: 0 });

      await TecnologiaAssistivaController.update(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(responseObject).toHaveProperty('message', 'Tecnologia Assistiva não encontrada para atualização.');
    });

    test('should return 500 when database operation fails', async () => {
      mockRequest.params = { id_tecnologia: '1' };
      mockRequest.body = { nome: 'Leitor de Tela Atualizado' };
      (TecnologiaAssistiva.update as jest.Mock).mockRejectedValue(new Error('Database error'));

      await TecnologiaAssistivaController.update(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(responseObject).toHaveProperty('message', 'Erro ao atualizar Tecnologia Assistiva.');
    });
  });

  // Testes para o método delete
  describe('delete', () => {
    test('should return 200 when technology is deleted successfully', async () => {
      mockRequest.params = { id_tecnologia: '1' };
      (TecnologiaAssistiva.delete as jest.Mock).mockResolvedValue({ affectedRows: 1 });

      await TecnologiaAssistivaController.delete(mockRequest as Request, mockResponse as Response);

      expect(TecnologiaAssistiva.delete).toHaveBeenCalledWith(1);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(responseObject).toHaveProperty('message', 'Tecnologia Assistiva excluída com sucesso.');
    });

    test('should return 404 when technology is not found', async () => {
      mockRequest.params = { id_tecnologia: '999' };
      (TecnologiaAssistiva.delete as jest.Mock).mockResolvedValue({ affectedRows: 0 });

      await TecnologiaAssistivaController.delete(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(responseObject).toHaveProperty('message', 'Tecnologia Assistiva não encontrada para exclusão.');
    });

    test('should return 500 when database operation fails', async () => {
      mockRequest.params = { id_tecnologia: '1' };
      (TecnologiaAssistiva.delete as jest.Mock).mockRejectedValue(new Error('Database error'));

      await TecnologiaAssistivaController.delete(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(responseObject).toHaveProperty('message', 'Erro ao excluir Tecnologia Assistiva.');
    });
  });
});

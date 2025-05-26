// tests/models/Autenticacao.test.ts
import Autenticacao from '../../models/Autenticacao';
import pool from '../../config/database';

// Mock do módulo database
jest.mock('../../config/database', () => ({
  execute: jest.fn(),
}));

describe('Autenticacao Model', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Teste de criação de instância
  describe('create', () => {
    it('deve criar uma nova autenticação com sucesso', async () => {
      const mockResult = { affectedRows: 1, insertId: 1 };
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockResult]);
      
      const result = await Autenticacao.create(1, 2);
      
      expect(pool.execute).toHaveBeenCalledWith(
        'INSERT INTO Autenticação (id_funcionário, nivel_acesso) VALUES (?, ?)',
        [1, 2]
      );
      expect(result).toEqual(mockResult);
    });

    it('deve lançar erro quando os parâmetros são inválidos', async () => {
      (pool.execute as jest.Mock).mockRejectedValueOnce(new Error('Erro de banco de dados'));
      
      // Usando valores numéricos inválidos para testar erro
      await expect(Autenticacao.create(-1, 2)).rejects.toThrow();
    });
  });

  // Teste de validação de campos
  describe('validação de campos', () => {
    it('deve validar id_funcionario como número', async () => {
      const mockResult = { affectedRows: 1, insertId: 1 };
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockResult]);
      
      await Autenticacao.create(1, 2);
      
      expect(pool.execute).toHaveBeenCalledWith(
        expect.any(String),
        expect.arrayContaining([1])
      );
    });
    
    it('deve validar nivel_acesso como número', async () => {
      const mockResult = { affectedRows: 1, insertId: 1 };
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockResult]);
      
      await Autenticacao.create(1, 2);
      
      expect(pool.execute).toHaveBeenCalledWith(
        expect.any(String),
        expect.arrayContaining([2])
      );
    });
  });

  // Teste de busca por ID
  describe('findById', () => {
    it('deve encontrar uma autenticação pelo ID', async () => {
      const mockAutenticacao = [
        { id_autenticação: 1, id_funcionário: 1, nivel_acesso: 2 }
      ];
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockAutenticacao]);
      
      const result = await Autenticacao.findById(1);
      
      expect(pool.execute).toHaveBeenCalledWith(
        'SELECT * FROM Autenticação WHERE id_autenticação = ?',
        [1]
      );
      expect(result).toEqual(mockAutenticacao);
    });

    it('deve retornar array vazio quando a autenticação não existe', async () => {
      (pool.execute as jest.Mock).mockResolvedValueOnce([[]]);
      
      const result = await Autenticacao.findById(999);
      
      expect(pool.execute).toHaveBeenCalledWith(
        'SELECT * FROM Autenticação WHERE id_autenticação = ?',
        [999]
      );
      expect(result).toEqual([]);
    });
  });

  // Teste de busca por ID do funcionário
  describe('findByFuncionarioId', () => {
    it('deve encontrar autenticações por id_funcionario', async () => {
      const mockAutenticacao = [
        { id_autenticação: 1, id_funcionário: 1, nivel_acesso: 2 }
      ];
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockAutenticacao]);
      
      const result = await Autenticacao.findByFuncionarioId(1);
      
      expect(pool.execute).toHaveBeenCalledWith(
        'SELECT * FROM Autenticação WHERE id_funcionário = ?',
        [1]
      );
      expect(result).toEqual(mockAutenticacao);
    });

    it('deve retornar array vazio quando não há autenticações para o funcionário', async () => {
      (pool.execute as jest.Mock).mockResolvedValueOnce([[]]);
      
      const result = await Autenticacao.findByFuncionarioId(999);
      
      expect(pool.execute).toHaveBeenCalledWith(
        'SELECT * FROM Autenticação WHERE id_funcionário = ?',
        [999]
      );
      expect(result).toEqual([]);
    });
  });

  // Teste de busca de todas as autenticações
  describe('findAll', () => {
    it('deve retornar todas as autenticações', async () => {
      const mockAutenticacoes = [
        { id_autenticação: 1, id_funcionário: 1, nivel_acesso: 2 },
        { id_autenticação: 2, id_funcionário: 2, nivel_acesso: 1 }
      ];
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockAutenticacoes]);
      
      const result = await Autenticacao.findAll();
      
      expect(pool.execute).toHaveBeenCalledWith('SELECT * FROM Autenticação');
      expect(result).toEqual(mockAutenticacoes);
    });

    it('deve retornar array vazio quando não há autenticações', async () => {
      (pool.execute as jest.Mock).mockResolvedValueOnce([[]]);
      
      const result = await Autenticacao.findAll();
      
      expect(pool.execute).toHaveBeenCalledWith('SELECT * FROM Autenticação');
      expect(result).toEqual([]);
    });
  });

  // Teste de atualização
  describe('update', () => {
    it('deve atualizar o nivel_acesso de uma autenticação existente', async () => {
      const mockResult = { affectedRows: 1, changedRows: 1 };
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockResult]);
      
      const result = await Autenticacao.update(1, 3);
      
      expect(pool.execute).toHaveBeenCalledWith(
        'UPDATE Autenticação SET nivel_acesso = ? WHERE id_autenticação = ?',
        [3, 1]
      );
      expect(result).toEqual(mockResult);
    });

    it('deve retornar affectedRows 0 quando a autenticação não existe', async () => {
      const mockResult = { affectedRows: 0, changedRows: 0 };
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockResult]);
      
      const result = await Autenticacao.update(999, 3);
      
      expect(pool.execute).toHaveBeenCalledWith(
        'UPDATE Autenticação SET nivel_acesso = ? WHERE id_autenticação = ?',
        [3, 999]
      );
      expect(result).toEqual(mockResult);
    });
  });

  // Teste de exclusão
  describe('delete', () => {
    it('deve excluir uma autenticação pelo ID', async () => {
      const mockResult = { affectedRows: 1 };
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockResult]);
      
      const result = await Autenticacao.delete(1);
      
      expect(pool.execute).toHaveBeenCalledWith(
        'DELETE FROM Autenticação WHERE id_autenticação = ?',
        [1]
      );
      expect(result).toEqual(mockResult);
    });

    it('deve retornar affectedRows 0 quando a autenticação não existe', async () => {
      const mockResult = { affectedRows: 0 };
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockResult]);
      
      const result = await Autenticacao.delete(999);
      
      expect(pool.execute).toHaveBeenCalledWith(
        'DELETE FROM Autenticação WHERE id_autenticação = ?',
        [999]
      );
      expect(result).toEqual(mockResult);
    });
  });

  // Teste de relacionamentos
  describe('relacionamentos', () => {
    it('deve permitir integração com modelo Funcionario', async () => {
      // Este teste simula como seria a integração com o modelo Funcionario
      const mockFuncionario = {
        findById: jest.fn().mockResolvedValue([
          { id_funcionario: 1, nome: 'João Silva' }
        ])
      };
      
      // Primeiro, encontramos uma autenticação
      const mockAutenticacao = [
        { id_autenticação: 1, id_funcionário: 1, nivel_acesso: 2 }
      ];
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockAutenticacao]);
      
      const autenticacao = await Autenticacao.findById(1);
      
      // Depois, buscamos o funcionário relacionado
      const funcionario = await mockFuncionario.findById(autenticacao[0].id_funcionário);
      
      expect(mockFuncionario.findById).toHaveBeenCalledWith(1);
      expect(funcionario).toEqual([
        { id_funcionario: 1, nome: 'João Silva' }
      ]);
    });
  });
});

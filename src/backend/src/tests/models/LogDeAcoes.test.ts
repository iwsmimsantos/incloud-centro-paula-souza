// tests/models/LogDeAcoes.test.ts
import LogDeAcoes from '../../models/LogDeAcoes';
import pool from '../../config/database';

// Mock do módulo database
jest.mock('../../config/database', () => ({
  execute: jest.fn(),
}));

describe('LogDeAcoes Model', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Teste de criação de instância
  describe('create', () => {
    it('deve criar um novo log com sucesso (com data padrão)', async () => {
      const mockResult = { affectedRows: 1, insertId: 1 };
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockResult]);
      
      const result = await LogDeAcoes.create(1, 'Usuário fez login');
      
      expect(pool.execute).toHaveBeenCalledWith(
        'INSERT INTO Log_de_Ações (id_funcionario, data_hora, descricao) VALUES (?, ?, ?)',
        [1, expect.any(Date), 'Usuário fez login']
      );
      expect(result).toEqual(mockResult);
    });

    it('deve criar um log com data específica', async () => {
      const mockResult = { affectedRows: 1, insertId: 1 };
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockResult]);
      
      const dataEspecifica = new Date('2025-03-14T12:00:00');
      const result = await LogDeAcoes.create(1, 'Usuário alterou registro', dataEspecifica);
      
      expect(pool.execute).toHaveBeenCalledWith(
        'INSERT INTO Log_de_Ações (id_funcionario, data_hora, descricao) VALUES (?, ?, ?)',
        [1, dataEspecifica, 'Usuário alterou registro']
      );
      expect(result).toEqual(mockResult);
    });

    it('deve lançar erro quando os parâmetros são inválidos', async () => {
      (pool.execute as jest.Mock).mockRejectedValueOnce(new Error('Erro de banco de dados'));
      
      await expect(LogDeAcoes.create(-1, '')).rejects.toThrow();
    });
  });

  // Teste de busca por ID
  describe('findById', () => {
    it('deve encontrar um log pelo ID', async () => {
      const mockLog = [
        {
          id_log: 1,
          id_funcionario: 1,
          data_hora: new Date('2025-03-14T12:00:00'),
          descricao: 'Usuário fez login'
        }
      ];
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockLog]);
      
      const result = await LogDeAcoes.findById(1);
      
      expect(pool.execute).toHaveBeenCalledWith(
        'SELECT * FROM Log_de_Ações WHERE id_log = ?',
        [1]
      );
      expect(result).toEqual(mockLog);
    });

    it('deve retornar array vazio quando o log não existe', async () => {
      (pool.execute as jest.Mock).mockResolvedValueOnce([[]]);
      
      const result = await LogDeAcoes.findById(999);
      
      expect(pool.execute).toHaveBeenCalledWith(
        'SELECT * FROM Log_de_Ações WHERE id_log = ?',
        [999]
      );
      expect(result).toEqual([]);
    });
  });

  // Teste de busca por ID do funcionário
  describe('findByFuncionarioId', () => {
    it('deve encontrar logs por id_funcionario', async () => {
      const mockLogs = [
        { id_log: 1, id_funcionario: 1, descricao: 'Ação 1' },
        { id_log: 2, id_funcionario: 1, descricao: 'Ação 2' }
      ];
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockLogs]);
      
      const result = await LogDeAcoes.findByFuncionarioId(1);
      
      expect(pool.execute).toHaveBeenCalledWith(
        'SELECT * FROM Log_de_Ações WHERE id_funcionario = ?',
        [1]
      );
      expect(result).toEqual(mockLogs);
    });

    it('deve retornar array vazio quando não há logs para o funcionário', async () => {
      (pool.execute as jest.Mock).mockResolvedValueOnce([[]]);
      
      const result = await LogDeAcoes.findByFuncionarioId(999);
      
      expect(pool.execute).toHaveBeenCalledWith(
        'SELECT * FROM Log_de_Ações WHERE id_funcionario = ?',
        [999]
      );
      expect(result).toEqual([]);
    });
  });

  // Teste de busca de todos os logs
  describe('findAll', () => {
    it('deve retornar todos os logs', async () => {
      const mockLogs = [
        { id_log: 1, id_funcionario: 1, descricao: 'Ação 1' },
        { id_log: 2, id_funcionario: 2, descricao: 'Ação 2' }
      ];
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockLogs]);
      
      const result = await LogDeAcoes.findAll();
      
      expect(pool.execute).toHaveBeenCalledWith('SELECT * FROM Log_de_Ações');
      expect(result).toEqual(mockLogs);
    });

    it('deve retornar array vazio quando não há logs', async () => {
      (pool.execute as jest.Mock).mockResolvedValueOnce([[]]);
      
      const result = await LogDeAcoes.findAll();
      
      expect(pool.execute).toHaveBeenCalledWith('SELECT * FROM Log_de_Ações');
      expect(result).toEqual([]);
    });
  });

  // Teste de busca por intervalo de datas
  describe('findByDateRange', () => {
    it('deve encontrar logs dentro de um intervalo de datas', async () => {
      const mockLogs = [
        { 
          id_log: 1, 
          id_funcionario: 1, 
          data_hora: new Date('2025-03-14T12:00:00'),
          descricao: 'Ação 1' 
        },
        { 
          id_log: 2, 
          id_funcionario: 2, 
          data_hora: new Date('2025-03-15T12:00:00'),
          descricao: 'Ação 2' 
        }
      ];
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockLogs]);
      
      const startDate = new Date('2025-03-14T00:00:00');
      const endDate = new Date('2025-03-15T23:59:59');
      
      const result = await LogDeAcoes.findByDateRange(startDate, endDate);
      
      expect(pool.execute).toHaveBeenCalledWith(
        'SELECT * FROM Log_de_Ações WHERE data_hora BETWEEN ? AND ?',
        [startDate, endDate]
      );
      expect(result).toEqual(mockLogs);
    });

    it('deve retornar array vazio quando não há logs no intervalo', async () => {
      (pool.execute as jest.Mock).mockResolvedValueOnce([[]]);
      
      const startDate = new Date('2025-01-01T00:00:00');
      const endDate = new Date('2025-01-31T23:59:59');
      
      const result = await LogDeAcoes.findByDateRange(startDate, endDate);
      
      expect(pool.execute).toHaveBeenCalledWith(
        'SELECT * FROM Log_de_Ações WHERE data_hora BETWEEN ? AND ?',
        [startDate, endDate]
      );
      expect(result).toEqual([]);
    });
  });

  // Teste de exclusão
  describe('delete', () => {
    it('deve excluir um log pelo ID', async () => {
      const mockResult = { affectedRows: 1 };
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockResult]);
      
      const result = await LogDeAcoes.delete(1);
      
      expect(pool.execute).toHaveBeenCalledWith(
        'DELETE FROM Log_de_Ações WHERE id_log = ?',
        [1]
      );
      expect(result).toEqual(mockResult);
    });

    it('deve retornar affectedRows 0 quando o log não existe', async () => {
      const mockResult = { affectedRows: 0 };
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockResult]);
      
      const result = await LogDeAcoes.delete(999);
      
      expect(pool.execute).toHaveBeenCalledWith(
        'DELETE FROM Log_de_Ações WHERE id_log = ?',
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
      
      // Primeiro, encontramos um log
      const mockLog = [
        { id_log: 1, id_funcionario: 1, descricao: 'Usuário fez login' }
      ];
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockLog]);
      
      const log = await LogDeAcoes.findById(1);
      
      // Depois, buscamos o funcionário relacionado
      const funcionario = await mockFuncionario.findById(log[0].id_funcionario);
      
      expect(mockFuncionario.findById).toHaveBeenCalledWith(1);
      expect(funcionario).toEqual([
        { id_funcionario: 1, nome: 'João Silva' }
      ]);
    });
  });
});

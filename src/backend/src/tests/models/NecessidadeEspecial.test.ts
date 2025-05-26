// tests/models/NecessidadeEspecial.test.ts
import NecessidadeEspecial from '../../models/NecessidadeEspecial';
import pool from '../../config/database';

// Mock do módulo database
jest.mock('../../config/database', () => ({
  execute: jest.fn(),
}));

describe('NecessidadeEspecial Model', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Teste de criação de instância
  describe('create', () => {
    it('deve criar uma nova necessidade especial com sucesso', async () => {
      const mockResult = { affectedRows: 1, insertId: 1 };
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockResult]);
      
      const result = await NecessidadeEspecial.create('Deficiência Visual');
      
      expect(pool.execute).toHaveBeenCalledWith(
        'INSERT INTO Necessidade_Especial (descricao) VALUES (?)',
        ['Deficiência Visual']
      );
      expect(result).toEqual(mockResult);
    });

    it('deve lançar erro quando a descrição é vazia', async () => {
      (pool.execute as jest.Mock).mockRejectedValueOnce(new Error('Erro de banco de dados'));
      
      await expect(NecessidadeEspecial.create('')).rejects.toThrow();
    });
  });

  // Teste de busca por ID
  describe('findById', () => {
    it('deve encontrar uma necessidade especial pelo ID', async () => {
      const mockNecessidade = [
        { id_necessidade: 1, descricao: 'Deficiência Visual' }
      ];
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockNecessidade]);
      
      const result = await NecessidadeEspecial.findById(1);
      
      expect(pool.execute).toHaveBeenCalledWith(
        'SELECT * FROM Necessidade_Especial WHERE id_necessidade = ?',
        [1]
      );
      expect(result).toEqual(mockNecessidade);
    });

    it('deve retornar array vazio quando a necessidade não existe', async () => {
      (pool.execute as jest.Mock).mockResolvedValueOnce([[]]);
      
      const result = await NecessidadeEspecial.findById(999);
      
      expect(pool.execute).toHaveBeenCalledWith(
        'SELECT * FROM Necessidade_Especial WHERE id_necessidade = ?',
        [999]
      );
      expect(result).toEqual([]);
    });
  });

  // Teste de busca de todas as necessidades
  describe('findAll', () => {
    it('deve retornar todas as necessidades especiais', async () => {
      const mockNecessidades = [
        { id_necessidade: 1, descricao: 'Deficiência Visual' },
        { id_necessidade: 2, descricao: 'Deficiência Auditiva' }
      ];
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockNecessidades]);
      
      const result = await NecessidadeEspecial.findAll();
      
      expect(pool.execute).toHaveBeenCalledWith('SELECT * FROM Necessidade_Especial');
      expect(result).toEqual(mockNecessidades);
    });

    it('deve retornar array vazio quando não há necessidades', async () => {
      (pool.execute as jest.Mock).mockResolvedValueOnce([[]]);
      
      const result = await NecessidadeEspecial.findAll();
      
      expect(pool.execute).toHaveBeenCalledWith('SELECT * FROM Necessidade_Especial');
      expect(result).toEqual([]);
    });
  });

  // Teste de atualização
  describe('update', () => {
    it('deve atualizar uma necessidade especial existente', async () => {
      const mockResult = { affectedRows: 1, changedRows: 1 };
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockResult]);
      
      const result = await NecessidadeEspecial.update(1, 'Deficiência Visual Atualizada');
      
      expect(pool.execute).toHaveBeenCalledWith(
        'UPDATE Necessidade_Especial SET descricao = ? WHERE id_necessidade = ?',
        ['Deficiência Visual Atualizada', 1]
      );
      expect(result).toEqual(mockResult);
    });

    it('deve retornar affectedRows 0 quando a necessidade não existe', async () => {
      const mockResult = { affectedRows: 0, changedRows: 0 };
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockResult]);
      
      const result = await NecessidadeEspecial.update(999, 'Descrição Inexistente');
      
      expect(pool.execute).toHaveBeenCalledWith(
        'UPDATE Necessidade_Especial SET descricao = ? WHERE id_necessidade = ?',
        ['Descrição Inexistente', 999]
      );
      expect(result).toEqual(mockResult);
    });
  });

  // Teste de exclusão
  describe('delete', () => {
    it('deve excluir uma necessidade especial pelo ID', async () => {
      const mockResult = { affectedRows: 1 };
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockResult]);
      
      const result = await NecessidadeEspecial.delete(1);
      
      expect(pool.execute).toHaveBeenCalledWith(
        'DELETE FROM Necessidade_Especial WHERE id_necessidade = ?',
        [1]
      );
      expect(result).toEqual(mockResult);
    });

    it('deve retornar affectedRows 0 quando a necessidade não existe', async () => {
      const mockResult = { affectedRows: 0 };
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockResult]);
      
      const result = await NecessidadeEspecial.delete(999);
      
      expect(pool.execute).toHaveBeenCalledWith(
        'DELETE FROM Necessidade_Especial WHERE id_necessidade = ?',
        [999]
      );
      expect(result).toEqual(mockResult);
    });
  });

  // Teste de relacionamentos
  describe('relacionamentos', () => {
    it('deve permitir integração com modelo Aluno', async () => {
      // Este teste simula como seria a integração com o modelo Aluno
      const mockAluno = {
        findByNecessidade: jest.fn().mockResolvedValue([
          { id_aluno: 1, nome: 'João Silva', tipo_necessidade: 'Deficiência Visual' }
        ])
      };
      
      // Primeiro, encontramos uma necessidade
      const mockNecessidade = [
        { id_necessidade: 1, descricao: 'Deficiência Visual' }
      ];
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockNecessidade]);
      
      const necessidade = await NecessidadeEspecial.findById(1);
      
      // Depois, buscamos os alunos relacionados à necessidade
      const alunos = await mockAluno.findByNecessidade(necessidade[0].descricao);
      
      expect(mockAluno.findByNecessidade).toHaveBeenCalledWith('Deficiência Visual');
      expect(alunos).toEqual([
        { id_aluno: 1, nome: 'João Silva', tipo_necessidade: 'Deficiência Visual' }
      ]);
    });
  });
});

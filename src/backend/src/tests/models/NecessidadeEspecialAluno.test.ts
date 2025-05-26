// tests/models/NecessidadeEspecialAluno.test.ts
import NecessidadeEspecialAluno from '../../models/NecessidadeEspecialAluno';
import pool from '../../config/database';

// Mock do módulo database
jest.mock('../../config/database', () => ({
  execute: jest.fn(),
}));

describe('NecessidadeEspecialAluno Model', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Teste de criação de instância
  describe('create', () => {
    it('deve criar uma nova relação necessidade-aluno com sucesso', async () => {
      const mockResult = { affectedRows: 1, insertId: 1 };
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockResult]);
      
      const result = await NecessidadeEspecialAluno.create(1, 2);
      
      expect(pool.execute).toHaveBeenCalledWith(
        'INSERT INTO Necessidade_Especial_e_Aluno (id_aluno, id_necessidade) VALUES (?, ?)',
        [1, 2]
      );
      expect(result).toEqual(mockResult);
    });

    it('deve lançar erro quando os parâmetros são inválidos', async () => {
      (pool.execute as jest.Mock).mockRejectedValueOnce(new Error('Erro de banco de dados'));
      
      await expect(NecessidadeEspecialAluno.create(-1, 2)).rejects.toThrow();
    });
  });

  // Teste de busca por ID
  describe('findById', () => {
    it('deve encontrar uma relação necessidade-aluno pelo ID', async () => {
      const mockRelacao = [
        { id_necessidade_aluno: 1, id_aluno: 1, id_necessidade: 2 }
      ];
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockRelacao]);
      
      const result = await NecessidadeEspecialAluno.findById(1);
      
      expect(pool.execute).toHaveBeenCalledWith(
        'SELECT * FROM Necessidade_Especial_e_Aluno WHERE id_necessidade_aluno = ?',
        [1]
      );
      expect(result).toEqual(mockRelacao);
    });

    it('deve retornar array vazio quando a relação não existe', async () => {
      (pool.execute as jest.Mock).mockResolvedValueOnce([[]]);
      
      const result = await NecessidadeEspecialAluno.findById(999);
      
      expect(pool.execute).toHaveBeenCalledWith(
        'SELECT * FROM Necessidade_Especial_e_Aluno WHERE id_necessidade_aluno = ?',
        [999]
      );
      expect(result).toEqual([]);
    });
  });

  // Teste de busca por ID do aluno
  describe('findByAlunoId', () => {
    it('deve encontrar necessidades relacionadas a um aluno', async () => {
      const mockNecessidades = [
        { 
          id_necessidade_aluno: 1, 
          id_aluno: 1, 
          id_necessidade: 2,
          descricao: 'Deficiência Visual'
        }
      ];
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockNecessidades]);
      
      const result = await NecessidadeEspecialAluno.findByAlunoId(1);
      
      expect(pool.execute).toHaveBeenCalledWith(
        expect.stringContaining('SELECT nea.*, ne.descricao'),
        [1]
      );
      expect(result).toEqual(mockNecessidades);
    });

    it('deve retornar array vazio quando não há necessidades para o aluno', async () => {
      (pool.execute as jest.Mock).mockResolvedValueOnce([[]]);
      
      const result = await NecessidadeEspecialAluno.findByAlunoId(999);
      
      expect(pool.execute).toHaveBeenCalledWith(
        expect.stringContaining('SELECT nea.*, ne.descricao'),
        [999]
      );
      expect(result).toEqual([]);
    });
  });

  // Teste de busca por ID da necessidade
  describe('findByNecessidadeId', () => {
    it('deve encontrar alunos relacionados a uma necessidade', async () => {
      const mockAlunos = [
        { 
          id_necessidade_aluno: 1, 
          id_aluno: 1, 
          id_necessidade: 2,
          nome_aluno: 'João Silva'
        }
      ];
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockAlunos]);
      
      const result = await NecessidadeEspecialAluno.findByNecessidadeId(2);
      
      expect(pool.execute).toHaveBeenCalledWith(
        expect.stringContaining('SELECT nea.*, a.nome as nome_aluno'),
        [2]
      );
      expect(result).toEqual(mockAlunos);
    });

    it('deve retornar array vazio quando não há alunos para a necessidade', async () => {
      (pool.execute as jest.Mock).mockResolvedValueOnce([[]]);
      
      const result = await NecessidadeEspecialAluno.findByNecessidadeId(999);
      
      expect(pool.execute).toHaveBeenCalledWith(
        expect.stringContaining('SELECT nea.*, a.nome as nome_aluno'),
        [999]
      );
      expect(result).toEqual([]);
    });
  });

  // Teste de busca de todas as relações
  describe('findAll', () => {
    it('deve retornar todas as relações necessidade-aluno', async () => {
      const mockRelacoes = [
        { id_necessidade_aluno: 1, id_aluno: 1, id_necessidade: 2 },
        { id_necessidade_aluno: 2, id_aluno: 3, id_necessidade: 2 }
      ];
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockRelacoes]);
      
      const result = await NecessidadeEspecialAluno.findAll();
      
      expect(pool.execute).toHaveBeenCalledWith('SELECT * FROM Necessidade_Especial_e_Aluno');
      expect(result).toEqual(mockRelacoes);
    });

    it('deve retornar array vazio quando não há relações', async () => {
      (pool.execute as jest.Mock).mockResolvedValueOnce([[]]);
      
      const result = await NecessidadeEspecialAluno.findAll();
      
      expect(pool.execute).toHaveBeenCalledWith('SELECT * FROM Necessidade_Especial_e_Aluno');
      expect(result).toEqual([]);
    });
  });

  // Teste de exclusão por ID
  describe('delete', () => {
    it('deve excluir uma relação necessidade-aluno pelo ID', async () => {
      const mockResult = { affectedRows: 1 };
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockResult]);
      
      const result = await NecessidadeEspecialAluno.delete(1);
      
      expect(pool.execute).toHaveBeenCalledWith(
        'DELETE FROM Necessidade_Especial_e_Aluno WHERE id_necessidade_aluno = ?',
        [1]
      );
      expect(result).toEqual(mockResult);
    });

    it('deve retornar affectedRows 0 quando a relação não existe', async () => {
      const mockResult = { affectedRows: 0 };
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockResult]);
      
      const result = await NecessidadeEspecialAluno.delete(999);
      
      expect(pool.execute).toHaveBeenCalledWith(
        'DELETE FROM Necessidade_Especial_e_Aluno WHERE id_necessidade_aluno = ?',
        [999]
      );
      expect(result).toEqual(mockResult);
    });
  });

  // Teste de exclusão por ID do aluno e ID da necessidade
  describe('deleteByAlunoAndNecessidade', () => {
    it('deve excluir uma relação pelos IDs de aluno e necessidade', async () => {
      const mockResult = { affectedRows: 1 };
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockResult]);
      
      const result = await NecessidadeEspecialAluno.deleteByAlunoAndNecessidade(1, 2);
      
      expect(pool.execute).toHaveBeenCalledWith(
        'DELETE FROM Necessidade_Especial_e_Aluno WHERE id_aluno = ? AND id_necessidade = ?',
        [1, 2]
      );
      expect(result).toEqual(mockResult);
    });

    it('deve retornar affectedRows 0 quando a relação não existe', async () => {
      const mockResult = { affectedRows: 0 };
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockResult]);
      
      const result = await NecessidadeEspecialAluno.deleteByAlunoAndNecessidade(999, 888);
      
      expect(pool.execute).toHaveBeenCalledWith(
        'DELETE FROM Necessidade_Especial_e_Aluno WHERE id_aluno = ? AND id_necessidade = ?',
        [999, 888]
      );
      expect(result).toEqual(mockResult);
    });
  });

  // Teste de relacionamentos
  describe('relacionamentos', () => {
    it('deve permitir integração com modelo Aluno', async () => {
      // Este teste simula como seria a integração com o modelo Aluno
      const mockAluno = {
        findById: jest.fn().mockResolvedValue([
          { id_aluno: 1, nome: 'João Silva' }
        ])
      };
      
      // Primeiro, encontramos uma relação
      const mockRelacao = [
        { id_necessidade_aluno: 1, id_aluno: 1, id_necessidade: 2 }
      ];
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockRelacao]);
      
      const relacao = await NecessidadeEspecialAluno.findById(1);
      
      // Depois, buscamos o aluno relacionado
      const aluno = await mockAluno.findById(relacao[0].id_aluno);
      
      expect(mockAluno.findById).toHaveBeenCalledWith(1);
      expect(aluno).toEqual([
        { id_aluno: 1, nome: 'João Silva' }
      ]);
    });

    it('deve permitir integração com modelo NecessidadeEspecial', async () => {
      // Este teste simula como seria a integração com o modelo NecessidadeEspecial
      const mockNecessidade = {
        findById: jest.fn().mockResolvedValue([
          { id_necessidade: 2, descricao: 'Deficiência Visual' }
        ])
      };
      
      // Primeiro, encontramos uma relação
      const mockRelacao = [
        { id_necessidade_aluno: 1, id_aluno: 1, id_necessidade: 2 }
      ];
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockRelacao]);
      
      const relacao = await NecessidadeEspecialAluno.findById(1);
      
      // Depois, buscamos a necessidade relacionada
      const necessidade = await mockNecessidade.findById(relacao[0].id_necessidade);
      
      expect(mockNecessidade.findById).toHaveBeenCalledWith(2);
      expect(necessidade).toEqual([
        { id_necessidade: 2, descricao: 'Deficiência Visual' }
      ]);
    });
  });
});

// tests/models/TecnologiaAluno.test.ts
import TecnologiaAluno from '../../models/TecnologiaAluno';
import pool from '../../config/database';

// Mock do módulo database
jest.mock('../../config/database', () => ({
  execute: jest.fn(),
}));

describe('TecnologiaAluno Model', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Teste de criação de instância
  describe('create', () => {
    it('deve criar uma nova relação tecnologia-aluno com sucesso', async () => {
      const mockResult = { affectedRows: 1, insertId: 1 };
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockResult]);
      
      const result = await TecnologiaAluno.create(1, 2);
      
      expect(pool.execute).toHaveBeenCalledWith(
        'INSERT INTO Tecnologia_e_Aluno (id_aluno, id_tecnologia) VALUES (?, ?)',
        [1, 2]
      );
      expect(result).toEqual(mockResult);
    });

    it('deve lançar erro quando os parâmetros são inválidos', async () => {
      (pool.execute as jest.Mock).mockRejectedValueOnce(new Error('Erro de banco de dados'));
      
      await expect(TecnologiaAluno.create(-1, 2)).rejects.toThrow();
    });
  });

  // Teste de busca por ID
  describe('findById', () => {
    it('deve encontrar uma relação tecnologia-aluno pelo ID', async () => {
      const mockRelacao = [
        { id_tecnologia_aluno: 1, id_aluno: 1, id_tecnologia: 2 }
      ];
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockRelacao]);
      
      const result = await TecnologiaAluno.findById(1);
      
      expect(pool.execute).toHaveBeenCalledWith(
        'SELECT * FROM Tecnologia_e_Aluno WHERE id_tecnologia_aluno = ?',
        [1]
      );
      expect(result).toEqual(mockRelacao);
    });

    it('deve retornar array vazio quando a relação não existe', async () => {
      (pool.execute as jest.Mock).mockResolvedValueOnce([[]]);
      
      const result = await TecnologiaAluno.findById(999);
      
      expect(pool.execute).toHaveBeenCalledWith(
        'SELECT * FROM Tecnologia_e_Aluno WHERE id_tecnologia_aluno = ?',
        [999]
      );
      expect(result).toEqual([]);
    });
  });

  // Teste de busca por ID do aluno
  describe('findByAlunoId', () => {
    it('deve encontrar tecnologias relacionadas a um aluno', async () => {
      const mockTecnologias = [
        { 
          id_tecnologia_aluno: 1, 
          id_aluno: 1, 
          id_tecnologia: 2,
          nome: 'Leitor de Tela',
          descricao: 'Software que lê o conteúdo da tela',
          tipo: 'Software'
        }
      ];
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockTecnologias]);
      
      const result = await TecnologiaAluno.findByAlunoId(1);
      
      expect(pool.execute).toHaveBeenCalledWith(
        expect.stringContaining('SELECT ta.*, t.nome, t.descricao, t.tipo'),
        [1]
      );
      expect(result).toEqual(mockTecnologias);
    });

    it('deve retornar array vazio quando não há tecnologias para o aluno', async () => {
      (pool.execute as jest.Mock).mockResolvedValueOnce([[]]);
      
      const result = await TecnologiaAluno.findByAlunoId(999);
      
      expect(pool.execute).toHaveBeenCalledWith(
        expect.stringContaining('SELECT ta.*, t.nome, t.descricao, t.tipo'),
        [999]
      );
      expect(result).toEqual([]);
    });
  });

  // Teste de busca por ID da tecnologia
  describe('findByTecnologiaId', () => {
    it('deve encontrar alunos relacionados a uma tecnologia', async () => {
      const mockAlunos = [
        { 
          id_tecnologia_aluno: 1, 
          id_aluno: 1, 
          id_tecnologia: 2,
          nome_aluno: 'João Silva'
        }
      ];
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockAlunos]);
      
      const result = await TecnologiaAluno.findByTecnologiaId(2);
      
      expect(pool.execute).toHaveBeenCalledWith(
        expect.stringContaining('SELECT ta.*, a.nome as nome_aluno'),
        [2]
      );
      expect(result).toEqual(mockAlunos);
    });

    it('deve retornar array vazio quando não há alunos para a tecnologia', async () => {
      (pool.execute as jest.Mock).mockResolvedValueOnce([[]]);
      
      const result = await TecnologiaAluno.findByTecnologiaId(999);
      
      expect(pool.execute).toHaveBeenCalledWith(
        expect.stringContaining('SELECT ta.*, a.nome as nome_aluno'),
        [999]
      );
      expect(result).toEqual([]);
    });
  });

  // Teste de busca de todas as relações
  describe('findAll', () => {
    it('deve retornar todas as relações tecnologia-aluno', async () => {
      const mockRelacoes = [
        { id_tecnologia_aluno: 1, id_aluno: 1, id_tecnologia: 2 },
        { id_tecnologia_aluno: 2, id_aluno: 3, id_tecnologia: 2 }
      ];
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockRelacoes]);
      
      const result = await TecnologiaAluno.findAll();
      
      expect(pool.execute).toHaveBeenCalledWith('SELECT * FROM Tecnologia_e_Aluno');
      expect(result).toEqual(mockRelacoes);
    });

    it('deve retornar array vazio quando não há relações', async () => {
      (pool.execute as jest.Mock).mockResolvedValueOnce([[]]);
      
      const result = await TecnologiaAluno.findAll();
      
      expect(pool.execute).toHaveBeenCalledWith('SELECT * FROM Tecnologia_e_Aluno');
      expect(result).toEqual([]);
    });
  });

  // Teste de exclusão por ID
  describe('delete', () => {
    it('deve excluir uma relação tecnologia-aluno pelo ID', async () => {
      const mockResult = { affectedRows: 1 };
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockResult]);
      
      const result = await TecnologiaAluno.delete(1);
      
      expect(pool.execute).toHaveBeenCalledWith(
        'DELETE FROM Tecnologia_e_Aluno WHERE id_tecnologia_aluno = ?',
        [1]
      );
      expect(result).toEqual(mockResult);
    });

    it('deve retornar affectedRows 0 quando a relação não existe', async () => {
      const mockResult = { affectedRows: 0 };
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockResult]);
      
      const result = await TecnologiaAluno.delete(999);
      
      expect(pool.execute).toHaveBeenCalledWith(
        'DELETE FROM Tecnologia_e_Aluno WHERE id_tecnologia_aluno = ?',
        [999]
      );
      expect(result).toEqual(mockResult);
    });
  });

  // Teste de exclusão por ID do aluno e ID da tecnologia
  describe('deleteByAlunoAndTecnologia', () => {
    it('deve excluir uma relação pelos IDs de aluno e tecnologia', async () => {
      const mockResult = { affectedRows: 1 };
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockResult]);
      
      const result = await TecnologiaAluno.deleteByAlunoAndTecnologia(1, 2);
      
      expect(pool.execute).toHaveBeenCalledWith(
        'DELETE FROM Tecnologia_e_Aluno WHERE id_aluno = ? AND id_tecnologia = ?',
        [1, 2]
      );
      expect(result).toEqual(mockResult);
    });

    it('deve retornar affectedRows 0 quando a relação não existe', async () => {
      const mockResult = { affectedRows: 0 };
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockResult]);
      
      const result = await TecnologiaAluno.deleteByAlunoAndTecnologia(999, 888);
      
      expect(pool.execute).toHaveBeenCalledWith(
        'DELETE FROM Tecnologia_e_Aluno WHERE id_aluno = ? AND id_tecnologia = ?',
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
        { id_tecnologia_aluno: 1, id_aluno: 1, id_tecnologia: 2 }
      ];
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockRelacao]);
      
      const relacao = await TecnologiaAluno.findById(1);
      
      // Depois, buscamos o aluno relacionado
      const aluno = await mockAluno.findById(relacao[0].id_aluno);
      
      expect(mockAluno.findById).toHaveBeenCalledWith(1);
      expect(aluno).toEqual([
        { id_aluno: 1, nome: 'João Silva' }
      ]);
    });

    it('deve permitir integração com modelo TecnologiaAssistiva', async () => {
      // Este teste simula como seria a integração com o modelo TecnologiaAssistiva
      const mockTecnologia = {
        findById: jest.fn().mockResolvedValue([
          { id_tecnologia: 2, nome: 'Leitor de Tela', tipo: 'Software' }
        ])
      };
      
      // Primeiro, encontramos uma relação
      const mockRelacao = [
        { id_tecnologia_aluno: 1, id_aluno: 1, id_tecnologia: 2 }
      ];
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockRelacao]);
      
      const relacao = await TecnologiaAluno.findById(1);
      
      // Depois, buscamos a tecnologia relacionada
      const tecnologia = await mockTecnologia.findById(relacao[0].id_tecnologia);
      
      expect(mockTecnologia.findById).toHaveBeenCalledWith(2);
      expect(tecnologia).toEqual([
        { id_tecnologia: 2, nome: 'Leitor de Tela', tipo: 'Software' }
      ]);
    });
  });
});

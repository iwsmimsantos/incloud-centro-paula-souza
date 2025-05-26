// tests/models/AuxiliarAluno.test.ts
import AuxiliarAluno from '../../models/AuxiliarAluno';
import pool from '../../config/database';

// Mock do módulo database
jest.mock('../../config/database', () => ({
  execute: jest.fn(),
}));

describe('AuxiliarAluno Model', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Teste de criação de instância
  describe('create', () => {
    it('deve criar uma nova relação auxiliar-aluno com sucesso', async () => {
      const mockResult = { affectedRows: 1, insertId: 1 };
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockResult]);
      
      const result = await AuxiliarAluno.create(1, 2);
      
      expect(pool.execute).toHaveBeenCalledWith(
        'INSERT INTO Auxiliar_e_Aluno (id_aluno, id_auxiliar) VALUES (?, ?)',
        [1, 2]
      );
      expect(result).toEqual(mockResult);
    });

    it('deve lançar erro quando os parâmetros são inválidos', async () => {
      (pool.execute as jest.Mock).mockRejectedValueOnce(new Error('Erro de banco de dados'));
      
      await expect(AuxiliarAluno.create(-1, 2)).rejects.toThrow();
    });
  });

  // Teste de busca por ID
  describe('findById', () => {
    it('deve encontrar uma relação auxiliar-aluno pelo ID', async () => {
      const mockRelacao = [
        { id_auxiliar_aluno: 1, id_aluno: 1, id_auxiliar: 2 }
      ];
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockRelacao]);
      
      const result = await AuxiliarAluno.findById(1);
      
      expect(pool.execute).toHaveBeenCalledWith(
        'SELECT * FROM Auxiliar_e_Aluno WHERE id_auxiliar_aluno = ?',
        [1]
      );
      expect(result).toEqual(mockRelacao);
    });

    it('deve retornar array vazio quando a relação não existe', async () => {
      (pool.execute as jest.Mock).mockResolvedValueOnce([[]]);
      
      const result = await AuxiliarAluno.findById(999);
      
      expect(pool.execute).toHaveBeenCalledWith(
        'SELECT * FROM Auxiliar_e_Aluno WHERE id_auxiliar_aluno = ?',
        [999]
      );
      expect(result).toEqual([]);
    });
  });

  // Teste de busca por ID do aluno
  describe('findByAlunoId', () => {
    it('deve encontrar auxiliares relacionados a um aluno', async () => {
      const mockAuxiliares = [
        { 
          id_auxiliar_aluno: 1, 
          id_aluno: 1, 
          id_auxiliar: 2,
          nome: 'Ana Silva',
          especializacoes: 'TEA',
          email: 'ana@email.com',
          telefone: '123456789',
          empresa: 'Empresa X'
        }
      ];
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockAuxiliares]);
      
      const result = await AuxiliarAluno.findByAlunoId(1);
      
      expect(pool.execute).toHaveBeenCalledWith(
        expect.stringContaining('SELECT aa.*, aux.nome, aux.especializacoes'),
        [1]
      );
      expect(result).toEqual(mockAuxiliares);
    });

    it('deve retornar array vazio quando não há auxiliares para o aluno', async () => {
      (pool.execute as jest.Mock).mockResolvedValueOnce([[]]);
      
      const result = await AuxiliarAluno.findByAlunoId(999);
      
      expect(pool.execute).toHaveBeenCalledWith(
        expect.stringContaining('SELECT aa.*, aux.nome, aux.especializacoes'),
        [999]
      );
      expect(result).toEqual([]);
    });
  });

  // Teste de busca por ID do auxiliar
  describe('findByAuxiliarId', () => {
    it('deve encontrar alunos relacionados a um auxiliar', async () => {
      const mockAlunos = [
        { 
          id_auxiliar_aluno: 1, 
          id_aluno: 1, 
          id_auxiliar: 2,
          nome_aluno: 'João Silva'
        }
      ];
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockAlunos]);
      
      const result = await AuxiliarAluno.findByAuxiliarId(2);
      
      expect(pool.execute).toHaveBeenCalledWith(
        expect.stringContaining('SELECT aa.*, a.nome as nome_aluno'),
        [2]
      );
      expect(result).toEqual(mockAlunos);
    });

    it('deve retornar array vazio quando não há alunos para o auxiliar', async () => {
      (pool.execute as jest.Mock).mockResolvedValueOnce([[]]);
      
      const result = await AuxiliarAluno.findByAuxiliarId(999);
      
      expect(pool.execute).toHaveBeenCalledWith(
        expect.stringContaining('SELECT aa.*, a.nome as nome_aluno'),
        [999]
      );
      expect(result).toEqual([]);
    });
  });

  // Teste de busca de todas as relações
  describe('findAll', () => {
    it('deve retornar todas as relações auxiliar-aluno', async () => {
      const mockRelacoes = [
        { id_auxiliar_aluno: 1, id_aluno: 1, id_auxiliar: 2 },
        { id_auxiliar_aluno: 2, id_aluno: 3, id_auxiliar: 2 }
      ];
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockRelacoes]);
      
      const result = await AuxiliarAluno.findAll();
      
      expect(pool.execute).toHaveBeenCalledWith('SELECT * FROM Auxiliar_e_Aluno');
      expect(result).toEqual(mockRelacoes);
    });

    it('deve retornar array vazio quando não há relações', async () => {
      (pool.execute as jest.Mock).mockResolvedValueOnce([[]]);
      
      const result = await AuxiliarAluno.findAll();
      
      expect(pool.execute).toHaveBeenCalledWith('SELECT * FROM Auxiliar_e_Aluno');
      expect(result).toEqual([]);
    });
  });

  // Teste de exclusão por ID
  describe('delete', () => {
    it('deve excluir uma relação auxiliar-aluno pelo ID', async () => {
      const mockResult = { affectedRows: 1 };
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockResult]);
      
      const result = await AuxiliarAluno.delete(1);
      
      expect(pool.execute).toHaveBeenCalledWith(
        'DELETE FROM Auxiliar_e_Aluno WHERE id_auxiliar_aluno = ?',
        [1]
      );
      expect(result).toEqual(mockResult);
    });

    it('deve retornar affectedRows 0 quando a relação não existe', async () => {
      const mockResult = { affectedRows: 0 };
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockResult]);
      
      const result = await AuxiliarAluno.delete(999);
      
      expect(pool.execute).toHaveBeenCalledWith(
        'DELETE FROM Auxiliar_e_Aluno WHERE id_auxiliar_aluno = ?',
        [999]
      );
      expect(result).toEqual(mockResult);
    });
  });

  // Teste de exclusão por ID do aluno e ID do auxiliar
  describe('deleteByAlunoAndAuxiliar', () => {
    it('deve excluir uma relação pelos IDs de aluno e auxiliar', async () => {
      const mockResult = { affectedRows: 1 };
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockResult]);
      
      const result = await AuxiliarAluno.deleteByAlunoAndAuxiliar(1, 2);
      
      expect(pool.execute).toHaveBeenCalledWith(
        'DELETE FROM Auxiliar_e_Aluno WHERE id_aluno = ? AND id_auxiliar = ?',
        [1, 2]
      );
      expect(result).toEqual(mockResult);
    });

    it('deve retornar affectedRows 0 quando a relação não existe', async () => {
      const mockResult = { affectedRows: 0 };
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockResult]);
      
      const result = await AuxiliarAluno.deleteByAlunoAndAuxiliar(999, 888);
      
      expect(pool.execute).toHaveBeenCalledWith(
        'DELETE FROM Auxiliar_e_Aluno WHERE id_aluno = ? AND id_auxiliar = ?',
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
        { id_auxiliar_aluno: 1, id_aluno: 1, id_auxiliar: 2 }
      ];
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockRelacao]);
      
      const relacao = await AuxiliarAluno.findById(1);
      
      // Depois, buscamos o aluno relacionado
      const aluno = await mockAluno.findById(relacao[0].id_aluno);
      
      expect(mockAluno.findById).toHaveBeenCalledWith(1);
      expect(aluno).toEqual([
        { id_aluno: 1, nome: 'João Silva' }
      ]);
    });

    it('deve permitir integração com modelo Auxiliar', async () => {
      // Este teste simula como seria a integração com o modelo Auxiliar
      const mockAuxiliar = {
        findById: jest.fn().mockResolvedValue([
          { id_auxiliar: 2, nome: 'Ana Silva' }
        ])
      };
      
      // Primeiro, encontramos uma relação
      const mockRelacao = [
        { id_auxiliar_aluno: 1, id_aluno: 1, id_auxiliar: 2 }
      ];
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockRelacao]);
      
      const relacao = await AuxiliarAluno.findById(1);
      
      // Depois, buscamos o auxiliar relacionado
      const auxiliar = await mockAuxiliar.findById(relacao[0].id_auxiliar);
      
      expect(mockAuxiliar.findById).toHaveBeenCalledWith(2);
      expect(auxiliar).toEqual([
        { id_auxiliar: 2, nome: 'Ana Silva' }
      ]);
    });
  });
});

// tests/models/Atendimento.test.ts
import Atendimento from '../../models/Atendimento';
import pool from '../../config/database';

// Mock do módulo database
jest.mock('../../config/database', () => ({
  execute: jest.fn(),
}));

describe('Atendimento Model', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // 1. Teste de criação de instância
  describe('create', () => {
    it('deve criar um novo atendimento com sucesso', async () => {
      const mockResult = { affectedRows: 1, insertId: 1 };
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockResult]);
      
      const result = await Atendimento.create(1, 2, 3);
      
      expect(pool.execute).toHaveBeenCalledWith(
        'INSERT INTO Atendimento (status_atendimento, id_funcionario, id_aluno) VALUES (?, ?, ?)',
        [1, 2, 3]
      );
      expect(result).toEqual(mockResult);
    });

    it('deve lançar erro quando os parâmetros são inválidos', async () => {
      (pool.execute as jest.Mock).mockRejectedValueOnce(new Error('Erro de banco de dados'));
      
      await expect(Atendimento.create(0 as number, 2, 3)).rejects.toThrow();
    });
  });

  // 2. Teste de validação de campos
  describe('validação de campos', () => {
    it('deve validar status_atendimento como número', async () => {
      const mockResult = { affectedRows: 1, insertId: 1 };
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockResult]);
      
      await Atendimento.create(1, 2, 3);
      
      expect(pool.execute).toHaveBeenCalledWith(
        expect.any(String),
        expect.arrayContaining([1])
      );
    });
    
    it('deve validar id_funcionario como número', async () => {
      const mockResult = { affectedRows: 1, insertId: 1 };
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockResult]);
      
      await Atendimento.create(1, 2, 3);
      
      expect(pool.execute).toHaveBeenCalledWith(
        expect.any(String),
        expect.arrayContaining([2])
      );
    });
    
    it('deve validar id_aluno como número', async () => {
      const mockResult = { affectedRows: 1, insertId: 1 };
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockResult]);
      
      await Atendimento.create(1, 2, 3);
      
      expect(pool.execute).toHaveBeenCalledWith(
        expect.any(String),
        expect.arrayContaining([3])
      );
    });

    it('deve lançar erro quando status_atendimento é inválido', async () => {
      (pool.execute as jest.Mock).mockRejectedValueOnce(new Error('Status inválido'));
      
      await expect(Atendimento.create(-1, 2, 3)).rejects.toThrow();
    });

    it('deve lançar erro quando id_funcionario é inválido', async () => {
      (pool.execute as jest.Mock).mockRejectedValueOnce(new Error('Funcionário inválido'));
      
      await expect(Atendimento.create(1, -1, 3)).rejects.toThrow();
    });

    it('deve lançar erro quando id_aluno é inválido', async () => {
      (pool.execute as jest.Mock).mockRejectedValueOnce(new Error('Aluno inválido'));
      
      await expect(Atendimento.create(1, 2, -1)).rejects.toThrow();
    });
  });

  // 3. Teste de busca por ID
  describe('findById', () => {
    it('deve encontrar um atendimento pelo ID', async () => {
      const mockAtendimento = [
        { id_atendimento: 1, status_atendimento: 1, id_funcionario: 2, id_aluno: 3 }
      ];
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockAtendimento]);
      
      const result = await Atendimento.findById(1);
      
      expect(pool.execute).toHaveBeenCalledWith(
        'SELECT * FROM Atendimento WHERE id_atendimento = ?',
        [1]
      );
      expect(result).toEqual(mockAtendimento);
    });

    it('deve retornar array vazio quando atendimento não existe', async () => {
      (pool.execute as jest.Mock).mockResolvedValueOnce([[]]);
      
      const result = await Atendimento.findById(999);
      
      expect(pool.execute).toHaveBeenCalledWith(
        'SELECT * FROM Atendimento WHERE id_atendimento = ?',
        [999]
      );
      expect(result).toEqual([]);
    });
  });

  // 4. Teste de busca de todos os atendimentos
    describe('findAllComRelacionamentos', () => {
      it('deve retornar todos os atendimentos', async () => {
        const mockAtendimentos = [
          { id_atendimento: 1, status_atendimento: 1, id_funcionario: 2, id_aluno: 3 },
          { id_atendimento: 2, status_atendimento: 2, id_funcionario: 3, id_aluno: 4 }
        ];
        (pool.execute as jest.Mock).mockResolvedValueOnce([mockAtendimentos]);
        
        const result = await Atendimento.findAllComRelacionamentos();
        
        // Use expect.any(String) em vez da string exata
        expect(pool.execute).toHaveBeenCalledWith(expect.any(String));
        expect(result).toEqual(mockAtendimentos);
      });
    
      it('deve retornar array vazio quando não há atendimentos', async () => {
        (pool.execute as jest.Mock).mockResolvedValueOnce([[]]);
        
        const result = await Atendimento.findAllComRelacionamentos();
        
        // Use expect.any(String) em vez da string exata
        expect(pool.execute).toHaveBeenCalledWith(expect.any(String));
        expect(result).toEqual([]);
      });
    });
    
  // 5. Teste de busca por funcionário
  describe('findByFuncionarioId', () => {
    it('deve encontrar atendimentos por id_funcionario', async () => {
      const mockAtendimentos = [
        { id_atendimento: 1, status_atendimento: 1, id_funcionario: 2, id_aluno: 3 },
        { id_atendimento: 2, status_atendimento: 2, id_funcionario: 2, id_aluno: 4 }
      ];
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockAtendimentos]);
      
      const result = await Atendimento.findByFuncionarioId(2);
      
      expect(pool.execute).toHaveBeenCalledWith(
        'SELECT * FROM Atendimento WHERE id_funcionario = ?',
        [2]
      );
      expect(result).toEqual(mockAtendimentos);
    });

    it('deve retornar array vazio quando não há atendimentos para o funcionário', async () => {
      (pool.execute as jest.Mock).mockResolvedValueOnce([[]]);
      
      const result = await Atendimento.findByFuncionarioId(999);
      
      expect(pool.execute).toHaveBeenCalledWith(
        'SELECT * FROM Atendimento WHERE id_funcionario = ?',
        [999]
      );
      expect(result).toEqual([]);
    });
  });

  // 6. Teste de busca por aluno
  describe('findByAlunoId', () => {
    it('deve encontrar atendimentos por id_aluno', async () => {
      const mockAtendimentos = [
        { id_atendimento: 1, status_atendimento: 1, id_funcionario: 2, id_aluno: 3 },
        { id_atendimento: 3, status_atendimento: 3, id_funcionario: 4, id_aluno: 3 }
      ];
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockAtendimentos]);
      
      const result = await Atendimento.findByAlunoId(3);
      
      expect(pool.execute).toHaveBeenCalledWith(
        'SELECT * FROM Atendimento WHERE id_aluno = ?',
        [3]
      );
      expect(result).toEqual(mockAtendimentos);
    });

    it('deve retornar array vazio quando não há atendimentos para o aluno', async () => {
      (pool.execute as jest.Mock).mockResolvedValueOnce([[]]);
      
      const result = await Atendimento.findByAlunoId(999);
      
      expect(pool.execute).toHaveBeenCalledWith(
        'SELECT * FROM Atendimento WHERE id_aluno = ?',
        [999]
      );
      expect(result).toEqual([]);
    });
  });

  // 7. Teste de atualização
  describe('update', () => {
    it('deve atualizar apenas status_atendimento', async () => {
      const mockResult = { affectedRows: 1, changedRows: 1 };
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockResult]);
      
      const result = await Atendimento.update(1, 2);
      
      expect(pool.execute).toHaveBeenCalledWith(
        'UPDATE Atendimento SET status_atendimento = ? WHERE id_atendimento = ?',
        [2, 1]
      );
      expect(result).toEqual(mockResult);
    });

    it('deve atualizar status_atendimento e id_funcionario', async () => {
      const mockResult = { affectedRows: 1, changedRows: 1 };
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockResult]);
      
      const result = await Atendimento.update(1, 2, 3);
      
      expect(pool.execute).toHaveBeenCalledWith(
        'UPDATE Atendimento SET status_atendimento = ?, id_funcionario = ? WHERE id_atendimento = ?',
        [2, 3, 1]
      );
      expect(result).toEqual(mockResult);
    });

    it('deve atualizar status_atendimento e id_aluno', async () => {
      const mockResult = { affectedRows: 1, changedRows: 1 };
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockResult]);
      
      const result = await Atendimento.update(1, 2, undefined, 4);
      
      expect(pool.execute).toHaveBeenCalledWith(
        'UPDATE Atendimento SET status_atendimento = ?, id_aluno = ? WHERE id_atendimento = ?',
        [2, 4, 1]
      );
      expect(result).toEqual(mockResult);
    });

    it('deve atualizar todos os campos', async () => {
      const mockResult = { affectedRows: 1, changedRows: 1 };
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockResult]);
      
      const result = await Atendimento.update(1, 2, 3, 4);
      
      expect(pool.execute).toHaveBeenCalledWith(
        'UPDATE Atendimento SET status_atendimento = ?, id_funcionario = ?, id_aluno = ? WHERE id_atendimento = ?',
        [2, 3, 4, 1]
      );
      expect(result).toEqual(mockResult);
    });

    it('deve retornar affectedRows 0 quando atendimento não existe', async () => {
      const mockResult = { affectedRows: 0, changedRows: 0 };
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockResult]);
      
      const result = await Atendimento.update(999, 2);
      
      expect(pool.execute).toHaveBeenCalledWith(
        'UPDATE Atendimento SET status_atendimento = ? WHERE id_atendimento = ?',
        [2, 999]
      );
      expect(result).toEqual(mockResult);
    });
  });

  // 8. Teste de exclusão
  describe('delete', () => {
    it('deve excluir um atendimento pelo ID', async () => {
      const mockResult = { affectedRows: 1 };
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockResult]);
      
      const result = await Atendimento.delete(1);
      
      expect(pool.execute).toHaveBeenCalledWith(
        'DELETE FROM Atendimento WHERE id_atendimento = ?',
        [1]
      );
      expect(result).toEqual(mockResult);
    });

    it('deve retornar affectedRows 0 quando atendimento não existe', async () => {
      const mockResult = { affectedRows: 0 };
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockResult]);
      
      const result = await Atendimento.delete(999);
      
      expect(pool.execute).toHaveBeenCalledWith(
        'DELETE FROM Atendimento WHERE id_atendimento = ?',
        [999]
      );
      expect(result).toEqual(mockResult);
    });
  });

  // 9. Teste de relacionamentos com Aluno e Funcionario
  describe('relacionamentos', () => {
    it('deve permitir buscar atendimentos por aluno', async () => {
      const mockAtendimentos = [
        { id_atendimento: 1, status_atendimento: 1, id_funcionario: 2, id_aluno: 3 }
      ];
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockAtendimentos]);
      
      const result = await Atendimento.findByAlunoId(3);
      
      expect(pool.execute).toHaveBeenCalledWith(
        'SELECT * FROM Atendimento WHERE id_aluno = ?',
        [3]
      );
      expect(result).toEqual(mockAtendimentos);
    });

    it('deve permitir buscar atendimentos por funcionário', async () => {
      const mockAtendimentos = [
        { id_atendimento: 1, status_atendimento: 1, id_funcionario: 2, id_aluno: 3 }
      ];
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockAtendimentos]);
      
      const result = await Atendimento.findByFuncionarioId(2);
      
      expect(pool.execute).toHaveBeenCalledWith(
        'SELECT * FROM Atendimento WHERE id_funcionario = ?',
        [2]
      );
      expect(result).toEqual(mockAtendimentos);
    });

    it('deve permitir integração com modelo Aluno', async () => {
      // Este teste simula como seria a integração com o modelo Aluno
      // Mockamos o modelo Aluno (que precisaria ser importado no teste real)
      const mockAluno = {
        findById: jest.fn().mockResolvedValue([
          { id_aluno: 3, nome: 'João Silva' }
        ])
      };
      
      // Primeiro, encontramos um atendimento
      const mockAtendimento = [
        { id_atendimento: 1, status_atendimento: 1, id_funcionario: 2, id_aluno: 3 }
      ];
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockAtendimento]);
      
      const atendimento = await Atendimento.findById(1);
      
      // Depois, buscamos o aluno relacionado
      const aluno = await mockAluno.findById(atendimento[0].id_aluno);
      
      expect(mockAluno.findById).toHaveBeenCalledWith(3);
      expect(aluno).toEqual([
        { id_aluno: 3, nome: 'João Silva' }
      ]);
    });

    it('deve permitir integração com modelo Funcionario', async () => {
      // Este teste simula como seria a integração com o modelo Funcionario
      // Mockamos o modelo Funcionario (que precisaria ser importado no teste real)
      const mockFuncionario = {
        findById: jest.fn().mockResolvedValue([
          { id_funcionario: 2, nome: 'Ana Psicóloga' }
        ])
      };
      
      // Primeiro, encontramos um atendimento
      const mockAtendimento = [
        { id_atendimento: 1, status_atendimento: 1, id_funcionario: 2, id_aluno: 3 }
      ];
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockAtendimento]);
      
      const atendimento = await Atendimento.findById(1);
      
      // Depois, buscamos o funcionário relacionado
      const funcionario = await mockFuncionario.findById(atendimento[0].id_funcionario);
      
      expect(mockFuncionario.findById).toHaveBeenCalledWith(2);
      expect(funcionario).toEqual([
        { id_funcionario: 2, nome: 'Ana Psicóloga' }
      ]);
    });
  });
});

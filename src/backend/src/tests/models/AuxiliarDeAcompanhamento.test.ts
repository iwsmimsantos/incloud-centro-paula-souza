// tests/models/AuxiliarDeAcompanhamento.test.ts
import AuxiliarDeAcompanhamento from '../../models/AuxiliarDeAcompanhamento';
import pool from '../../config/database';

// Mock do módulo database
jest.mock('../../config/database', () => ({
  execute: jest.fn(),
}));

describe('AuxiliarDeAcompanhamento Model', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Teste de criação de instância
  describe('create', () => {
    it('deve criar um novo auxiliar com sucesso (apenas com nome)', async () => {
      const mockResult = { affectedRows: 1, insertId: 1 };
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockResult]);
      
      const result = await AuxiliarDeAcompanhamento.create('Ana Silva');
      
      expect(pool.execute).toHaveBeenCalledWith(
        'INSERT INTO Auxiliar_de_Acompanhamento (nome, especializacoes, email, telefone, empresa) VALUES (?, ?, ?, ?, ?)',
        ['Ana Silva', undefined, undefined, undefined, undefined]
      );
      expect(result).toEqual(mockResult);
    });

    it('deve criar um auxiliar com todos os campos preenchidos', async () => {
      const mockResult = { affectedRows: 1, insertId: 1 };
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockResult]);
      
      const result = await AuxiliarDeAcompanhamento.create(
        'João Pereira',
        'TEA, TDAH',
        'joao@email.com',
        123456789,
        'Empresa X'
      );
      
      expect(pool.execute).toHaveBeenCalledWith(
        'INSERT INTO Auxiliar_de_Acompanhamento (nome, especializacoes, email, telefone, empresa) VALUES (?, ?, ?, ?, ?)',
        ['João Pereira', 'TEA, TDAH', 'joao@email.com', 123456789, 'Empresa X']
      );
      expect(result).toEqual(mockResult);
    });

    it('deve lançar erro quando os parâmetros são inválidos', async () => {
      (pool.execute as jest.Mock).mockRejectedValueOnce(new Error('Erro de banco de dados'));
      
      await expect(AuxiliarDeAcompanhamento.create('')).rejects.toThrow();
    });
  });

  // Teste de busca por ID
  describe('findById', () => {
    it('deve encontrar um auxiliar pelo ID', async () => {
      const mockAuxiliar = [
        {
          id_auxiliar: 1,
          nome: 'Ana Silva',
          especializacoes: 'TEA',
          email: 'ana@email.com',
          telefone: 123456789,
          empresa: 'Empresa X'
        }
      ];
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockAuxiliar]);
      
      const result = await AuxiliarDeAcompanhamento.findById(1);
      
      expect(pool.execute).toHaveBeenCalledWith(
        'SELECT * FROM Auxiliar_de_Acompanhamento WHERE id_auxiliar = ?',
        [1]
      );
      expect(result).toEqual(mockAuxiliar);
    });

    it('deve retornar array vazio quando o auxiliar não existe', async () => {
      (pool.execute as jest.Mock).mockResolvedValueOnce([[]]);
      
      const result = await AuxiliarDeAcompanhamento.findById(999);
      
      expect(pool.execute).toHaveBeenCalledWith(
        'SELECT * FROM Auxiliar_de_Acompanhamento WHERE id_auxiliar = ?',
        [999]
      );
      expect(result).toEqual([]);
    });
  });

  // Teste de busca de todos os auxiliares
  describe('findAll', () => {
    it('deve retornar todos os auxiliares', async () => {
      const mockAuxiliares = [
        { id_auxiliar: 1, nome: 'Ana Silva', especializacoes: 'TEA' },
        { id_auxiliar: 2, nome: 'João Pereira', especializacoes: 'TDAH' }
      ];
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockAuxiliares]);
      
      const result = await AuxiliarDeAcompanhamento.findAll();
      
      expect(pool.execute).toHaveBeenCalledWith('SELECT * FROM Auxiliar_de_Acompanhamento');
      expect(result).toEqual(mockAuxiliares);
    });

    it('deve retornar array vazio quando não há auxiliares', async () => {
      (pool.execute as jest.Mock).mockResolvedValueOnce([[]]);
      
      const result = await AuxiliarDeAcompanhamento.findAll();
      
      expect(pool.execute).toHaveBeenCalledWith('SELECT * FROM Auxiliar_de_Acompanhamento');
      expect(result).toEqual([]);
    });
  });

  // Teste de atualização
  describe('update', () => {
    it('deve atualizar um auxiliar existente', async () => {
      // Mock para o findById
      const mockAuxiliar = [
        {
          id_auxiliar: 1,
          nome: 'Ana Silva',
          especializacoes: 'TEA',
          email: 'ana@email.com',
          telefone: 123456789,
          empresa: 'Empresa X'
        }
      ];
      
      // Mock para o resultado do update
      const mockUpdateResult = {
        affectedRows: 1,
        changedRows: 1,
      };
      
      // Configurar os mocks
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockAuxiliar]); // Para o findById
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockUpdateResult]); // Para o update
      
      // Chamar o método update
      const result = await AuxiliarDeAcompanhamento.update(1, 'Ana Silva Atualizada');
      
      // Verificar se o método execute foi chamado corretamente
      expect(pool.execute).toHaveBeenNthCalledWith(
        1,
        'SELECT * FROM Auxiliar_de_Acompanhamento WHERE id_auxiliar = ?',
        [1]
      );
      
      expect(pool.execute).toHaveBeenNthCalledWith(
        2,
        expect.stringContaining('UPDATE Auxiliar_de_Acompanhamento SET'),
        expect.arrayContaining(['Ana Silva Atualizada', 'TEA', 'ana@email.com', 123456789, 'Empresa X', 1])
      );
      
      // Verificar o resultado
      expect(result).toEqual(mockUpdateResult);
    });

    it('deve atualizar vários campos do auxiliar', async () => {
      // Mock para o findById
      const mockAuxiliar = [
        {
          id_auxiliar: 1,
          nome: 'Ana Silva',
          especializacoes: 'TEA',
          email: 'ana@email.com',
          telefone: 123456789,
          empresa: 'Empresa X'
        }
      ];
      
      // Mock para o resultado do update
      const mockUpdateResult = {
        affectedRows: 1,
        changedRows: 1,
      };
      
      // Configurar os mocks
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockAuxiliar]); // Para o findById
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockUpdateResult]); // Para o update
      
      // Chamar o método update com vários campos
      const result = await AuxiliarDeAcompanhamento.update(
        1, 
        'Ana Silva Atualizada', 
        'TEA, TDAH', 
        'ana.nova@email.com'
      );
      
      // Verificar se o método execute foi chamado corretamente
      expect(pool.execute).toHaveBeenNthCalledWith(
        2,
        expect.stringContaining('UPDATE Auxiliar_de_Acompanhamento SET'),
        ['Ana Silva Atualizada', 'TEA, TDAH', 'ana.nova@email.com', 123456789, 'Empresa X', 1]
      );
      
      // Verificar o resultado
      expect(result).toEqual(mockUpdateResult);
    });

    it('deve lançar erro quando o auxiliar não existe', async () => {
      // Mock para o findById retornando array vazio
      (pool.execute as jest.Mock).mockResolvedValueOnce([[]]);
      
      // Verificar se o método lança um erro
      await expect(AuxiliarDeAcompanhamento.update(999, 'Nome Inexistente')).rejects.toThrow();
    });
  });

  // Teste de exclusão
  describe('delete', () => {
    it('deve excluir um auxiliar pelo ID', async () => {
      const mockDeleteResult = {
        affectedRows: 1,
      };
      
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockDeleteResult]);
      
      const result = await AuxiliarDeAcompanhamento.delete(1);
      
      expect(pool.execute).toHaveBeenCalledWith(
        'DELETE FROM Auxiliar_de_Acompanhamento WHERE id_auxiliar = ?',
        [1]
      );
      
      expect(result).toEqual(mockDeleteResult);
    });

    it('deve retornar affectedRows 0 quando o auxiliar não existe', async () => {
      const mockDeleteResult = {
        affectedRows: 0,
      };
      
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockDeleteResult]);
      
      const result = await AuxiliarDeAcompanhamento.delete(999);
      
      expect(pool.execute).toHaveBeenCalledWith(
        'DELETE FROM Auxiliar_de_Acompanhamento WHERE id_auxiliar = ?',
        [999]
      );
      
      expect(result).toEqual(mockDeleteResult);
    });
  });

  // Teste de relacionamentos
  describe('relacionamentos', () => {
    it('deve permitir integração com modelo AuxiliarAluno', async () => {
      // Este teste simula como seria a integração com o modelo AuxiliarAluno
      const mockAuxiliarAluno = {
        findByAuxiliarId: jest.fn().mockResolvedValue([
          { id_auxiliar_aluno: 1, id_aluno: 3, id_auxiliar: 1, nome_aluno: 'João Silva' }
        ])
      };
      
      // Primeiro, encontramos um auxiliar
      const mockAuxiliar = [
        { id_auxiliar: 1, nome: 'Ana Silva', especializacoes: 'TEA' }
      ];
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockAuxiliar]);
      
      const auxiliar = await AuxiliarDeAcompanhamento.findById(1);
      
      // Depois, buscamos os alunos relacionados ao auxiliar
      const alunosRelacionados = await mockAuxiliarAluno.findByAuxiliarId(auxiliar[0].id_auxiliar);
      
      expect(mockAuxiliarAluno.findByAuxiliarId).toHaveBeenCalledWith(1);
      expect(alunosRelacionados).toEqual([
        { id_auxiliar_aluno: 1, id_aluno: 3, id_auxiliar: 1, nome_aluno: 'João Silva' }
      ]);
    });
  });
});

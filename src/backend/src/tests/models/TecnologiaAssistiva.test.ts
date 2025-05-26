// tests/models/TecnologiaAssistiva.test.ts
import TecnologiaAssistiva from '../../models/TecnologiaAssistiva';
import pool from '../../config/database';

// Mock do módulo database
jest.mock('../../config/database', () => ({
  execute: jest.fn(),
}));

describe('TecnologiaAssistiva Model', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Teste de criação de instância
  describe('create', () => {
    it('deve criar uma nova tecnologia assistiva com sucesso (apenas com nome)', async () => {
      const mockResult = { affectedRows: 1, insertId: 1 };
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockResult]);
      
      const result = await TecnologiaAssistiva.create('Leitor de Tela');
      
      expect(pool.execute).toHaveBeenCalledWith(
        'INSERT INTO Tecnologia_Assistiva (nome, descricao, tipo) VALUES (?, ?, ?)',
        ['Leitor de Tela', undefined, undefined]
      );
      expect(result).toEqual(mockResult);
    });

    it('deve criar uma tecnologia assistiva com todos os campos preenchidos', async () => {
      const mockResult = { affectedRows: 1, insertId: 1 };
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockResult]);
      
      const result = await TecnologiaAssistiva.create(
        'Leitor de Tela', 
        'Software que lê o conteúdo da tela', 
        'Software'
      );
      
      expect(pool.execute).toHaveBeenCalledWith(
        'INSERT INTO Tecnologia_Assistiva (nome, descricao, tipo) VALUES (?, ?, ?)',
        ['Leitor de Tela', 'Software que lê o conteúdo da tela', 'Software']
      );
      expect(result).toEqual(mockResult);
    });

    it('deve lançar erro quando o nome é vazio', async () => {
      (pool.execute as jest.Mock).mockRejectedValueOnce(new Error('Erro de banco de dados'));
      
      await expect(TecnologiaAssistiva.create('')).rejects.toThrow();
    });
  });

  // Teste de busca por ID
  describe('findById', () => {
    it('deve encontrar uma tecnologia assistiva pelo ID', async () => {
      const mockTecnologia = [
        { 
          id_tecnologia: 1, 
          nome: 'Leitor de Tela', 
          descricao: 'Software que lê o conteúdo da tela', 
          tipo: 'Software' 
        }
      ];
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockTecnologia]);
      
      const result = await TecnologiaAssistiva.findById(1);
      
      expect(pool.execute).toHaveBeenCalledWith(
        'SELECT * FROM Tecnologia_Assistiva WHERE id_tecnologia = ?',
        [1]
      );
      expect(result).toEqual(mockTecnologia);
    });

    it('deve retornar array vazio quando a tecnologia não existe', async () => {
      (pool.execute as jest.Mock).mockResolvedValueOnce([[]]);
      
      const result = await TecnologiaAssistiva.findById(999);
      
      expect(pool.execute).toHaveBeenCalledWith(
        'SELECT * FROM Tecnologia_Assistiva WHERE id_tecnologia = ?',
        [999]
      );
      expect(result).toEqual([]);
    });
  });

  // Teste de busca de todas as tecnologias
  describe('findAll', () => {
    it('deve retornar todas as tecnologias assistivas', async () => {
      const mockTecnologias = [
        { id_tecnologia: 1, nome: 'Leitor de Tela', tipo: 'Software' },
        { id_tecnologia: 2, nome: 'Teclado Adaptado', tipo: 'Hardware' }
      ];
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockTecnologias]);
      
      const result = await TecnologiaAssistiva.findAll();
      
      expect(pool.execute).toHaveBeenCalledWith('SELECT * FROM Tecnologia_Assistiva');
      expect(result).toEqual(mockTecnologias);
    });

    it('deve retornar array vazio quando não há tecnologias', async () => {
      (pool.execute as jest.Mock).mockResolvedValueOnce([[]]);
      
      const result = await TecnologiaAssistiva.findAll();
      
      expect(pool.execute).toHaveBeenCalledWith('SELECT * FROM Tecnologia_Assistiva');
      expect(result).toEqual([]);
    });
  });

  // Teste de busca por tipo
  describe('findByTipo', () => {
    it('deve encontrar tecnologias por tipo', async () => {
      const mockTecnologias = [
        { id_tecnologia: 1, nome: 'Leitor de Tela', tipo: 'Software' },
        { id_tecnologia: 3, nome: 'Ampliador de Tela', tipo: 'Software' }
      ];
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockTecnologias]);
      
      const result = await TecnologiaAssistiva.findByTipo('Software');
      
      expect(pool.execute).toHaveBeenCalledWith(
        'SELECT * FROM Tecnologia_Assistiva WHERE tipo LIKE ?',
        ['%Software%']
      );
      expect(result).toEqual(mockTecnologias);
    });

    it('deve retornar array vazio quando não há tecnologias do tipo', async () => {
      (pool.execute as jest.Mock).mockResolvedValueOnce([[]]);
      
      const result = await TecnologiaAssistiva.findByTipo('Tipo Inexistente');
      
      expect(pool.execute).toHaveBeenCalledWith(
        'SELECT * FROM Tecnologia_Assistiva WHERE tipo LIKE ?',
        ['%Tipo Inexistente%']
      );
      expect(result).toEqual([]);
    });
  });

  // Teste de atualização
  describe('update', () => {
    it('deve atualizar uma tecnologia assistiva existente', async () => {
      // Mock para o findById
      const mockTecnologia = [
        {
          id_tecnologia: 1,
          nome: 'Leitor de Tela',
          descricao: 'Software que lê o conteúdo da tela',
          tipo: 'Software'
        }
      ];
      
      // Mock para o resultado do update
      const mockUpdateResult = {
        affectedRows: 1,
        changedRows: 1,
      };
      
      // Configurar os mocks
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockTecnologia]); // Para o findById
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockUpdateResult]); // Para o update
      
      // Chamar o método update
      const result = await TecnologiaAssistiva.update(1, 'Leitor de Tela Atualizado');
      
      // Verificar se o método execute foi chamado corretamente
      expect(pool.execute).toHaveBeenNthCalledWith(
        1,
        'SELECT * FROM Tecnologia_Assistiva WHERE id_tecnologia = ?',
        [1]
      );
      
      expect(pool.execute).toHaveBeenNthCalledWith(
        2,
        expect.stringContaining('UPDATE Tecnologia_Assistiva SET'),
        ['Leitor de Tela Atualizado', 'Software que lê o conteúdo da tela', 'Software', 1]
      );
      
      // Verificar o resultado
      expect(result).toEqual(mockUpdateResult);
    });

    it('deve atualizar vários campos da tecnologia', async () => {
      // Mock para o findById
      const mockTecnologia = [
        {
          id_tecnologia: 1,
          nome: 'Leitor de Tela',
          descricao: 'Software que lê o conteúdo da tela',
          tipo: 'Software'
        }
      ];
      
      // Mock para o resultado do update
      const mockUpdateResult = {
        affectedRows: 1,
        changedRows: 1,
      };
      
      // Configurar os mocks
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockTecnologia]); // Para o findById
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockUpdateResult]); // Para o update
      
      // Chamar o método update com vários campos
      const result = await TecnologiaAssistiva.update(
        1, 
        'Leitor de Tela Atualizado', 
        'Descrição atualizada', 
        'Software Atualizado'
      );
      
      // Verificar se o método execute foi chamado corretamente
      expect(pool.execute).toHaveBeenNthCalledWith(
        2,
        expect.stringContaining('UPDATE Tecnologia_Assistiva SET'),
        ['Leitor de Tela Atualizado', 'Descrição atualizada', 'Software Atualizado', 1]
      );
      
      // Verificar o resultado
      expect(result).toEqual(mockUpdateResult);
    });

    it('deve lançar erro quando a tecnologia não existe', async () => {
      // Mock para o findById retornando array vazio
      (pool.execute as jest.Mock).mockResolvedValueOnce([[]]);
      
      // Verificar se o método lança um erro
      await expect(TecnologiaAssistiva.update(999, 'Nome Inexistente')).rejects.toThrow();
    });
  });

  // Teste de exclusão
  describe('delete', () => {
    it('deve excluir uma tecnologia assistiva pelo ID', async () => {
      const mockDeleteResult = {
        affectedRows: 1,
      };
      
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockDeleteResult]);
      
      const result = await TecnologiaAssistiva.delete(1);
      
      expect(pool.execute).toHaveBeenCalledWith(
        'DELETE FROM Tecnologia_Assistiva WHERE id_tecnologia = ?',
        [1]
      );
      
      expect(result).toEqual(mockDeleteResult);
    });

    it('deve retornar affectedRows 0 quando a tecnologia não existe', async () => {
      const mockDeleteResult = {
        affectedRows: 0,
      };
      
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockDeleteResult]);
      
      const result = await TecnologiaAssistiva.delete(999);
      
      expect(pool.execute).toHaveBeenCalledWith(
        'DELETE FROM Tecnologia_Assistiva WHERE id_tecnologia = ?',
        [999]
      );
      
      expect(result).toEqual(mockDeleteResult);
    });
  });

  // Teste de relacionamentos
  describe('relacionamentos', () => {
    it('deve permitir integração com modelo TecnologiaAluno', async () => {
      // Este teste simula como seria a integração com o modelo TecnologiaAluno
      const mockTecnologiaAluno = {
        findByTecnologiaId: jest.fn().mockResolvedValue([
          { id_tecnologia_aluno: 1, id_aluno: 3, id_tecnologia: 1, nome_aluno: 'João Silva' }
        ])
      };
      
      // Primeiro, encontramos uma tecnologia
      const mockTecnologia = [
        { id_tecnologia: 1, nome: 'Leitor de Tela', tipo: 'Software' }
      ];
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockTecnologia]);
      
      const tecnologia = await TecnologiaAssistiva.findById(1);
      
      // Depois, buscamos os alunos relacionados à tecnologia
      const alunosRelacionados = await mockTecnologiaAluno.findByTecnologiaId(tecnologia[0].id_tecnologia);
      
      expect(mockTecnologiaAluno.findByTecnologiaId).toHaveBeenCalledWith(1);
      expect(alunosRelacionados).toEqual([
        { id_tecnologia_aluno: 1, id_aluno: 3, id_tecnologia: 1, nome_aluno: 'João Silva' }
      ]);
    });
  });
});

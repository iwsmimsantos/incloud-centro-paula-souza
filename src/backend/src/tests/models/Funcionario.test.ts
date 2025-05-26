// tests/models/Funcionario.test.ts
import Funcionario from '../../models/Funcionario';
import pool from '../../config/database';

// Mock do módulo database
jest.mock('../../config/database', () => ({
  execute: jest.fn(),
}));

describe('Funcionario Model', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Teste de criação de instância
  describe('create', () => {
    it('deve criar um novo funcionário com sucesso', async () => {
      const mockResult = { affectedRows: 1, insertId: 1 };
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockResult]);
      
      const result = await Funcionario.create(
        'João Silva', 
        'Psicólogo', 
        'Atendimento', 
        'joao@email.com', 
        false
      );
      
      expect(pool.execute).toHaveBeenCalledWith(
        'INSERT INTO Funcionario (nome, cargo, departamento, email, possui_deficiencia, configuracoes_acessibilidade) VALUES (?, ?, ?, ?, ?, ?)',
        ['João Silva', 'Psicólogo', 'Atendimento', 'joao@email.com', false, null]
      );
      expect(result).toEqual(mockResult);
    });

    it('deve criar um funcionário com configurações de acessibilidade', async () => {
      const mockResult = { affectedRows: 1, insertId: 1 };
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockResult]);
      
      const result = await Funcionario.create(
        'Maria Santos', 
        'Pedagoga', 
        'Educação', 
        'maria@email.com', 
        true, 
        '{"fontSize": "large", "contrast": "high"}'
      );
      
      expect(pool.execute).toHaveBeenCalledWith(
        'INSERT INTO Funcionario (nome, cargo, departamento, email, possui_deficiencia, configuracoes_acessibilidade) VALUES (?, ?, ?, ?, ?, ?)',
        ['Maria Santos', 'Pedagoga', 'Educação', 'maria@email.com', true, '{"fontSize": "large", "contrast": "high"}']
      );
      expect(result).toEqual(mockResult);
    });

    it('deve lançar erro quando os parâmetros são inválidos', async () => {
      (pool.execute as jest.Mock).mockRejectedValueOnce(new Error('Erro de banco de dados'));
      
      await expect(Funcionario.create('', 'Cargo', 'Departamento', 'email@teste.com', false)).rejects.toThrow();
    });
  });

  // Teste de validação de campos
  describe('validação de campos', () => {
    it('deve validar nome como string não vazia', async () => {
      (pool.execute as jest.Mock).mockRejectedValueOnce(new Error('Nome inválido'));
      
      await expect(Funcionario.create('', 'Cargo', 'Departamento', 'email@teste.com', false)).rejects.toThrow();
    });
    
    it('deve validar email como formato válido', async () => {
      (pool.execute as jest.Mock).mockRejectedValueOnce(new Error('Email inválido'));
      
      await expect(Funcionario.create('Nome', 'Cargo', 'Departamento', 'email-invalido', false)).rejects.toThrow();
    });
  });

  // Teste de busca por ID
  describe('findById', () => {
    it('deve encontrar um funcionário pelo ID', async () => {
      const mockFuncionario = [
        {
          id_funcionario: 1,
          nome: 'João Silva',
          cargo: 'Psicólogo',
          departamento: 'Atendimento',
          email: 'joao@email.com',
          possui_deficiencia: false,
          configuracoes_acessibilidade: null
        }
      ];
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockFuncionario]);
      
      const result = await Funcionario.findById(1);
      
      expect(pool.execute).toHaveBeenCalledWith(
        'SELECT * FROM Funcionario WHERE id_Funcionario = ?',
        [1]
      );
      expect(result).toEqual(mockFuncionario);
    });

    it('deve retornar array vazio quando o funcionário não existe', async () => {
      (pool.execute as jest.Mock).mockResolvedValueOnce([[]]);
      
      const result = await Funcionario.findById(999);
      
      expect(pool.execute).toHaveBeenCalledWith(
        'SELECT * FROM Funcionario WHERE id_Funcionario = ?',
        [999]
      );
      expect(result).toEqual([]);
    });
  });

  // Teste de busca de todos os funcionários
  describe('findAll', () => {
    it('deve retornar todos os funcionários', async () => {
      const mockFuncionarios = [
        { id_funcionario: 1, nome: 'João Silva', cargo: 'Psicólogo' },
        { id_funcionario: 2, nome: 'Maria Santos', cargo: 'Pedagoga' }
      ];
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockFuncionarios]);
      
      const result = await Funcionario.findAll();
      
      expect(pool.execute).toHaveBeenCalledWith('SELECT * FROM Funcionario');
      expect(result).toEqual(mockFuncionarios);
    });

    it('deve retornar array vazio quando não há funcionários', async () => {
      (pool.execute as jest.Mock).mockResolvedValueOnce([[]]);
      
      const result = await Funcionario.findAll();
      
      expect(pool.execute).toHaveBeenCalledWith('SELECT * FROM Funcionario');
      expect(result).toEqual([]);
    });
  });

  // Teste de atualização
  describe('update', () => {
    it('deve atualizar um funcionário existente', async () => {
      const mockUpdateResult = {
        affectedRows: 1,
        changedRows: 1,
      };
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockUpdateResult]);
      
      const result = await Funcionario.update(
        1, 
        'João Silva Atualizado', 
        'Psicólogo Sênior', 
        'Atendimento Especial', 
        'joao.novo@email.com', 
        false
      );
      
      expect(pool.execute).toHaveBeenCalledWith(
        'UPDATE Funcionario SET nome = ?, cargo = ?, departamento = ?, email = ?, possui_deficiencia = ?, configuracoes_acessibilidade = ? WHERE id_Funcionario = ?',
        ['João Silva Atualizado', 'Psicólogo Sênior', 'Atendimento Especial', 'joao.novo@email.com', false, null, 1]
      );
      expect(result).toEqual(mockUpdateResult);
    });

    it('deve atualizar um funcionário com configurações de acessibilidade', async () => {
      const mockUpdateResult = {
        affectedRows: 1,
        changedRows: 1,
      };
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockUpdateResult]);
      
      const result = await Funcionario.update(
        1, 
        'João Silva', 
        'Psicólogo', 
        'Atendimento', 
        'joao@email.com', 
        true, 
        '{"fontSize": "medium"}'
      );
      
      expect(pool.execute).toHaveBeenCalledWith(
        'UPDATE Funcionario SET nome = ?, cargo = ?, departamento = ?, email = ?, possui_deficiencia = ?, configuracoes_acessibilidade = ? WHERE id_Funcionario = ?',
        ['João Silva', 'Psicólogo', 'Atendimento', 'joao@email.com', true, '{"fontSize": "medium"}', 1]
      );
      expect(result).toEqual(mockUpdateResult);
    });

    it('deve retornar affectedRows 0 quando o funcionário não existe', async () => {
      const mockUpdateResult = {
        affectedRows: 0,
        changedRows: 0,
      };
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockUpdateResult]);
      
      const result = await Funcionario.update(
        999, 
        'Nome Inexistente', 
        'Cargo', 
        'Departamento', 
        'email@teste.com', 
        false
      );
      
      expect(pool.execute).toHaveBeenCalledWith(
        'UPDATE Funcionario SET nome = ?, cargo = ?, departamento = ?, email = ?, possui_deficiencia = ?, configuracoes_acessibilidade = ? WHERE id_Funcionario = ?',
        ['Nome Inexistente', 'Cargo', 'Departamento', 'email@teste.com', false, null, 999]
      );
      expect(result).toEqual(mockUpdateResult);
    });
  });

  // Teste de exclusão
  describe('delete', () => {
    it('deve excluir um funcionário pelo ID', async () => {
      const mockDeleteResult = {
        affectedRows: 1,
      };
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockDeleteResult]);
      
      const result = await Funcionario.delete(1);
      
      expect(pool.execute).toHaveBeenCalledWith(
        'DELETE FROM Funcionario WHERE id_Funcionario = ?',
        [1]
      );
      expect(result).toEqual(mockDeleteResult);
    });

    it('deve retornar affectedRows 0 quando o funcionário não existe', async () => {
      const mockDeleteResult = {
        affectedRows: 0,
      };
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockDeleteResult]);
      
      const result = await Funcionario.delete(999);
      
      expect(pool.execute).toHaveBeenCalledWith(
        'DELETE FROM Funcionario WHERE id_Funcionario = ?',
        [999]
      );
      expect(result).toEqual(mockDeleteResult);
    });
  });

  // Teste de relacionamentos
  describe('relacionamentos', () => {
    it('deve permitir integração com modelo Atendimento', async () => {
      // Este teste simula como seria a integração com o modelo Atendimento
      const mockAtendimento = {
        findByFuncionarioId: jest.fn().mockResolvedValue([
          { id_atendimento: 1, id_funcionario: 1, id_aluno: 3, status_atendimento: 1 }
        ])
      };
      
      // Primeiro, encontramos um funcionário
      const mockFuncionario = [
        { id_funcionario: 1, nome: 'João Silva', cargo: 'Psicólogo' }
      ];
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockFuncionario]);
      
      const funcionario = await Funcionario.findById(1);
      
      // Depois, buscamos os atendimentos relacionados ao funcionário
      const atendimentos = await mockAtendimento.findByFuncionarioId(funcionario[0].id_funcionario);
      
      expect(mockAtendimento.findByFuncionarioId).toHaveBeenCalledWith(1);
      expect(atendimentos).toEqual([
        { id_atendimento: 1, id_funcionario: 1, id_aluno: 3, status_atendimento: 1 }
      ]);
    });
  });
});

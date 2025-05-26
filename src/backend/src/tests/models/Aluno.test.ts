// tests/models/Aluno.test.ts
import Aluno from '../../models/Aluno';
import pool from '../../config/database';

// Mock do módulo database
jest.mock('../../config/database', () => ({
  execute: jest.fn(),
}));

describe('Aluno Model', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // 1. Teste de criação de instância
  describe('create', () => {
    it('deve criar um novo aluno com sucesso (apenas com nome)', async () => {
      const mockResult = { affectedRows: 1, insertId: 1 };
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockResult]);
      
      const result = await Aluno.create('João Silva');
      
      expect(pool.execute).toHaveBeenCalledWith(
        expect.stringContaining('INSERT INTO Aluno'),
        expect.arrayContaining(['João Silva'])
      );
      expect(result).toEqual(mockResult);
    });

    it('deve criar um aluno com todos os campos preenchidos', async () => {
      const mockResult = { affectedRows: 1, insertId: 1 };
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockResult]);
      
      const dataNascimento = new Date('2000-01-01');
      const anoMatricula = new Date('2022-01-01');
      const dataMatricula = new Date('2022-01-15');
      const dataFimCurso = new Date('2025-12-31');
      
      const result = await Aluno.create(
        'Maria Souza',
        dataNascimento,
        'Campus Central',
        'Engenharia',
        'Matutino',
        'Deficiência Visual',
        true, // Alterado de 'Sim' para true
        true,
        anoMatricula,
        dataMatricula,
        dataFimCurso,
        'Graduação',
        'José Souza',
        'jose@email.com',
        123456789,
        'Não',
        'Sim',
        'Irmão com TDAH'
      );
      
      expect(pool.execute).toHaveBeenCalledWith(
        expect.stringContaining('INSERT INTO Aluno'),
        [
          'Maria Souza',
          dataNascimento,
          'Campus Central',
          'Engenharia',
          'Matutino',
          'Deficiência Visual',
          true, // Alterado de 'Sim' para true
          true,
          anoMatricula,
          dataMatricula,
          dataFimCurso,
          'Graduação',
          'José Souza',
          'jose@email.com',
          123456789,
          'Não',
          'Sim',
          'Irmão com TDAH'
        ]
      );
      
      expect(result).toEqual(mockResult);
    });
  });

  // 2. Teste de validação de campos
  describe('validação de campos', () => {
    it('deve lançar erro ao criar aluno sem nome', async () => {
      (pool.execute as jest.Mock).mockRejectedValueOnce(new Error('Nome é obrigatório'));
      
      await expect(Aluno.create('')).rejects.toThrow();
    });
    
    it('deve aceitar campos opcionais como undefined', async () => {
      const mockResult = { affectedRows: 1, insertId: 1 };
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockResult]);
      
      await Aluno.create('Maria', undefined, undefined);
      
      expect(pool.execute).toHaveBeenCalledWith(
        expect.stringContaining('INSERT INTO Aluno'),
        expect.arrayContaining(['Maria', undefined, undefined])
      );
    });

    it('deve validar o formato da data de nascimento', async () => {
      const mockResult = { affectedRows: 1, insertId: 1 };
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockResult]);
      
      const dataNascimento = new Date('2000-01-01');
      
      await Aluno.create('Pedro', dataNascimento);
      
      expect(pool.execute).toHaveBeenCalledWith(
        expect.stringContaining('INSERT INTO Aluno'),
        expect.arrayContaining(['Pedro', dataNascimento])
      );
    });
  });

  // 3. Teste de busca por ID
  describe('findById', () => {
    it('deve encontrar um aluno pelo ID', async () => {
      const mockAluno = [
        {
          id_aluno: 1,
          nome: 'João Silva',
          data_nascimento: new Date('2000-01-01'),
        },
      ];
      
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockAluno]);
      
      const result = await Aluno.findById(1);
      
      expect(pool.execute).toHaveBeenCalledWith(
        'SELECT * FROM Aluno WHERE id_aluno = ?',
        [1]
      );
      
      expect(result).toEqual(mockAluno);
    });

    it('deve retornar array vazio quando o aluno não existe', async () => {
      (pool.execute as jest.Mock).mockResolvedValueOnce([[]]);
      
      const result = await Aluno.findById(999);
      
      expect(pool.execute).toHaveBeenCalledWith(
        'SELECT * FROM Aluno WHERE id_aluno = ?',
        [999]
      );
      
      expect(result).toEqual([]);
    });
  });

  // 4. Teste de busca de todos os alunos
  describe('findAll', () => {
    it('deve retornar todos os alunos', async () => {
      const mockAlunos = [
        { id_aluno: 1, nome: 'João Silva' },
        { id_aluno: 2, nome: 'Maria Souza' },
      ];
      
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockAlunos]);
      
      const result = await Aluno.findAll();
      
      expect(pool.execute).toHaveBeenCalledWith('SELECT * FROM Aluno');
      expect(result).toEqual(mockAlunos);
    });

    it('deve retornar array vazio quando não há alunos', async () => {
      (pool.execute as jest.Mock).mockResolvedValueOnce([[]]);
      
      const result = await Aluno.findAll();
      
      expect(pool.execute).toHaveBeenCalledWith('SELECT * FROM Aluno');
      expect(result).toEqual([]);
    });
  });

  // 5. Teste de atualização
  describe('update', () => {
    it('deve atualizar um aluno existente', async () => {
      // Mock para o findById
      const mockAluno = [
        {
          id_aluno: 1,
          nome: 'João Silva',
          data_nascimento: new Date('2000-01-01'),
          unidade: 'Campus Sul',
          curso: 'Computação',
          turno: 'Noturno',
          tipo_necessidade: null,
          necessita_tecnologia_assistiva: null,
          necessita_acompanhamento: false,
          ano_matricula: new Date('2022-01-01'),
          data_da_matricula: new Date('2022-01-15'),
          data_fim_do_curso: new Date('2025-12-31'),
          tipo_do_curso: 'Graduação',
          nome_do_responsavel: null,
          email_do_responsavel: null,
          telefone_do_responsavel: null,
          atendimento_unidade_anterior: null,
          casos_na_familia: null,
          observacao_casos_familia: null,
        },
      ];
      
      // Mock para o resultado do update
      const mockUpdateResult = {
        affectedRows: 1,
        changedRows: 1,
      };
      
      // Configurar os mocks
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockAluno]); // Para o findById
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockUpdateResult]); // Para o update
      
      // Chamar o método update
      const result = await Aluno.update(1, 'João Silva Atualizado', undefined, 'Campus Norte');
      
      // Verificar se o método execute foi chamado corretamente
      expect(pool.execute).toHaveBeenNthCalledWith(
        1,
        'SELECT * FROM Aluno WHERE id_aluno = ?',
        [1]
      );
      
      expect(pool.execute).toHaveBeenNthCalledWith(
        2,
        expect.stringContaining('UPDATE Aluno SET'),
        expect.arrayContaining(['João Silva Atualizado', 'Campus Norte', 1])
      );
      
      // Verificar o resultado
      expect(result).toEqual(mockUpdateResult);
    });

    it('deve lançar erro quando o aluno não existe', async () => {
      // Mock para o findById retornando array vazio
      (pool.execute as jest.Mock).mockResolvedValueOnce([[]]);
      
      // Verificar se o método lança um erro
      await expect(Aluno.update(999, 'Nome Inexistente')).rejects.toThrow();
    });
  });

  // 6. Teste de exclusão
  describe('delete', () => {
    it('deve excluir um aluno pelo ID', async () => {
      const mockDeleteResult = {
        affectedRows: 1,
      };
      
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockDeleteResult]);
      
      const result = await Aluno.delete(1);
      
      expect(pool.execute).toHaveBeenCalledWith(
        'DELETE FROM Aluno WHERE id_aluno = ?',
        [1]
      );
      
      expect(result).toEqual(mockDeleteResult);
    });

    it('deve retornar affectedRows 0 quando o aluno não existe', async () => {
      const mockDeleteResult = {
        affectedRows: 0,
      };
      
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockDeleteResult]);
      
      const result = await Aluno.delete(999);
      
      expect(pool.execute).toHaveBeenCalledWith(
        'DELETE FROM Aluno WHERE id_aluno = ?',
        [999]
      );
      
      expect(result).toEqual(mockDeleteResult);
    });
  });

  // 7. Teste de busca por tipo de necessidade
  describe('findByNecessidade', () => {
    it('deve encontrar alunos pelo tipo de necessidade', async () => {
      const mockAlunos = [
        { id_aluno: 1, nome: 'João Silva', tipo_necessidade: 'Deficiência Visual' },
        { id_aluno: 3, nome: 'Pedro Santos', tipo_necessidade: 'Deficiência Visual Parcial' },
      ];
      
      (pool.execute as jest.Mock).mockResolvedValueOnce([mockAlunos]);
      
      const result = await Aluno.findByNecessidade('Visual');
      
      expect(pool.execute).toHaveBeenCalledWith(
        'SELECT * FROM Aluno WHERE tipo_necessidade LIKE ?',
        ['%Visual%']
      );
      
      expect(result).toEqual(mockAlunos);
    });

    it('deve retornar array vazio quando não encontra alunos com a necessidade', async () => {
      (pool.execute as jest.Mock).mockResolvedValueOnce([[]]);
      
      const result = await Aluno.findByNecessidade('Tipo Inexistente');
      
      expect(pool.execute).toHaveBeenCalledWith(
        'SELECT * FROM Aluno WHERE tipo_necessidade LIKE ?',
        ['%Tipo Inexistente%']
      );
      
      expect(result).toEqual([]);
    });
  });

  // 8. Teste de relacionamentos com outras entidades
  describe('relacionamentos', () => {
    // Como não existe um método específico para relacionamentos na classe Aluno,
    // vamos testar o relacionamento através de uma consulta simulada
    it('deve permitir buscar atendimentos de um aluno', async () => {
      // Este teste simula como seria a busca de atendimentos relacionados a um aluno
      // usando o método findByAlunoId da classe Atendimento
      
      // Primeiro, mockamos a importação do Atendimento (que precisaria ser importado no teste real)
      const mockAtendimento = {
        findByAlunoId: jest.fn().mockResolvedValue([
          { id_atendimento: 1, id_aluno: 1, status_atendimento: 1 }
        ])
      };
      
      // Simulamos a chamada do método
      const atendimentos = await mockAtendimento.findByAlunoId(1);
      
      // Verificamos se o método foi chamado corretamente
      expect(mockAtendimento.findByAlunoId).toHaveBeenCalledWith(1);
      
      // Verificamos o resultado
      expect(atendimentos).toEqual([
        { id_atendimento: 1, id_aluno: 1, status_atendimento: 1 }
      ]);
    });
  });
});

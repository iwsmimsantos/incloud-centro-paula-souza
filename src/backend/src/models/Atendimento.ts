import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import pool from '../config/database';

export default class Atendimento {
  static async create(
    status_atendimento: number,
    id_funcionario: number,
    id_aluno: number
  ): Promise<ResultSetHeader> {
    const query = `INSERT INTO Atendimento (status_atendimento, id_funcionario, id_aluno) VALUES (?, ?, ?)`;
    const [result] = await pool.execute<ResultSetHeader>(query, [
      status_atendimento,
      id_funcionario,
      id_aluno,
    ]);
    return result;
  }

  static async findById(id_atendimento: number): Promise<RowDataPacket[]> {
    const query = `SELECT * FROM Atendimento WHERE id_atendimento = ?`;
    const [rows] = await pool.execute<RowDataPacket[]>(query, [id_atendimento]);
    return rows;
  }

  static async findAllComRelacionamentos(): Promise<RowDataPacket[]> {
    const query = `
      SELECT 
        a.id_atendimento,
        a.status_atendimento,
        al.nome AS nome_aluno,
        f.nome AS nome_profissional,
        DATE_FORMAT(a.data_atendimento_inicio, '%d/%m/%Y') AS data_atendimento_inicio,
        DATE_FORMAT(a.data_atendimento_fim, '%d/%m/%Y') AS data_atendimento_fim
      FROM Atendimento a
      LEFT JOIN Aluno al ON a.id_aluno = al.id_aluno
      LEFT JOIN Funcionario f ON a.id_funcionario = f.id_funcionario
      ORDER BY a.id_atendimento DESC
    `;

    const [rows] = await pool.execute<RowDataPacket[]>(query);
    return rows;
  }

  static async findByFuncionarioId(
    id_funcionario: number
  ): Promise<RowDataPacket[]> {
    const query = `SELECT * FROM Atendimento WHERE id_funcionario = ?`;
    const [rows] = await pool.execute<RowDataPacket[]>(query, [id_funcionario]);
    return rows;
  }

  static async findByAlunoId(id_aluno: number): Promise<RowDataPacket[]> {
    const query = `SELECT * FROM Atendimento WHERE id_aluno = ?`;
    const [rows] = await pool.execute<RowDataPacket[]>(query, [id_aluno]);
    return rows;
  }

  static async update(
    id_atendimento: number,
    status_atendimento: number,
    id_funcionario?: number,
    id_aluno?: number
  ): Promise<ResultSetHeader> {
    let query = `UPDATE Atendimento SET status_atendimento = ?`;
    let params: any[] = [status_atendimento];

    if (id_funcionario) {
      query += `, id_funcionario = ?`;
      params.push(id_funcionario);
    }

    if (id_aluno) {
      query += `, id_aluno = ?`;
      params.push(id_aluno);
    }

    query += ` WHERE id_atendimento = ?`;
    params.push(id_atendimento);

    const [result] = await pool.execute<ResultSetHeader>(query, params);
    return result;
  }

  static async delete(id_atendimento: number): Promise<ResultSetHeader> {
    const query = `DELETE FROM Atendimento WHERE id_atendimento = ?`;
    const [result] = await pool.execute<ResultSetHeader>(query, [
      id_atendimento,
    ]);
    return result;
  }

  static async getTotalAtendimentos(): Promise<number> {
    const query = `SELECT COUNT(DISTINCT id_aluno) AS total FROM Atendimento`;
    const [rows]: any = await pool.execute(query);
    return rows[0]?.total || 0;
  }

  static async getTotalAtendimentosgeral(): Promise<number> {
    const query = `SELECT COUNT(*) AS total_atendimentos FROM Atendimento;`;
    const [rows]: any = await pool.execute(query);
    return rows[0]?.total_atendimentos || 0;
  }

  static async createComNomes(
    nome_aluno: string,
    nome_profissional: string,
    data_atendimento_inicio?: string,
    data_atendimento_fim?: string
  ): Promise<ResultSetHeader> {
    // Define um status padrão
    const status_atendimento = 1;  // 1 = Em andamento, por exemplo
    
    // Primeiro insere o registro básico
    const query = `
      INSERT INTO Atendimento (status_atendimento, data_atendimento_inicio, data_atendimento_fim)
      VALUES (?, ?, ?)
    `;
    
    const [result] = await pool.execute<ResultSetHeader>(query, [
      status_atendimento,
      data_atendimento_inicio || null,
      data_atendimento_fim || null
    ]);
    
    const id_atendimento = result.insertId;
    
    // Depois atualiza com os IDs corretos
    if (nome_aluno || nome_profissional) {
      let updates = [];
      let params = [];
      
      if (nome_aluno) {
        updates.push(`id_aluno = (SELECT id_aluno FROM Aluno WHERE nome = ? LIMIT 1)`);
        params.push(nome_aluno);
      }
      
      if (nome_profissional) {
        updates.push(`id_funcionario = (SELECT id_funcionario FROM Funcionario WHERE nome = ? LIMIT 1)`);
        params.push(nome_profissional);
      }
      
      if (updates.length > 0) {
        const updateQuery = `UPDATE Atendimento SET ${updates.join(', ')} WHERE id_atendimento = ?`;
        params.push(id_atendimento);
        await pool.execute(updateQuery, params);
      }
    }
    
    return result;
  }
  
  static async getAtendimentosPorMes(): Promise<any[]> {
    try {
      const query = `
        SELECT 
          MONTH(data_atendimento_inicio) as mes,
          COUNT(*) as quantidade
        FROM 
          Atendimento
        WHERE 
          data_atendimento_inicio IS NOT NULL
        GROUP BY 
          MONTH(data_atendimento_inicio)
        ORDER BY 
          mes
      `;
      
      const [rows] = await pool.execute(query);
      return rows as any[];
    } catch (error) {
      console.error('Erro ao buscar atendimentos por mês:', error);
      throw error;
    }
  }


  static async getAllAlunos(): Promise<RowDataPacket[]> {
    const query = 'SELECT id_aluno, nome FROM Aluno ORDER BY nome';
    const [rows] = await pool.execute<RowDataPacket[]>(query);
    return rows;
  }
  
  static async getAllProfissionais(): Promise<RowDataPacket[]> {
    const query = 'SELECT id_funcionario, nome FROM Funcionario ORDER BY nome';
    const [rows] = await pool.execute<RowDataPacket[]>(query);
    return rows;
  }
  
  static async createComIds(
    id_aluno: number,
    id_funcionario: number,
    data_atendimento_inicio?: string,
    data_atendimento_fim?: string
  ): Promise<ResultSetHeader> {
    // Define um status padrão
    const status_atendimento = 1;  // 1 = Em andamento
    
    const query = `
      INSERT INTO Atendimento (status_atendimento, id_aluno, id_funcionario, data_atendimento_inicio, data_atendimento_fim)
      VALUES (?, ?, ?, ?, ?)
    `;
    
    const [result] = await pool.execute<ResultSetHeader>(query, [
      status_atendimento,
      id_aluno,
      id_funcionario,
      data_atendimento_inicio || null,
      data_atendimento_fim || null
    ]);
    
    return result;
  }
}

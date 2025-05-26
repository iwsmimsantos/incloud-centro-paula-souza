import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import pool from '../config/database';

export class NecessidadeEspecialAluno {
  static async create(
    id_aluno: number,
    id_necessidade: number
  ): Promise<ResultSetHeader> {
    const query = `INSERT INTO Necessidade_Especial_e_Aluno (id_aluno, id_necessidade) VALUES (?, ?)`;
    const [result] = await pool.execute<ResultSetHeader>(query, [
      id_aluno,
      id_necessidade,
    ]);
    return result;
  }

  static async findById(
    id_necessidade_aluno: number
  ): Promise<RowDataPacket[]> {
    const query = `SELECT * FROM Necessidade_Especial_e_Aluno WHERE id_necessidade_aluno = ?`;
    const [rows] = await pool.execute<RowDataPacket[]>(query, [
      id_necessidade_aluno,
    ]);
    return rows;
  }

  static async findByAlunoId(id_aluno: number): Promise<RowDataPacket[]> {
    const query = `
      SELECT nea.*, ne.descricao 
      FROM Necessidade_Especial_e_Aluno nea
      JOIN Necessidade_Especial ne ON nea.id_necessidade = ne.id_necessidade
      WHERE nea.id_aluno = ?
    `;
    const [rows] = await pool.execute<RowDataPacket[]>(query, [id_aluno]);
    return rows;
  }

  static async findByNecessidadeId(
    id_necessidade: number
  ): Promise<RowDataPacket[]> {
    const query = `
      SELECT nea.*, a.nome as nome_aluno
      FROM Necessidade_Especial_e_Aluno nea
      JOIN Aluno a ON nea.id_aluno = a.id_aluno
      WHERE nea.id_necessidade = ?
    `;
    const [rows] = await pool.execute<RowDataPacket[]>(query, [id_necessidade]);
    return rows;
  }

  static async findAll(): Promise<RowDataPacket[]> {
    const query = `SELECT * FROM Necessidade_Especial_e_Aluno`;
    const [rows] = await pool.execute<RowDataPacket[]>(query);
    return rows;
  }

  static async delete(id_necessidade_aluno: number): Promise<ResultSetHeader> {
    const query = `DELETE FROM Necessidade_Especial_e_Aluno WHERE id_necessidade_aluno = ?`;
    const [result] = await pool.execute<ResultSetHeader>(query, [
      id_necessidade_aluno,
    ]);
    return result;
  }

  static async deleteByAlunoAndNecessidade(
    id_aluno: number,
    id_necessidade: number
  ): Promise<ResultSetHeader> {
    const query = `DELETE FROM Necessidade_Especial_e_Aluno WHERE id_aluno = ? AND id_necessidade = ?`;
    const [result] = await pool.execute<ResultSetHeader>(query, [
      id_aluno,
      id_necessidade,
    ]);
    return result;
  }
}

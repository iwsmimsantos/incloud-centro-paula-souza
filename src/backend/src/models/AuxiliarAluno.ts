import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import pool from '../config/database';

export default class AuxiliarAluno {
  static async create(
    id_aluno: number,
    id_auxiliar: number
  ): Promise<ResultSetHeader> {
    const query = `INSERT INTO Auxiliar_e_Aluno (id_aluno, id_auxiliar) VALUES (?, ?)`;
    const [result] = await pool.execute<ResultSetHeader>(query, [
      id_aluno,
      id_auxiliar,
    ]);
    return result;
  }

  static async findById(id_auxiliar_aluno: number): Promise<RowDataPacket[]> {
    const query = `SELECT * FROM Auxiliar_e_Aluno WHERE id_auxiliar_aluno = ?`;
    const [rows] = await pool.execute<RowDataPacket[]>(query, [
      id_auxiliar_aluno,
    ]);
    return rows;
  }

  static async findByAlunoId(id_aluno: number): Promise<RowDataPacket[]> {
    const query = `
      SELECT aux.id_auxiliar, aux.nome
      FROM Auxiliar_e_Aluno aa
      JOIN Auxiliar_de_Acompanhamento aux ON aa.id_auxiliar = aux.id_auxiliar
      WHERE aa.id_aluno = ?
    `;
    const [rows] = await pool.execute<RowDataPacket[]>(query, [id_aluno]);
    return rows;
  }

  static async findByAuxiliarId(id_auxiliar: number): Promise<RowDataPacket[]> {
    const query = `
      SELECT aa.*, a.nome as nome_aluno
      FROM Auxiliar_e_Aluno aa
      JOIN Aluno a ON aa.id_aluno = a.id_aluno
      WHERE aa.id_auxiliar = ?
    `;
    const [rows] = await pool.execute<RowDataPacket[]>(query, [id_auxiliar]);
    return rows;
  }

  static async findAll(): Promise<RowDataPacket[]> {
    const query = `SELECT * FROM Auxiliar_e_Aluno`;
    const [rows] = await pool.execute<RowDataPacket[]>(query);
    return rows;
  }

  static async delete(id_auxiliar_aluno: number): Promise<ResultSetHeader> {
    const query = `DELETE FROM Auxiliar_e_Aluno WHERE id_auxiliar_aluno = ?`;
    const [result] = await pool.execute<ResultSetHeader>(query, [
      id_auxiliar_aluno,
    ]);
    return result;
  }

  static async deleteByAlunoAndAuxiliar(
    id_aluno: number,
    id_auxiliar: number
  ): Promise<ResultSetHeader> {
    const query = `DELETE FROM Auxiliar_e_Aluno WHERE id_aluno = ? AND id_auxiliar = ?`;
    const [result] = await pool.execute<ResultSetHeader>(query, [
      id_aluno,
      id_auxiliar,
    ]);
    return result;
  }

  static async getTotalAcompanhamentos(): Promise<number> {
    try {
      const query =
        'SELECT COUNT(DISTINCT id_auxiliar_aluno) AS total_acompanhamentos FROM Auxiliar_e_Aluno';
      const [rows]: any = await pool.execute(query);
      console.log('Resultado da query:', rows);
      return rows[0]?.total_acompanhamentos || 0;
    } catch (error) {
      console.error('Erro ao buscar total de acompanhamentos:', error);
      return 0;
    }
  }
}
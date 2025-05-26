import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import pool from '../config/database';

export default class TecnologiaAluno {
  static async create(
    id_aluno: number,
    id_tecnologia: number
  ): Promise<ResultSetHeader> {
    const query = `INSERT INTO Tecnologia_e_Aluno (id_aluno, id_tecnologia) VALUES (?, ?)`;
    const [result] = await pool.execute<ResultSetHeader>(query, [
      id_aluno,
      id_tecnologia,
    ]);
    return result;
  }

  static async findById(id_tecnologia_aluno: number): Promise<RowDataPacket[]> {
    const query = `SELECT * FROM Tecnologia_e_Aluno WHERE id_tecnologia_aluno = ?`;
    const [rows] = await pool.execute<RowDataPacket[]>(query, [
      id_tecnologia_aluno,
    ]);
    return rows;
  }

  static async findByAlunoId(id_aluno: number): Promise<RowDataPacket[]> {
    const query = `
      SELECT ta.*, t.nome, t.descricao, t.tipo
      FROM Tecnologia_e_Aluno ta
      JOIN Tecnologia_Assistiva t ON ta.id_tecnologia = t.id_tecnologia
      WHERE ta.id_aluno = ?
    `;
    const [rows] = await pool.execute<RowDataPacket[]>(query, [id_aluno]);
    return rows;
  }

  static async findByTecnologiaId(
    id_tecnologia: number
  ): Promise<RowDataPacket[]> {
    const query = `
      SELECT ta.*, a.nome as nome_aluno
      FROM Tecnologia_e_Aluno ta
      JOIN Aluno a ON ta.id_aluno = a.id_aluno
      WHERE ta.id_tecnologia = ?
    `;
    const [rows] = await pool.execute<RowDataPacket[]>(query, [id_tecnologia]);
    return rows;
  }

  static async findAll(): Promise<RowDataPacket[]> {
    const query = `SELECT * FROM Tecnologia_e_Aluno`;
    const [rows] = await pool.execute<RowDataPacket[]>(query);
    return rows;
  }

  static async delete(id_tecnologia_aluno: number): Promise<ResultSetHeader> {
    const query = `DELETE FROM Tecnologia_e_Aluno WHERE id_tecnologia_aluno = ?`;
    const [result] = await pool.execute<ResultSetHeader>(query, [
      id_tecnologia_aluno,
    ]);
    return result;
  }

  static async deleteByAlunoAndTecnologia(
    id_aluno: number,
    id_tecnologia: number
  ): Promise<ResultSetHeader> {
    const query = `DELETE FROM Tecnologia_e_Aluno WHERE id_aluno = ? AND id_tecnologia = ?`;
    const [result] = await pool.execute<ResultSetHeader>(query, [
      id_aluno,
      id_tecnologia,
    ]);
    return result;
  }

  static async update(
    id: number,
    id_aluno: number,
    id_tecnologia: number
  ): Promise<ResultSetHeader> {
    const query = `
      UPDATE Tecnologia_e_Aluno 
      SET 
        id_aluno = ?, 
        id_tecnologia = ? 
      WHERE id_tecnologia_aluno = ?
    `;

    const [result] = await pool.execute<ResultSetHeader>(query, [
      id_aluno,
      id_tecnologia,
      id,
    ]);

    return result;
  }
}

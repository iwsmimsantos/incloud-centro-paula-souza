import { RowDataPacket, ResultSetHeader } from "mysql2/promise";
import pool from "../config/database";

export default class NecessidadeEspecial {
  static async create(
    descricao: string
  ): Promise<ResultSetHeader> {
    const query = `INSERT INTO Necessidade_Especial (descricao) VALUES (?)`;
    const [result] = await pool.execute<ResultSetHeader>(query, [descricao]);
    return result;
  }

  static async findById(id_necessidade: number): Promise<RowDataPacket[]> {
    const query = `SELECT * FROM Necessidade_Especial WHERE id_necessidade = ?`;
    const [rows] = await pool.execute<RowDataPacket[]>(query, [id_necessidade]);
    return rows;
  }

  static async findAll(): Promise<RowDataPacket[]> {
    const query = `SELECT * FROM Necessidade_Especial`;
    const [rows] = await pool.execute<RowDataPacket[]>(query);
    return rows;
  }

  static async update(
    id_necessidade: number,
    descricao: string
  ): Promise<ResultSetHeader> {
    const query = `UPDATE Necessidade_Especial SET descricao = ? WHERE id_necessidade = ?`;
    const [result] = await pool.execute<ResultSetHeader>(query, [
      descricao,
      id_necessidade
    ]);
    return result;
  }

  static async delete(id_necessidade: number): Promise<ResultSetHeader> {
    const query = `DELETE FROM Necessidade_Especial WHERE id_necessidade = ?`;
    const [result] = await pool.execute<ResultSetHeader>(query, [id_necessidade]);
    return result;
  }
}
import { RowDataPacket, ResultSetHeader } from "mysql2/promise";
import pool from "../config/database";

export default class Autenticacao {
  static async create(
    id_funcionario: number,
    nivel_acesso: number
  ): Promise<ResultSetHeader> {
    const query = `INSERT INTO Autenticação (id_funcionário, nivel_acesso) VALUES (?, ?)`;
    const [result] = await pool.execute<ResultSetHeader>(query, [
      id_funcionario,
      nivel_acesso
    ]);
    return result;
  }

  static async findById(id_autenticacao: number): Promise<RowDataPacket[]> {
    const query = `SELECT * FROM Autenticação WHERE id_autenticação = ?`;
    const [rows] = await pool.execute<RowDataPacket[]>(query, [id_autenticacao]);
    return rows;
  }

  static async findByFuncionarioId(id_funcionario: number): Promise<RowDataPacket[]> {
    const query = `SELECT * FROM Autenticação WHERE id_funcionário = ?`;
    const [rows] = await pool.execute<RowDataPacket[]>(query, [id_funcionario]);
    return rows;
  }

  static async findAll(): Promise<RowDataPacket[]> {
    const query = `SELECT * FROM Autenticação`;
    const [rows] = await pool.execute<RowDataPacket[]>(query);
    return rows;
  }

  static async update(
    id_autenticacao: number,
    nivel_acesso: number
  ): Promise<ResultSetHeader> {
    const query = `UPDATE Autenticação SET nivel_acesso = ? WHERE id_autenticação = ?`;
    const [result] = await pool.execute<ResultSetHeader>(query, [
      nivel_acesso,
      id_autenticacao
    ]);
    return result;
  }

  static async delete(id_autenticacao: number): Promise<ResultSetHeader> {
    const query = `DELETE FROM Autenticação WHERE id_autenticação = ?`;
    const [result] = await pool.execute<ResultSetHeader>(query, [id_autenticacao]);
    return result;
  }
}
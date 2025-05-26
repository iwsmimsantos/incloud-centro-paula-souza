import { RowDataPacket, ResultSetHeader } from "mysql2/promise";
import pool from "../config/database";

export default class LogDeAcoes {
  static async create(
    id_funcionario: number,
    descricao: string,
    data_hora: Date = new Date()
  ): Promise<ResultSetHeader> {
    const query = `INSERT INTO Log_de_Ações (id_funcionario, data_hora, descricao) VALUES (?, ?, ?)`;
    const [result] = await pool.execute<ResultSetHeader>(query, [
      id_funcionario,
      data_hora,
      descricao
    ]);
    return result;
  }

  static async findById(id_log: number): Promise<RowDataPacket[]> {
    const query = `SELECT * FROM Log_de_Ações WHERE id_log = ?`;
    const [rows] = await pool.execute<RowDataPacket[]>(query, [id_log]);
    return rows;
  }

  static async findByFuncionarioId(id_funcionario: number): Promise<RowDataPacket[]> {
    const query = `SELECT * FROM Log_de_Ações WHERE id_funcionario = ?`;
    const [rows] = await pool.execute<RowDataPacket[]>(query, [id_funcionario]);
    return rows;
  }

  static async findAll(): Promise<RowDataPacket[]> {
    const query = `SELECT * FROM Log_de_Ações`;
    const [rows] = await pool.execute<RowDataPacket[]>(query);
    return rows;
  }

  static async findByDateRange(startDate: Date, endDate: Date): Promise<RowDataPacket[]> {
    const query = `SELECT * FROM Log_de_Ações WHERE data_hora BETWEEN ? AND ?`;
    const [rows] = await pool.execute<RowDataPacket[]>(query, [startDate, endDate]);
    return rows;
  }

  static async delete(id_log: number): Promise<ResultSetHeader> {
    const query = `DELETE FROM Log_de_Ações WHERE id_log = ?`;
    const [result] = await pool.execute<ResultSetHeader>(query, [id_log]);
    return result;
  }
}
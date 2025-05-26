import { RowDataPacket, ResultSetHeader } from "mysql2/promise";
import pool from "../config/database";

interface FuncionarioData {
  id_funcionario?: number;
  nome: string;
  cargo: string;
  departamento: string;
  email: string;
  possui_deficiencia: boolean;
  configuracoes_acessibilidade?: string;
}

export default class Funcionario {
  static async create(
    nome: string,
    cargo: string,
    departamento: string,
    email: string,
    possui_deficiencia: boolean,
    configuracoes_acessibilidade?: string
  ): Promise<ResultSetHeader> {
    const query = `INSERT INTO Funcionario (nome, cargo, departamento, email, possui_deficiencia, configuracoes_acessibilidade) VALUES (?, ?, ?, ?, ?, ?)`;
    const [result] = await pool.execute<ResultSetHeader>(query, [
      nome,
      cargo,
      departamento,
      email,
      possui_deficiencia,
      configuracoes_acessibilidade || null,
    ]);
    return result;
  }

  static async findById(id_funcionario: number): Promise<RowDataPacket[]> {
    const query = `SELECT * FROM Funcionario WHERE id_Funcionario = ?`;
    const [rows] = await pool.execute<RowDataPacket[]>(query, [id_funcionario]);
    return rows;
  }

  static async findAll(): Promise<RowDataPacket[]> {
    const query = `SELECT * FROM Funcionario`;
    const [rows] = await pool.execute<RowDataPacket[]>(query);
    return rows;
  }

  static async update(
    id_funcionario: number,
    nome: string,
    cargo: string,
    departamento: string,
    email: string,
    possui_deficiencia: boolean,
    configuracoes_acessibilidade?: string
  ): Promise<ResultSetHeader> {
    const query = `UPDATE Funcionario SET nome = ?, cargo = ?, departamento = ?, email = ?, possui_deficiencia = ?, configuracoes_acessibilidade = ? WHERE id_Funcionario = ?`;
    const [result] = await pool.execute<ResultSetHeader>(query, [
      nome,
      cargo,
      departamento,
      email,
      possui_deficiencia,
      configuracoes_acessibilidade || null,
      id_funcionario,
    ]);
    return result;
  }

  static async delete(id_funcionario: number): Promise<ResultSetHeader> {
    const query = `DELETE FROM Funcionario WHERE id_Funcionario = ?`;
    const [result] = await pool.execute<ResultSetHeader>(query, [id_funcionario]);
    return result;
  }
}
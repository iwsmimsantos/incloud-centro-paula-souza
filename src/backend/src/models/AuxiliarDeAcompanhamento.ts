import { RowDataPacket, ResultSetHeader } from "mysql2/promise";
import pool from "../config/database";

interface AuxiliarRow extends RowDataPacket {
  id_auxiliar: number;
  nome: string;
  especializacoes: string | null;
  email: string | null;
  telefone: number | string | null;
  empresa: string | null;
}

export default class AuxiliarDeAcompanhamento {
  static async create(
    nome: string,
    especializacoes: string | null = null,
    email: string | null = null,
    telefone: number | string | null = null,
    empresa: string | null = null
  ): Promise<ResultSetHeader> {
    const query = `
      INSERT INTO Auxiliar_de_Acompanhamento 
      (nome, especializacoes, email, telefone, empresa) 
      VALUES (?, ?, ?, ?, ?)`;

    const values = [nome, especializacoes, email, telefone, empresa];
    const [result] = await pool.execute<ResultSetHeader>(query, values);
    return result;
  }

  static async findById(id_auxiliar: number): Promise<AuxiliarRow | null> {
    const query = `SELECT * FROM Auxiliar_de_Acompanhamento WHERE id_auxiliar = ?`;
    const [rows] = await pool.execute<AuxiliarRow[]>(query, [id_auxiliar]);
    return rows.length > 0 ? rows[0] : null;
  }

  static async findAll(): Promise<AuxiliarRow[]> {
    const query = `SELECT * FROM Auxiliar_de_Acompanhamento`;
    const [rows] = await pool.execute<AuxiliarRow[]>(query);
    return rows;
  }

  static async update(
    id_auxiliar: number,
    nome?: string,
    especializacoes?: string,
    email?: string,
    telefone?: number | string,
    empresa?: string
  ): Promise<ResultSetHeader> {
    const auxiliar = await this.findById(id_auxiliar);
    if (!auxiliar) throw new Error(`Auxiliar com id ${id_auxiliar} não encontrado.`);

    const query = `
      UPDATE Auxiliar_de_Acompanhamento SET 
        nome = ?, 
        especializacoes = ?, 
        email = ?, 
        telefone = ?, 
        empresa = ? 
      WHERE id_auxiliar = ?`;

    const [result] = await pool.execute<ResultSetHeader>(query, [
      nome ?? auxiliar.nome,
      especializacoes ?? auxiliar.especializacoes,
      email ?? auxiliar.email,
      telefone ?? auxiliar.telefone,
      empresa ?? auxiliar.empresa,
      id_auxiliar,
    ]);

    return result;
  }

  static async delete(id_auxiliar: number): Promise<ResultSetHeader> {
    const query = `DELETE FROM Auxiliar_de_Acompanhamento WHERE id_auxiliar = ?`;
    const [result] = await pool.execute<ResultSetHeader>(query, [id_auxiliar]);
    return result;
  }
}

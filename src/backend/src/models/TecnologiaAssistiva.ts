import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import pool from '../config/database';

export default class TecnologiaAssistiva {
  static async create(
    nome: string,
    descricao?: string,
    tipo?: string
  ): Promise<ResultSetHeader> {
    const query = `INSERT INTO Tecnologia_Assistiva (nome, descricao, tipo) VALUES (?, ?, ?)`;
    const [result] = await pool.execute<ResultSetHeader>(query, [
      nome,
      descricao,
      tipo,
    ]);
    return result;
  }

  static async findById(id_tecnologia: number): Promise<RowDataPacket[]> {
    const query = `SELECT * FROM Tecnologia_Assistiva WHERE id_tecnologia = ?`;
    const [rows] = await pool.execute<RowDataPacket[]>(query, [id_tecnologia]);
    return rows;
  }

  static async findAll(): Promise<RowDataPacket[]> {
    const query = `SELECT * FROM Tecnologia_Assistiva`;
    const [rows] = await pool.execute<RowDataPacket[]>(query);
    return rows;
  }

  static async findByTipo(tipo: string): Promise<RowDataPacket[]> {
    const query = `SELECT * FROM Tecnologia_Assistiva WHERE tipo LIKE ?`;
    const [rows] = await pool.execute<RowDataPacket[]>(query, [`%${tipo}%`]);
    return rows;
  }

  static async update(
    id_tecnologia: number,
    nome?: string,
    descricao?: string,
    tipo?: string
  ): Promise<ResultSetHeader> {
    // Buscar dados atuais da tecnologia
    const [currentTecnologia] = await this.findById(id_tecnologia);

    const query = `UPDATE Tecnologia_Assistiva SET 
                    nome = ?, 
                    descricao = ?, 
                    tipo = ? 
                  WHERE id_tecnologia = ?`;

    const [result] = await pool.execute<ResultSetHeader>(query, [
      nome ?? currentTecnologia.nome,
      descricao ?? currentTecnologia.descricao,
      tipo ?? currentTecnologia.tipo,
      id_tecnologia,
    ]);

    return result;
  }

  static async delete(id_tecnologia: number): Promise<ResultSetHeader> {
    const query = `DELETE FROM Tecnologia_Assistiva WHERE id_tecnologia = ?`;
    const [result] = await pool.execute<ResultSetHeader>(query, [
      id_tecnologia,
    ]);
    return result;
  }

  // TecnologiaAssistiva.ts
  static async getTotalTecnologias(): Promise<number> {
    try {
      const query =
        'SELECT COUNT(DISTINCT nome) AS total_tipos_tecnologias FROM Tecnologia_Assistiva';
      const [rows]: any = await pool.execute(query);
      console.log('Resultado da query:', rows); // Debug para ver o que o banco retorna
      return rows[0]?.total_tipos_tecnologias || 0;
    } catch (error) {
      console.error('Erro ao buscar total de tecnologias assistivas:', error);
      return 0;
    }
  }

  // Grafico de TecnologiaAssistiva.ts
  static async getCountByTipo(): Promise<RowDataPacket[]> {
    const query = `SELECT tipo, COUNT(*) as count FROM Tecnologia_Assistiva GROUP BY tipo`;
    const [rows] = await pool.execute<RowDataPacket[]>(query);
    return rows;
  }
}

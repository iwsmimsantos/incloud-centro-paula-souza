import pool from '../config/database';
import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';

interface Aluno {
  id_aluno: number;
  nome: string;
  data_nascimento?: string;
  unidade?: string;
  curso?: string;
  turno?: string;
  tipo_necessidade?: string;
  necessita_tecnologia_assistiva?: number;
  necessita_acompanhamento?: number;
  ano_matricula?: string;
  data_da_matricula?: string;
  data_fim_do_curso?: string;
  tipo_do_curso?: string;
  nome_do_responsavel?: string;
  email_do_responsavel?: string;
  telefone_do_responsavel?: string;
  atendimento_unidade_anterior?: string;
  casos_na_familia?: string;
  observacao_casos_familia?: string;
  auxiliares?: { id_auxiliar: number; nome: string }[]; // Adicionado para incluir auxiliares
}

class Aluno {
  static async findAll(): Promise<Aluno[]> {
    const [rows] = await pool.execute('SELECT * FROM Aluno');
    return rows as Aluno[];
  }

  static async findById(id: number): Promise<Aluno[]> {
    console.log(
      `[Aluno.findById] Executando query: SELECT * FROM Aluno WHERE id_aluno = ${id}`
    );
    const [rows] = await pool.execute(
      'SELECT * FROM Aluno WHERE id_aluno = ?',
      [id]
    );
    console.log(`[Aluno.findById] Linhas retornadas:`, rows);

    if (rows && Array.isArray(rows) && rows.length > 0) {
      const aluno = rows[0] as Aluno;
      // Buscar os auxiliares associados
      const [auxiliares] = await pool.execute(
        `SELECT aa.id_auxiliar, a.nome 
         FROM Auxiliar_e_Aluno aa 
         JOIN Auxiliar_de_Acompanhamento a ON aa.id_auxiliar = a.id_auxiliar 
         WHERE aa.id_aluno = ?`,
        [id]
      );
      console.log('[Aluno.findById] Auxiliares associados:', auxiliares);

      // Adicionar os auxiliares ao objeto do aluno
      aluno.auxiliares = auxiliares as { id_auxiliar: number; nome: string }[];
      return [aluno];
    }
    return [];
  }

  static async create(
    nome: string,
    data_nascimento?: string,
    unidade?: string,
    curso?: string,
    turno?: string,
    tipo_necessidade?: string,
    necessita_tecnologia_assistiva?: number,
    necessita_acompanhamento?: number,
    ano_matricula?: string,
    data_da_matricula?: string,
    data_fim_do_curso?: string,
    tipo_do_curso?: string,
    nome_do_responsavel?: string,
    email_do_responsavel?: string,
    telefone_do_responsavel?: string,
    atendimento_unidade_anterior?: string,
    casos_na_familia?: string,
    observacao_casos_familia?: string
  ): Promise<any> {
    console.log('[Aluno.create] Criando novo aluno:', {
      nome,
      data_nascimento,
      unidade,
      curso,
      turno,
    });

    const [result] = await pool.execute(
      `INSERT INTO Aluno (
        nome, data_nascimento, unidade, curso, turno, tipo_necessidade,
        necessita_tecnologia_assistiva, necessita_acompanhamento, ano_matricula,
        data_da_matricula, data_fim_do_curso, tipo_do_curso, nome_do_responsavel,
        email_do_responsavel, telefone_do_responsavel, atendimento_unidade_anterior,
        casos_na_familia, observacao_casos_familia
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        nome,
        data_nascimento || null,
        unidade || null,
        curso || null,
        turno || null,
        tipo_necessidade || null,
        necessita_tecnologia_assistiva || 0,
        necessita_acompanhamento || 0,
        ano_matricula || null,
        data_da_matricula || null,
        data_fim_do_curso || null,
        tipo_do_curso || null,
        nome_do_responsavel || null,
        email_do_responsavel || null,
        telefone_do_responsavel || null,
        atendimento_unidade_anterior || null,
        casos_na_familia || null,
        observacao_casos_familia || null,
      ]
    );
    console.log('[Aluno.create] Aluno criado com sucesso:', result);
    return result;
  }

  static async update(
    id: number,
    nome: string,
    data_nascimento?: string,
    unidade?: string,
    curso?: string,
    turno?: string,
    tipo_necessidade?: string,
    necessita_tecnologia_assistiva?: number,
    necessita_acompanhamento?: number,
    ano_matricula?: string,
    data_da_matricula?: string,
    data_fim_do_curso?: string,
    tipo_do_curso?: string,
    nome_do_responsavel?: string,
    email_do_responsavel?: string,
    telefone_do_responsavel?: string,
    atendimento_unidade_anterior?: string,
    casos_na_familia?: string,
    observacao_casos_familia?: string
  ): Promise<any> {
    console.log('[Aluno.update] Atualizando aluno com ID:', id);
    console.log('[Aluno.update] Dados recebidos:', {
      nome,
      data_nascimento,
      unidade,
      curso,
      turno,
      tipo_necessidade,
      necessita_tecnologia_assistiva,
      necessita_acompanhamento,
      ano_matricula,
      data_da_matricula,
      data_fim_do_curso,
      tipo_do_curso,
      nome_do_responsavel,
      email_do_responsavel,
      telefone_do_responsavel,
      atendimento_unidade_anterior,
      casos_na_familia,
      observacao_casos_familia,
    });

    const query = `
      UPDATE Aluno SET
        nome = ?, data_nascimento = ?, unidade = ?, curso = ?, turno = ?,
        tipo_necessidade = ?, necessita_tecnologia_assistiva = ?, necessita_acompanhamento = ?,
        ano_matricula = ?, data_da_matricula = ?, data_fim_do_curso = ?, tipo_do_curso = ?,
        nome_do_responsavel = ?, email_do_responsavel = ?, telefone_do_responsavel = ?,
        atendimento_unidade_anterior = ?, casos_na_familia = ?, observacao_casos_familia = ?
      WHERE id_aluno = ?
    `;
    const values = [
      nome,
      data_nascimento || null,
      unidade || null,
      curso || null,
      turno || null,
      tipo_necessidade || null,
      necessita_tecnologia_assistiva ?? 0,
      necessita_acompanhamento ?? 0,
      ano_matricula || null,
      data_da_matricula || null,
      data_fim_do_curso || null,
      tipo_do_curso || null,
      nome_do_responsavel || null,
      email_do_responsavel || null,
      telefone_do_responsavel || null,
      atendimento_unidade_anterior || null,
      casos_na_familia || null,
      observacao_casos_familia || null,
      id,
    ];

    console.log('[Aluno.update] Query:', query);
    console.log('[Aluno.update] Valores:', values);
    const [result] = await pool.execute(query, values);
    console.log('[Aluno.update] Aluno atualizado com sucesso:', result);
    return result;
  }

  static async clearAuxiliares(id_aluno: number): Promise<void> {
    console.log(
      `[Aluno.clearAuxiliares] Removendo associações de auxiliares para o aluno com ID: ${id_aluno}`
    );
    const query = `DELETE FROM Auxiliar_e_Aluno WHERE id_aluno = ?`;
    await pool.execute(query, [id_aluno]);
    console.log('[Aluno.clearAuxiliares] Associações removidas com sucesso');
  }

  static async associateAuxiliares(
    id_aluno: number,
    auxiliares: number[]
  ): Promise<void> {
    console.log(
      `[Aluno.associateAuxiliares] Associando auxiliares ao aluno com ID: ${id_aluno}`,
      auxiliares
    );
    if (auxiliares && auxiliares.length > 0) {
      const query = `INSERT INTO Auxiliar_e_Aluno (id_aluno, id_auxiliar) VALUES (?, ?)`;
      for (const id_auxiliar of auxiliares) {
        console.log(
          `[Aluno.associateAuxiliares] Associando auxiliar ${id_auxiliar} ao aluno ${id_aluno}`
        );
        await pool.execute(query, [id_aluno, id_auxiliar]);
      }
      console.log(
        '[Aluno.associateAuxiliares] Auxiliares associados com sucesso'
      );
    } else {
      console.log('[Aluno.associateAuxiliares] Nenhum auxiliar para associar');
    }
  }

  //Grafico necessidade especial

  static async getStatistics() {
    const query = `
    SELECT tipo_necessidade, COUNT(id_aluno) AS total
    FROM Aluno
    WHERE tipo_necessidade IS NOT NULL
    GROUP BY tipo_necessidade
    ORDER BY total DESC
  `;

    const [results] = await pool.execute<RowDataPacket[]>(query);
    return results;
  }

  static async delete(id: number): Promise<any> {
    const [result] = await pool.execute(
      'DELETE FROM Aluno WHERE id_aluno = ?',
      [id]
    );
    return result;
  }

  static async findByField(field: string, value: any): Promise<Aluno[]> {
    const [rows] = await pool.execute(
      `SELECT * FROM Aluno WHERE ${field} = ?`,
      [value]
    );
    return rows as Aluno[];
  }

  static async countByField(field: string, value: any): Promise<number> {
    const [rows] = await pool.execute(
      `SELECT COUNT(*) as count FROM Aluno WHERE ${field} = ?`,
      [value]
    );
    return (rows as any[])[0].count;
  }

  static async countAll(): Promise<number> {
    const [rows] = await pool.execute('SELECT COUNT(*) as count FROM Aluno');
    return (rows as any[])[0].count;
  }

  static async findAllCourses(): Promise<any[]> {
    const [rows] = await pool.execute('SELECT DISTINCT curso FROM Aluno');
    return rows as any[];
  }

  static async findAllUnidades(): Promise<any[]> {
    const [rows] = await pool.execute('SELECT DISTINCT unidade FROM Aluno');
    return rows as any[];
  }
}

export default Aluno;

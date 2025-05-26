import { Request, Response } from 'express';
import Aluno from '../models/Aluno';
import pool from '../config/database';

export const getAlunos = async (req: Request, res: Response) => {
  try {
    const alunos = await Aluno.findAll();
    res.json(alunos);
  } catch (error) {
    console.error('Erro ao buscar alunos:', error);
    res.status(500).json({ message: 'Erro ao buscar alunos' });
  }
};

export const getAlunoById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    console.log(`[getAlunoById] Buscando aluno com ID: ${id}`);
    const aluno = await Aluno.findById(id);
    console.log(`[getAlunoById] Resultado da busca:`, aluno);
    if (aluno && Array.isArray(aluno) && aluno.length > 0) {
      console.log(`[getAlunoById] Aluno encontrado:`, aluno[0]);
      res.json(aluno[0]);
    } else {
      console.log(`[getAlunoById] Aluno com ID ${id} não encontrado`);
      res.status(404).json({ message: 'Aluno não encontrado' });
    }
  } catch (error) {
    console.error('[getAlunoById] Erro ao buscar aluno:', error);
    res.status(500).json({ message: 'Erro ao buscar aluno' });
  }
};

export const createAluno = async (req: Request, res: Response) => {
  try {
    const {
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
      auxiliares,
    } = req.body;

    console.log('[createAluno] Dados recebidos:', req.body);

    const result = await Aluno.create(
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
      observacao_casos_familia
    );

    if (result && 'insertId' in result) {
      if (auxiliares && Array.isArray(auxiliares) && auxiliares.length > 0) {
        console.log(
          '[createAluno] Associando auxiliares ao novo aluno:',
          auxiliares
        );
        await Aluno.associateAuxiliares(result.insertId, auxiliares);
      } else {
        console.log(
          '[createAluno] Nenhum auxiliar para associar ao novo aluno.'
        );
      }

      const novoAluno = await Aluno.findById(result.insertId);
      console.log('[createAluno] Novo aluno criado:', novoAluno[0]);
      res.status(201).json(novoAluno[0]);
    } else {
      console.log('[createAluno] Erro ao criar aluno: Resultado inesperado');
      res.status(400).json({ message: 'Erro ao criar aluno' });
    }
  } catch (error) {
    console.error('[createAluno] Erro ao criar aluno:', error);
    res.status(500).json({ message: 'Erro ao criar aluno' });
  }
};

export const updateAluno = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    console.log('[updateAluno] ID do aluno:', id);

    const aluno = await Aluno.findById(id);
    console.log('[updateAluno] Aluno encontrado:', aluno);

    if (aluno && Array.isArray(aluno) && aluno.length > 0) {
      const {
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
        auxiliares, // Pode ou não estar presente no req.body
      } = req.body;

      console.log('[updateAluno] Dados recebidos para atualização:', req.body);

      if (!nome) {
        res.status(400).json({ message: 'O campo "nome" é obrigatório' });
        return;
      }

      const necessitaTecnologiaAssistiva =
        necessita_tecnologia_assistiva === true
          ? 1
          : necessita_tecnologia_assistiva === false
            ? 0
            : necessita_tecnologia_assistiva;
      const necessitaAcompanhamento =
        necessita_acompanhamento === true
          ? 1
          : necessita_acompanhamento === false
            ? 0
            : necessita_acompanhamento;

      // Atualizar os campos do aluno
      await Aluno.update(
        id,
        nome,
        data_nascimento,
        unidade,
        curso,
        turno,
        tipo_necessidade,
        necessitaTecnologiaAssistiva,
        necessitaAcompanhamento,
        ano_matricula,
        data_da_matricula,
        data_fim_do_curso,
        tipo_do_curso,
        nome_do_responsavel,
        email_do_responsavel,
        telefone_do_responsavel,
        atendimento_unidade_anterior,
        casos_na_familia,
        observacao_casos_familia
      );

      // Atualizar os auxiliares SOMENTE se o campo "auxiliares" estiver presente no req.body
      if (auxiliares !== undefined) {
        console.log(
          '[updateAluno] Campo "auxiliares" presente no req.body:',
          auxiliares
        );

        // Limpar os auxiliares existentes apenas se o campo "auxiliares" foi enviado
        console.log('[updateAluno] Limpando associações existentes...');
        await Aluno.clearAuxiliares(id);
        console.log('[updateAluno] Associações existentes limpas com sucesso');

        // Se auxiliares foi enviado e é um array não vazio, associar os novos auxiliares
        if (Array.isArray(auxiliares) && auxiliares.length > 0) {
          console.log(
            '[updateAluno] Verificando auxiliares existentes:',
            auxiliares
          );
          const [existingAuxiliares] = await pool.execute(
            `SELECT id_auxiliar FROM Auxiliar_de_Acompanhamento WHERE id_auxiliar IN (${auxiliares.map(() => '?').join(',')})`,
            auxiliares
          );
          console.log(
            '[updateAluno] Auxiliares encontrados:',
            existingAuxiliares
          );

          const existingIds = (existingAuxiliares as any[]).map(
            (row) => row.id_auxiliar
          );
          const invalidIds = auxiliares.filter(
            (id: number) => !existingIds.includes(id)
          );
          if (invalidIds.length > 0) {
            res
              .status(400)
              .json({
                message: `Os seguintes auxiliares não existem: ${invalidIds.join(', ')}`,
              });
            return;
          }

          console.log('[updateAluno] Associando novos auxiliares...');
          await Aluno.associateAuxiliares(id, auxiliares);
          console.log('[updateAluno] Novos auxiliares associados com sucesso');
        } else {
          console.log(
            '[updateAluno] Nenhum auxiliar para associar (auxiliares é vazio ou não é um array).'
          );
        }
      } else {
        console.log(
          '[updateAluno] Campo "auxiliares" não foi enviado. Mantendo os auxiliares existentes.'
        );
      }

      const alunoAtualizado = await Aluno.findById(id);
      console.log('[updateAluno] Aluno atualizado:', alunoAtualizado[0]);
      res.json(alunoAtualizado[0]);
    } else {
      console.log('[updateAluno] Aluno com ID não encontrado:', id);
      res.status(404).json({ message: 'Aluno não encontrado' });
    }
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Erro desconhecido';
    console.error('[updateAluno] Erro ao atualizar aluno:', error);
    res
      .status(500)
      .json({ message: 'Erro ao atualizar aluno', error: errorMessage });
  }
};
export const deleteAluno = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const aluno = await Aluno.findById(id);

    if (aluno && Array.isArray(aluno) && aluno.length > 0) {
      await Aluno.clearAuxiliares(id);
      await Aluno.delete(id);
      res.json({ message: 'Aluno removido com sucesso' });
    } else {
      res.status(404).json({ message: 'Aluno não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao remover aluno:', error);
    res.status(500).json({ message: 'Erro ao remover aluno' });
  }
};

export const getCursoByAlunoId = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const aluno = await Aluno.findById(id);

    if (aluno && Array.isArray(aluno) && aluno.length > 0) {
      res.json({ curso: aluno[0].curso });
    } else {
      res.status(404).json({ message: 'Aluno não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao buscar curso do aluno:', error);
    res.status(500).json({ message: 'Erro ao buscar curso do aluno' });
  }
};

export const getCursosDosAlunos = async (req: Request, res: Response) => {
  try {
    const cursos = await Aluno.findAllCourses();

    if (cursos.length > 0) {
      res.json(cursos);
    } else {
      res.status(404).json({ message: 'Nenhum curso encontrado' });
    }
  } catch (error) {
    console.error('Erro ao buscar cursos:', error);
    res.status(500).json({ message: 'Erro ao buscar cursos' });
  }
};

export const getUnidadeByAlunoId = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const aluno = await Aluno.findById(id);

    if (aluno && Array.isArray(aluno) && aluno.length > 0) {
      res.json({ unidade: aluno[0].unidade });
    } else {
      res.status(404).json({ message: 'Aluno não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao buscar unidade do aluno:', error);
    res.status(500).json({ message: 'Erro ao buscar unidade do aluno' });
  }
};

export const getUnidadeDosAlunos = async (req: Request, res: Response) => {
  try {
    const unidade = await Aluno.findAllUnidades();

    if (unidade.length > 0) {
      res.json(unidade);
    } else {
      res.status(404).json({ message: 'Nenhuma unidade encontrada' });
    }
  } catch (error) {
    console.error('Erro ao buscar unidade:', error);
    res.status(500).json({ message: 'Erro ao buscar unidade' });
  }
};

export const getAlunosComTecnologiaAssistiva = async (
  req: Request,
  res: Response
) => {
  try {
    const alunos = await Aluno.findByField('necessita_tecnologia_assistiva', 1);
    res.json(alunos);
  } catch (error) {
    console.error('Erro ao buscar alunos com tecnologia assistiva:', error);
    res.status(500).json({ message: 'Erro ao buscar alunos' });
    console.log('ERROOOOOO');
  }
};

export const getAlunosSemTecnologiaAssistiva = async (
  req: Request,
  res: Response
) => {
  try {
    const alunos = await Aluno.findByField('necessita_tecnologia_assistiva', 0);
    res.json(alunos);
  } catch (error) {
    console.error('Erro ao buscar alunos sem tecnologia assistiva:', error);
    res.status(500).json({ message: 'Erro ao buscar alunos' });
  }
};

export const countAlunosComTecnologiaAssistiva = async (
  req: Request,
  res: Response
) => {
  try {
    const count = await Aluno.countByField('necessita_tecnologia_assistiva', 1);
    res.json({ total: count });
  } catch (error) {
    console.error('Erro ao contar alunos com tecnologia assistiva:', error);
    res.status(500).json({ message: 'Erro ao contar alunos' });
  }
};

export const getStatusTecnologiaAssistivaById = async (
  req: Request,
  res: Response
) => {
  try {
    const id = parseInt(req.params.id);
    const aluno = await Aluno.findById(id);
    if (aluno && aluno.length > 0) {
      res.json({
        necessita_tecnologia_assistiva: aluno[0].necessita_tecnologia_assistiva,
      });
    } else {
      res.status(404).json({ message: 'Aluno não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao buscar status de tecnologia assistiva:', error);
    res.status(500).json({ message: 'Erro ao buscar status' });
  }
};

export const countTotalAlunos = async (req: Request, res: Response) => {
  try {
    const count = await Aluno.countAll();
    res.json({ total: count });
  } catch (error) {
    console.error('Erro ao contar total de alunos:', error);
    res.status(500).json({ message: 'Erro ao contar alunos' });
  }
};

export const getAlunosComAcompanhamento = async (
  req: Request,
  res: Response
) => {
  try {
    const alunos = await Aluno.findByField('necessita_acompanhamento', 1);
    res.json(alunos);
  } catch (error) {
    console.error('Erro ao buscar alunos com acompanhamento:', error);
    res.status(500).json({ message: 'Erro ao buscar alunos' });
  }
};

export const getAlunosSemAcompanhamento = async (
  req: Request,
  res: Response
) => {
  try {
    const alunos = await Aluno.findByField('necessita_acompanhamento', 0);
    res.json(alunos);
  } catch (error) {
    console.error('Erro ao buscar alunos sem acompanhamento:', error);
    res.status(500).json({ message: 'Erro ao buscar alunos' });
  }
};

export const countAlunosComAcompanhamento = async (
  req: Request,
  res: Response
) => {
  try {
    const count = await Aluno.countByField('necessita_acompanhamento', 1);
    res.json({ total: count });
  } catch (error) {
    console.error('Erro ao contar alunos com acompanhamento:', error);
    res.status(500).json({ message: 'Erro ao contar alunos' });
  }
};

export const getStatusAcompanhamentoById = async (
  req: Request,
  res: Response
) => {
  try {
    const id = parseInt(req.params.id);
    const aluno = await Aluno.findById(id);
    if (aluno && aluno.length > 0) {
      res.json({ necessita_acompanhamento: aluno[0].necessita_acompanhamento });
    } else {
      res.status(404).json({ message: 'Aluno não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao buscar status de acompanhamento:', error);
    res.status(500).json({ message: 'Erro ao buscar status' });
  }
};

export const getDataMatriculaById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const aluno = await Aluno.findById(id);
    if (aluno && aluno.length > 0) {
      res.json({ data_matricula: aluno[0].data_da_matricula });
    } else {
      res.status(404).json({ message: 'Aluno não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao buscar data de matrícula:', error);
    res.status(500).json({ message: 'Erro ao buscar data de matrícula' });
  }
};

export const getTipoCursoById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const aluno = await Aluno.findById(id);
    if (aluno && aluno.length > 0) {
      res.json({ tipo_do_curso: aluno[0].tipo_do_curso });
    } else {
      res.status(404).json({ message: 'Aluno não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao buscar tipo de curso:', error);
    res.status(500).json({ message: 'Erro ao buscar tipo de curso' });
  }
};

export const getTotalAlunosPorUnidade = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const [rows] = await pool.execute(
      `SELECT unidade, COUNT(*) as total_alunos 
       FROM Aluno 
       GROUP BY unidade`
    );
    res.json(rows);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Erro desconhecido';
    console.error(
      '[getTotalAlunosPorUnidade] Erro ao buscar total de alunos por unidade:',
      error
    );
    res
      .status(500)
      .json({
        message: 'Erro ao buscar total de alunos por unidade',
        error: errorMessage,
      });
  }
};

export const getNecessidadesEspeciaisStats = async (
  req: Request,
  res: Response
) => {
  try {
    const stats = await Aluno.getStatistics();
    res.json(stats);
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    res.status(500).json({ message: 'Erro ao buscar estatísticas' });
  }
};

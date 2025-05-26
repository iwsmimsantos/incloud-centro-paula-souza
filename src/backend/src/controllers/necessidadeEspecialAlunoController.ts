import { Request, Response } from 'express';
import { NecessidadeEspecialAluno } from '../models/NecessidadeEspecialAluno';

export const getNecessidadesEspeciaisAlunos = async (
  req: Request,
  res: Response
) => {
  try {
    const necessidadesEspeciaisAlunos =
      await NecessidadeEspecialAluno.findAll();
    res.json(necessidadesEspeciaisAlunos);
  } catch (error) {
    console.error('Erro ao buscar necessidades especiais dos alunos:', error);
    res
      .status(500)
      .json({ message: 'Erro ao buscar necessidades especiais dos alunos' });
  }
};

export const getNecessidadeEspecialAlunoById = async (
  req: Request,
  res: Response
) => {
  try {
    const id = parseInt(req.params.id);
    const necessidadeEspecialAluno =
      await NecessidadeEspecialAluno.findById(id);
    if (necessidadeEspecialAluno.length > 0) {
      res.json(necessidadeEspecialAluno[0]);
    } else {
      res.status(404).json({ message: 'Associação não encontrada' });
    }
  } catch (error) {
    console.error('Erro ao buscar associação:', error);
    res.status(500).json({ message: 'Erro ao buscar associação' });
  }
};

export const getNecessidadesByAlunoId = async (req: Request, res: Response) => {
  try {
    const idAluno = parseInt(req.params.id_aluno);
    const necessidades = await NecessidadeEspecialAluno.findByAlunoId(idAluno);
    res.json(necessidades);
  } catch (error) {
    console.error('Erro ao buscar necessidades do aluno:', error);
    res.status(500).json({ message: 'Erro ao buscar necessidades do aluno' });
  }
};

export const getAlunosByNecessidadeId = async (req: Request, res: Response) => {
  try {
    const idNecessidade = parseInt(req.params.id_necessidade);
    const alunos =
      await NecessidadeEspecialAluno.findByNecessidadeId(idNecessidade);
    res.json(alunos);
  } catch (error) {
    console.error('Erro ao buscar alunos com a necessidade especial:', error);
    res
      .status(500)
      .json({ message: 'Erro ao buscar alunos com a necessidade especial' });
  }
};

export const createNecessidadeEspecialAluno = async (
  req: Request,
  res: Response
) => {
  try {
    const { id_aluno, id_necessidade } = req.body;
    const result = await NecessidadeEspecialAluno.create(
      id_aluno,
      id_necessidade
    );
    if (result.affectedRows > 0) {
      res.status(201).json({ message: 'Associação criada com sucesso' });
    } else {
      res.status(400).json({ message: 'Erro ao criar associação' });
    }
  } catch (error) {
    console.error('Erro ao criar associação:', error);
    res.status(500).json({ message: 'Erro ao criar associação' });
  }
};

export const deleteNecessidadeEspecialAluno = async (
  req: Request,
  res: Response
) => {
  try {
    const id = parseInt(req.params.id);
    const result = await NecessidadeEspecialAluno.delete(id);
    if (result.affectedRows > 0) {
      res.json({ message: 'Associação removida com sucesso' });
    } else {
      res.status(404).json({ message: 'Associação não encontrada' });
    }
  } catch (error) {
    console.error('Erro ao remover associação:', error);
    res.status(500).json({ message: 'Erro ao remover associação' });
  }
};

export const deleteNecessidadeEspecialAlunoByAlunoAndNecessidade = async (
  req: Request,
  res: Response
) => {
  try {
    const { id_aluno, id_necessidade } = req.body;
    const result = await NecessidadeEspecialAluno.deleteByAlunoAndNecessidade(
      id_aluno,
      id_necessidade
    );
    if (result.affectedRows > 0) {
      res.json({ message: 'Associação removida com sucesso' });
    } else {
      res.status(404).json({ message: 'Associação não encontrada' });
    }
  } catch (error) {
    console.error('Erro ao remover associação:', error);
    res.status(500).json({ message: 'Erro ao remover associação' });
  }
};

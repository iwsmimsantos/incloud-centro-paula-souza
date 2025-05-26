import { Request, Response } from 'express';
import AuxiliarAluno from '../models/AuxiliarAluno';

// Log para confirmar que o controller está sendo carregado
console.log('[auxiliarAlunoController] Carregando controller...');

export const getAuxiliaresAlunos = async (req: Request, res: Response) => {
  try {
    const auxiliaresAlunos = await AuxiliarAluno.findAll();
    res.json(auxiliaresAlunos);
  } catch (error) {
    console.error('Erro ao buscar auxiliares e alunos:', error);
    res.status(500).json({ message: 'Erro ao buscar auxiliares e alunos' });
  }
};

export const getAuxiliarAlunoById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const auxiliarAluno = await AuxiliarAluno.findById(id);
    if (auxiliarAluno.length > 0) {
      res.json(auxiliarAluno[0]);
    } else {
      res.status(404).json({ message: 'Associação não encontrada' });
    }
  } catch (error) {
    console.error('Erro ao buscar associação:', error);
    res.status(500).json({ message: 'Erro ao buscar associação' });
  }
};

export const getAuxiliaresByAlunoId = async (req: Request, res: Response) => {
  try {
    const idAluno = parseInt(req.params.id_aluno);
    const auxiliares = await AuxiliarAluno.findByAlunoId(idAluno);
    res.json(auxiliares);
  } catch (error) {
    console.error('Erro ao buscar auxiliares do aluno:', error);
    res.status(500).json({ message: 'Erro ao buscar auxiliares do aluno' });
  }
};

export const getAlunosByAuxiliarId = async (req: Request, res: Response) => {
  try {
    const idAuxiliar = parseInt(req.params.id_auxiliar);
    const alunos = await AuxiliarAluno.findByAuxiliarId(idAuxiliar);
    res.json(alunos);
  } catch (error) {
    console.error('Erro ao buscar alunos do auxiliar:', error);
    res.status(500).json({ message: 'Erro ao buscar alunos do auxiliar' });
  }
};

export const createAuxiliarAluno = async (req: Request, res: Response) => {
  try {
    const { id_aluno, id_auxiliar } = req.body;
    const result = await AuxiliarAluno.create(id_aluno, id_auxiliar);
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

export const deleteAuxiliarAluno = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const result = await AuxiliarAluno.delete(id);
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

export const deleteAuxiliarAlunoByAlunoAndAuxiliar = async (
  req: Request,
  res: Response
) => {
  try {
    const id_aluno = parseInt(req.query.id_aluno as string);
    const id_auxiliar = parseInt(req.query.id_auxiliar as string);
    console.log(`[deleteAuxiliarAlunoByAlunoAndAuxiliar] Deletando associação: id_aluno=${id_aluno}, id_auxiliar=${id_auxiliar}`);

    if (!id_aluno || !id_auxiliar) {
      res.status(400).json({ message: 'Dados insuficientes: id_aluno e id_auxiliar são obrigatórios' });
      return;
    }

    const result = await AuxiliarAluno.deleteByAlunoAndAuxiliar(id_aluno, id_auxiliar);
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

export async function getTotalAcompanhamentos(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const total = await AuxiliarAluno.getTotalAcompanhamentos();
    console.log('Total calculado:', total);
    res.status(200).json({ totalAcompanhamentos: total });
  } catch (error) {
    console.error('Erro ao buscar o total de acompanhamentos:', error);
    res
      .status(500)
      .json({ message: 'Erro ao buscar o total de acompanhamentos.' });
  }
}
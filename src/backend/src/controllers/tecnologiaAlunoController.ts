  import { Request, Response, NextFunction } from 'express';
  import TecnologiaAluno from '../models/TecnologiaAluno';

  // Async handler wrapper
  const asyncHandler = (
    fn: (
      req: Request,
      res: Response,
      next: NextFunction
    ) => Promise<Response | void>
  ) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        await fn(req, res, next);
      } catch (error) {
        console.error('Async Handler Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    };
  };

  export const getTecnologiasAlunos = asyncHandler(async (req, res) => {
    const tecnologiasAlunos = await TecnologiaAluno.findAll();
    return res.json(tecnologiasAlunos);
  });

  export const getTecnologiaAlunoById = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const tecnologiaAluno = await TecnologiaAluno.findById(id);
    if (tecnologiaAluno.length > 0) {
      return res.json(tecnologiaAluno[0]);
    } else {
      return res.status(404).json({ message: 'Associação não encontrada' });
    }
  });

  export const getTecnologiasByAlunoId = asyncHandler(async (req, res) => {
    const idAluno = parseInt(req.params.id_aluno);
    const tecnologias = await TecnologiaAluno.findByAlunoId(idAluno);
    return res.json(tecnologias);
  });

  export const getAlunosByTecnologiaId = asyncHandler(async (req, res) => {
    const idTecnologia = parseInt(req.params.id_tecnologia);
    const alunos = await TecnologiaAluno.findByTecnologiaId(idTecnologia);
    return res.json(alunos);
  });

  export const createTecnologiaAluno = asyncHandler(async (req, res) => {
    const { id_aluno, id_tecnologia } = req.body;
    const result = await TecnologiaAluno.create(id_aluno, id_tecnologia);
    if (result.affectedRows > 0) {
      return res.status(201).json({ message: 'Associação criada com sucesso' });
    } else {
      return res.status(400).json({ message: 'Erro ao criar associação' });
    }
  });

  export const deleteTecnologiaAluno = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const result = await TecnologiaAluno.delete(id);
    if (result.affectedRows > 0) {
      return res.json({ message: 'Associação removida com sucesso' });
    } else {
      return res.status(404).json({ message: 'Associação não encontrada' });
    }
  });

  export const deleteTecnologiaAlunoByAlunoAndTecnologia = asyncHandler(
    async (req, res) => {
      const { id_aluno, id_tecnologia } = req.body;
      const result = await TecnologiaAluno.deleteByAlunoAndTecnologia(
        id_aluno,
        id_tecnologia
      );
      if (result.affectedRows > 0) {
        return res.json({ message: 'Associação removida com sucesso' });
      } else {
        return res.status(404).json({ message: 'Associação não encontrada' });
      }
    }
  );

  export const updateTecnologiaAluno = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { id_aluno, id_tecnologia } = req.body;

    const result = await TecnologiaAluno.update(
      parseInt(id), // id_tecnologia_aluno
      id_aluno,
      id_tecnologia
    );

    if (result.affectedRows > 0) {
      return res.json({
        message: 'Associação atualizada com sucesso',
        dadosAtualizados: { id, id_aluno, id_tecnologia },
      });
    } else {
      return res.status(404).json({ message: 'Associação não encontrada' });
    }
  });

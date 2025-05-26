import { Router } from 'express';
import {
  getNecessidadesEspeciaisAlunos,
  getNecessidadeEspecialAlunoById,
  getNecessidadesByAlunoId,
  getAlunosByNecessidadeId,
  createNecessidadeEspecialAluno,
  deleteNecessidadeEspecialAluno,
  deleteNecessidadeEspecialAlunoByAlunoAndNecessidade,
} from '../controllers/necessidadeEspecialAlunoController';

const router = Router();

router.get('/aluno/:id_aluno', getNecessidadesByAlunoId);
router.get('/necessidade/:id_necessidade', getAlunosByNecessidadeId);

// rotas com parâmetros genéricos
router.get('/:id', getNecessidadeEspecialAlunoById);
router.get('/', getNecessidadesEspeciaisAlunos);
router.post('/', createNecessidadeEspecialAluno);
router.delete('/:id', deleteNecessidadeEspecialAluno);
router.delete('/', deleteNecessidadeEspecialAlunoByAlunoAndNecessidade);

export default router;

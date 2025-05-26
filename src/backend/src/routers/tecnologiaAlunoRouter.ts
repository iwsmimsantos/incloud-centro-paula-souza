import express from 'express';
import {
  getTecnologiasAlunos,
  getTecnologiaAlunoById,
  getTecnologiasByAlunoId,
  getAlunosByTecnologiaId,
  createTecnologiaAluno,
  deleteTecnologiaAluno,
  deleteTecnologiaAlunoByAlunoAndTecnologia,
  updateTecnologiaAluno,
} from '../controllers/tecnologiaAlunoController';

const router = express.Router();

router.get('/', getTecnologiasAlunos);
router.get('/:id', getTecnologiaAlunoById);
router.get('/aluno/:id_aluno', getTecnologiasByAlunoId);
router.get('/tecnologia/:id_tecnologia', getAlunosByTecnologiaId);
router.post('/', createTecnologiaAluno);
router.delete('/:id', deleteTecnologiaAluno);
router.delete('/', deleteTecnologiaAlunoByAlunoAndTecnologia);
router.put('/:id', updateTecnologiaAluno);

export default router;

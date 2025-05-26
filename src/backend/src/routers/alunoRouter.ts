import { Router, Request, Response } from 'express';
import {
  getAlunos,
  getAlunoById,
  createAluno,
  updateAluno,
  deleteAluno,
  getCursoByAlunoId,
  getCursosDosAlunos,
  getUnidadeByAlunoId,
  getUnidadeDosAlunos,
  getAlunosComTecnologiaAssistiva,
  getAlunosSemTecnologiaAssistiva,
  countAlunosComTecnologiaAssistiva,
  getStatusTecnologiaAssistivaById,
  countTotalAlunos,
  getAlunosComAcompanhamento,
  getAlunosSemAcompanhamento,
  countAlunosComAcompanhamento,
  getStatusAcompanhamentoById,
  getDataMatriculaById,
  getTipoCursoById,
  getTotalAlunosPorUnidade,
  getNecessidadesEspeciaisStats,
} from '../controllers/alunoController';

const router = Router();

// Rotas estáticas e específicas devem vir antes das rotas dinâmicas
router.get('/alunos-por-unidade', getTotalAlunosPorUnidade);
router.get('/todas-unidades', getUnidadeDosAlunos);
router.get('/cursos', getCursosDosAlunos);
router.get('/', getAlunos);

// rotas específicas antes de rotas genéricas com parâmetros
router.get('/estatisticas-necessidades', getNecessidadesEspeciaisStats);
// Rotas dinâmicas
router.get('/:id', getAlunoById);
// router.get('/:id/enrollments'); // Comentado no original, deixei assim

// Outras rotas CRUD e relacionadas
router.post('/', createAluno);
router.put('/:id', updateAluno);
router.delete('/:id', deleteAluno);

router.get('/:id/curso', getCursoByAlunoId);
router.get('/:id/unidade', getUnidadeByAlunoId);

router.get('/tecnologia-assistiva/true', getAlunosComTecnologiaAssistiva);
router.get('/tecnologia-assistiva/false', getAlunosSemTecnologiaAssistiva);
router.get('/:id/tecnologia-assistiva', getStatusTecnologiaAssistivaById);
router.get('/tecnologia-assistiva/contagem', countAlunosComTecnologiaAssistiva);

router.get('/acompanhamento/true', getAlunosComAcompanhamento);
router.get('/acompanhamento/false', getAlunosSemAcompanhamento);
router.get('/:id/acompanhamento', getStatusAcompanhamentoById);
router.get('/acompanhamento/contagem', countAlunosComAcompanhamento);

router.get('/contagem', countTotalAlunos);
router.get('/:id/data-matricula', getDataMatriculaById);
router.get('/:id/tipo-curso', getTipoCursoById);

export default router;

import { Router } from 'express';
import {
  getAuxiliaresAlunos,
  getAuxiliarAlunoById,
  getAuxiliaresByAlunoId,
  getAlunosByAuxiliarId,
  createAuxiliarAluno,
  deleteAuxiliarAluno,
  deleteAuxiliarAlunoByAlunoAndAuxiliar,
  getTotalAcompanhamentos,
} from '../controllers/auxiliarAlunoController';

const router = Router();

// Log para confirmar que o router está sendo carregado
console.log('[auxiliarRouter] Configurando rotas...');

// Rota de teste
router.get('/test', (req, res) => {
  console.log('[auxiliarRouter] GET /test');
  res.json({ message: 'Rota de teste funcionando' });
});

// Get all associations between auxiliares and alunos
router.get('/', (req, res) => {
  console.log('[auxiliarRouter] GET /');
  getAuxiliaresAlunos(req, res);
});

// Get total de acompanhamentos
router.get('/contagem-geral', (req, res) => {
  console.log('[auxiliarRouter] GET /contagem-geral');
  getTotalAcompanhamentos(req, res);
});

// Get a specific association by ID
router.get('/:id', (req, res) => {
  console.log('[auxiliarRouter] GET /:id');
  getAuxiliarAlunoById(req, res);
});

// Get all auxiliares for a specific aluno
router.get('/aluno/:id_aluno', (req, res) => {
  console.log('[auxiliarRouter] GET /aluno/:id_aluno');
  getAuxiliaresByAlunoId(req, res);
});

// Get all alunos for a specific auxiliar
router.get('/auxiliar/:id_auxiliar', (req, res) => {
  console.log('[auxiliarRouter] GET /auxiliar/:id_auxiliar');
  getAlunosByAuxiliarId(req, res);
});

// Create a new association
router.post('/', (req, res) => {
  console.log('[auxiliarRouter] POST /');
  createAuxiliarAluno(req, res);
});

// Delete association by aluno and auxiliar IDs (mova esta rota para antes de DELETE /:id)
router.delete('/by-aluno-auxiliar', (req, res) => {
  console.log('[auxiliarRouter] DELETE /by-aluno-auxiliar');
  deleteAuxiliarAlunoByAlunoAndAuxiliar(req, res);
});

// Delete association by ID (mova esta rota para depois de DELETE /by-aluno-auxiliar)
router.delete('/:id', (req, res) => {
  console.log('[auxiliarRouter] DELETE /:id');
  deleteAuxiliarAluno(req, res);
});

export default router;
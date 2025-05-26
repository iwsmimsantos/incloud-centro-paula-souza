import { Router, RequestHandler } from 'express';
import {
  getAtendimentos,
  getAtendimentoById,
  getAtendimentosByFuncionario,
  getAtendimentosByAluno,
  createAtendimento,
  updateAtendimento,
  deleteAtendimento,
  atribuirProfissional,
  getTotalAtendimentos,
  getTotalAtendimentosGeral,
  getAtendimentosPorMes,
  getAllAlunos,
  getAllProfissionais
} from '../controllers/atendimentoController';

const router = Router();

router.post('/', createAtendimento as unknown as RequestHandler);
// Rota para listar todos os atendimentos
router.get('/', getAtendimentos);
router.get('/por-mes', getAtendimentosPorMes);

// Novas rotas para buscar alunos e profissionais
router.get('/alunos/lista', getAllAlunos);
router.get('/profissionais/lista', getAllProfissionais);

// Rota para total - DEVE VIR ANTES DAS ROTAS COM PARÂMETROS
router.get('/total', getTotalAtendimentos);
router.get('/contagem-geral', getTotalAtendimentosGeral);

// Rotas com parâmetros específicos
router.get('/funcionario/:id_funcionario', getAtendimentosByFuncionario);
router.get('/aluno/:id_aluno', getAtendimentosByAluno);
router.put(
  '/:id/atribuir-profissional',
  atribuirProfissional as unknown as RequestHandler
);

// Rotas genéricas com parâmetro ID
router.get('/:id', getAtendimentoById);
router.put('/:id', updateAtendimento);
router.delete('/:id', deleteAtendimento);



export default router;
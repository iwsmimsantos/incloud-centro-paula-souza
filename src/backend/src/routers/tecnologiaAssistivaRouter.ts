import { Router } from 'express';
import TecnologiaAssistivaController from '../controllers/tecnologiaAssistivaController';

const router = Router();

router.post('/', TecnologiaAssistivaController.create);
router.get('/', TecnologiaAssistivaController.findAll);
router.get('/tipo', TecnologiaAssistivaController.findByTipo);
router.get(
  '/contagem-geral',
  TecnologiaAssistivaController.getTotalTecnologiasAssistivas
);

// Para gráfico de tecnologiaAssistiva
router.get('/contagem-por-tipo', TecnologiaAssistivaController.getCountByTipo);

router.get('/:id_tecnologia', TecnologiaAssistivaController.findById);
router.put('/:id_tecnologia', TecnologiaAssistivaController.update);
router.delete('/:id_tecnologia', TecnologiaAssistivaController.delete);

export default router;

import { Router } from "express";
import AutenticacaoController from "../controllers/autenticacaoController";

const router = Router();

// Rotas para autenticação
router.post("/", AutenticacaoController.create);
router.get("/", AutenticacaoController.findAll);
router.get("/:id_autenticacao", AutenticacaoController.findById);
router.get("/funcionario/:id_funcionario", AutenticacaoController.findByFuncionarioId);
router.put("/:id_autenticacao", AutenticacaoController.update);
router.delete("/:id_autenticacao", AutenticacaoController.delete);

export default router;

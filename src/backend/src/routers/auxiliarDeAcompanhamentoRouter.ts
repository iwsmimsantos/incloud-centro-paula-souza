import { Router } from "express";
import {
  getAuxiliares,
  getAuxiliarById,
  createAuxiliar,
  updateAuxiliar,
  deleteAuxiliar,
} from "../controllers/auxiliarDeAcompanhamentoController";

const router = Router();

// Usando as funções do controlador diretamente
router.get("/", getAuxiliares);
router.get("/:id", getAuxiliarById);
router.post("/", createAuxiliar);
router.put("/:id", updateAuxiliar);
router.delete("/:id", deleteAuxiliar);

export default router;
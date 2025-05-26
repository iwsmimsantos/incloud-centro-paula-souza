import { Router } from "express";
import {
  getNecessidadesEspeciais,
  getNecessidadeEspecialById,
  createNecessidadeEspecial,
  updateNecessidadeEspecial,
  deleteNecessidadeEspecial,
} from "../controllers/necessidadeEspecialController";

const router = Router();

router.get("/", getNecessidadesEspeciais);
router.get("/:id", getNecessidadeEspecialById);
router.post("/", createNecessidadeEspecial);
router.put("/:id", updateNecessidadeEspecial);
router.delete("/:id", deleteNecessidadeEspecial);

export default router;
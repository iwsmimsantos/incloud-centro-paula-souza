import { Router } from "express";
import { getFuncionarios, getFuncionarioById } from "../controllers/funcionarioController";

const router = Router();

router.get("/", getFuncionarios);
router.get("/:id", getFuncionarioById);

export default router;

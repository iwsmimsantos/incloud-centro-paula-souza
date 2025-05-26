// src/routers/institutionRouter.ts
import { Router } from "express";
import { getAllInstitutions, getInstitutionById, getInstitutionStudents } from "../controllers/institutionController";

const router = Router();

router.get("/", getAllInstitutions);
router.get("/:id", getInstitutionById);
router.get("/:id/students", getInstitutionStudents);

export default router;
// src/routers/courseRouter.ts
import { Router } from "express";
import { getAllCourses, getCourseById, getCourseStudents } from "../controllers/courseController";

const router = Router();

router.get("/", getAllCourses);
router.get("/:id", getCourseById);
router.get("/:id/students", getCourseStudents);

export default router;
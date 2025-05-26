// src/controllers/courseController.ts
import { Request, Response } from "express";
import axios from "axios";

const apiUrl = "https://two025-1a-t13-es05-api2.onrender.com/api/v1";
const token = "g3-d72f4d0e90fce94208a9cc383c7e10ae7b";

export const getAllCourses = async (req: Request, res: Response) => {
  try {
    const response = await axios.get(`${apiUrl}/courses`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    res.status(200).json(response.data);
  } catch (error: any) {
    console.error("Erro ao buscar cursos:", error);
    res.status(500).json({ message: "Erro ao buscar cursos", error: error.message });
  }
};

export const getCourseById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const response = await axios.get(`${apiUrl}/courses/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.data) {
      res.status(200).json(response.data);
    } else {
      res.status(404).json({ message: "Curso não encontrado" });
    }
  } catch (error: any) {
    console.error("Erro ao buscar curso:", error);
    res.status(500).json({ message: "Erro ao buscar curso", error: error.message });
  }
};

export const getCourseStudents = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const response = await axios.get(`${apiUrl}/courses/${id}/students`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    res.status(200).json(response.data);
  } catch (error: any) {
    console.error("Erro ao buscar alunos do curso:", error);
    res.status(500).json({ message: "Erro ao buscar alunos do curso", error: error.message });
  }
};
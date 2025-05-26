// src/controllers/institutionController.ts
import { Request, Response } from "express";
import axios from "axios";

const apiUrl = "https://two025-1a-t13-es05-api2.onrender.com/api/v1";
const token = "g3-d72f4d0e90fce94208a9cc383c7e10ae7b";

export const getAllInstitutions = async (req: Request, res: Response) => {
  try {
    const response = await axios.get(`${apiUrl}/institutions`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    res.status(200).json(response.data);
  } catch (error: any) {
    console.error("Erro ao buscar instituições:", error);
    res.status(500).json({ message: "Erro ao buscar instituições", error: error.message });
  }
};

export const getInstitutionById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const response = await axios.get(`${apiUrl}/institutions/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.data) {
      res.status(200).json(response.data);
    } else {
      res.status(404).json({ message: "Instituição não encontrada" });
    }
  } catch (error: any) {
    console.error("Erro ao buscar instituição:", error);
    res.status(500).json({ message: "Erro ao buscar instituição", error: error.message });
  }
};

export const getInstitutionStudents = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const response = await axios.get(`${apiUrl}/institutions/${id}/students`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    res.status(200).json(response.data);
  } catch (error: any) {
    console.error("Erro ao buscar alunos da instituição:", error);
    res.status(500).json({ message: "Erro ao buscar alunos da instituição", error: error.message });
  }
};
// src/controllers/statsController.ts
import { Request, Response } from "express";
import axios from "axios";

const apiUrl = "https://two025-1a-t13-es05-api2.onrender.com/api/v1";
const token = "g3-d72f4d0e90fce94208a9cc383c7e10ae7b";

export const getStats = async (req: Request, res: Response) => {
  try {
    const response = await axios.get(`${apiUrl}/stats`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    res.status(200).json(response.data);
  } catch (error: any) {
    console.error("Erro ao obter estatísticas:", error);
    res.status(500).json({ message: "Erro ao obter estatísticas", error: error.message });
  }
};
import { Request, Response } from "express";
import NecessidadeEspecial from "../models/NecessidadeEspecial";

export const getNecessidadesEspeciais = async (req: Request, res: Response) => {
  try {
    const necessidadesEspeciais = await NecessidadeEspecial.findAll();
    res.json(necessidadesEspeciais);
  } catch (error) {
    console.error("Erro ao buscar necessidades especiais:", error);
    res.status(500).json({ message: "Erro ao buscar necessidades especiais" });
  }
};

export const getNecessidadeEspecialById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const necessidadeEspecial = await NecessidadeEspecial.findById(id);
    if (necessidadeEspecial.length > 0) {
      res.json(necessidadeEspecial[0]);
    } else {
      res.status(404).json({ message: "Necessidade especial não encontrada" });
    }
  } catch (error) {
    console.error("Erro ao buscar necessidade especial:", error);
    res.status(500).json({ message: "Erro ao buscar necessidade especial" });
  }
};

export const createNecessidadeEspecial = async (req: Request, res: Response) => {
  try {
    const { descricao } = req.body;
    const result = await NecessidadeEspecial.create(descricao);
    if (result.affectedRows > 0) {
      res.status(201).json({ message: "Necessidade especial criada com sucesso" });
    } else {
      res.status(400).json({ message: "Erro ao criar necessidade especial" });
    }
  } catch (error) {
    console.error("Erro ao criar necessidade especial:", error);
    res.status(500).json({ message: "Erro ao criar necessidade especial" });
  }
};

export const updateNecessidadeEspecial = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { descricao } = req.body;
    
    const necessidadeEspecial = await NecessidadeEspecial.findById(id);
    if (necessidadeEspecial && Array.isArray(necessidadeEspecial) && necessidadeEspecial.length > 0) {
      await NecessidadeEspecial.update(id, descricao);
      const necessidadeEspecialAtualizada = await NecessidadeEspecial.findById(id);
      res.json(necessidadeEspecialAtualizada[0]);
    } else {
      res.status(404).json({ message: "Necessidade especial não encontrada" });
    }
  } catch (error) {
    console.error("Erro ao atualizar necessidade especial:", error);
    res.status(500).json({ message: "Erro ao atualizar necessidade especial" });
  }
};

export const deleteNecessidadeEspecial = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const necessidadeEspecial = await NecessidadeEspecial.findById(id);
    
    if (necessidadeEspecial && Array.isArray(necessidadeEspecial) && necessidadeEspecial.length > 0) {
      await NecessidadeEspecial.delete(id);
      res.json({ message: "Necessidade especial removida com sucesso" });
    } else {
      res.status(404).json({ message: "Necessidade especial não encontrada" });
    }
  } catch (error) {
    console.error("Erro ao remover necessidade especial:", error);
    res.status(500).json({ message: "Erro ao remover necessidade especial" });
  }
};
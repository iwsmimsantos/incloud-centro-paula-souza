import AuxiliarDeAcompanhamento from "../models/AuxiliarDeAcompanhamento";
import { Request, Response } from "express";

// Removendo o tipo RequestHandler e simplesmente tipando os parâmetros
export const getAuxiliares = async (req: Request, res: Response): Promise<void> => {
  try {
    const auxiliares = await AuxiliarDeAcompanhamento.findAll();
    res.json(auxiliares);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar auxiliares" });
  }
};

export const getAuxiliarById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const auxiliar = await AuxiliarDeAcompanhamento.findById(id);
    auxiliar 
      ? res.json(auxiliar) 
      : res.status(404).json({ message: "Não encontrado" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar auxiliar" });
  }
};

export const createAuxiliar = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nome, especializacoes = null, email = null, telefone = null, empresa = null } = req.body;

    if (!nome) {
      res.status(400).json({ message: "O campo 'nome' é obrigatório" });
      return;
    }

    const result = await AuxiliarDeAcompanhamento.create(
      nome,
      especializacoes,
      email,
      telefone,
      empresa
    );

    if (result && 'insertId' in result) {
      const novoAuxiliar = await AuxiliarDeAcompanhamento.findById(result.insertId);
      res.status(201).json(novoAuxiliar);
    } else {
      res.status(400).json({ message: "Erro ao criar auxiliar" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar auxiliar" });
  }
};

export const updateAuxiliar = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const auxiliar = await AuxiliarDeAcompanhamento.findById(id);

    if (auxiliar) {
      const { nome, especializacoes, email, telefone, empresa } = req.body;
      await AuxiliarDeAcompanhamento.update(id, nome, especializacoes, email, telefone, empresa);
      const auxiliarAtualizado = await AuxiliarDeAcompanhamento.findById(id);
      res.json(auxiliarAtualizado);
    } else {
      res.status(404).json({ message: "Auxiliar não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar auxiliar" });
  }
};

export const deleteAuxiliar = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const auxiliar = await AuxiliarDeAcompanhamento.findById(id);

    if (auxiliar) {
      await AuxiliarDeAcompanhamento.delete(id);
      res.json({ message: "Auxiliar removido com sucesso" });
    } else {
      res.status(404).json({ message: "Auxiliar não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao remover auxiliar" });
  }
};
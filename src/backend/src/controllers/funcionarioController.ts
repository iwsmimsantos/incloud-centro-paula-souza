import { Request, Response } from "express";
import Funcionario from "../models/Funcionario";

export const getFuncionarios = async (req: Request, res: Response) => {
  try {
    const funcionarios = await Funcionario.findAll();
    res.json(funcionarios);
  } catch (error) {
    console.error("Erro ao buscar Funcionarios:", error);
    res.status(500).json({ message: "Erro ao buscar Funcionarios" });
  }
};

export const getFuncionarioById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const funcionario = await Funcionario.findById(id);
    if (funcionario && Array.isArray(funcionario) && funcionario.length > 0) {
      res.json(funcionario[0]);
    } else {
      res.status(404).json({ message: "Funcionario não encontrado" });
    }
  } catch (error) {
    console.error("Erro ao buscar Funcionario:", error);
    res.status(500).json({ message: "Erro ao buscar Funcionario" });
  }
};

export const createFuncionario = async (req: Request, res: Response) => {
  try {
    const { nome, cargo, departamento, email, possui_deficiencia, configuracoes_acessibilidade } = req.body;
    const result = await Funcionario.create(
      nome,
      cargo,
      departamento,
      email,
      possui_deficiencia,
      configuracoes_acessibilidade
    );
    
    if (result && 'insertId' in result) {
      const novoFuncionario = await Funcionario.findById(result.insertId);
      res.status(201).json(novoFuncionario[0]);
    } else {
      res.status(400).json({ message: "Erro ao criar Funcionario" });
    }
  } catch (error) {
    console.error("Erro ao criar Funcionario:", error);
    res.status(500).json({ message: "Erro ao criar Funcionario" });
  }
};

export const updateFuncionario = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { nome, cargo, departamento, email, possui_deficiencia, configuracoes_acessibilidade } = req.body;
    
    const funcionario = await Funcionario.findById(id);
    if (funcionario && Array.isArray(funcionario) && funcionario.length > 0) {
      await Funcionario.update(
        id,
        nome,
        cargo,
        departamento,
        email,
        possui_deficiencia,
        configuracoes_acessibilidade
      );
      const funcionarioAtualizado = await Funcionario.findById(id);
      res.json(funcionarioAtualizado[0]);
    } else {
      res.status(404).json({ message: "Funcionario não encontrado" });
    }
  } catch (error) {
    console.error("Erro ao atualizar Funcionario:", error);
    res.status(500).json({ message: "Erro ao atualizar Funcionario" });
  }
};

export const deleteFuncionario = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const funcionario = await Funcionario.findById(id);
    
    if (funcionario && Array.isArray(funcionario) && funcionario.length > 0) {
      await Funcionario.delete(id);
      res.json({ message: "Funcionario removido com sucesso" });
    } else {
      res.status(404).json({ message: "Funcionario não encontrado" });
    }
  } catch (error) {
    console.error("Erro ao remover Funcionario:", error);
    res.status(500).json({ message: "Erro ao remover Funcionario" });
  }
};
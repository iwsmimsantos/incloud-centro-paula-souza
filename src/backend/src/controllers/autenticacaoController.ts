import { Request, Response } from "express";
import Autenticacao from "../models/Autenticacao";

class AutenticacaoController {
  // Cria uma nova autenticação
  static async create(req: Request, res: Response): Promise<void> {
    try {
      const { id_funcionario, nivel_acesso } = req.body;
      if (!id_funcionario || !nivel_acesso) {
        res.status(400).json({ message: "Dados insuficientes." });
        return;
      }
      const result = await Autenticacao.create(id_funcionario, nivel_acesso);
      res.status(201).json({ message: "Autenticação criada com sucesso.", data: result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao criar autenticação." });
      return;
    }
  }

  // Busca uma autenticação pelo ID
  static async findById(req: Request, res: Response): Promise<void> {
    try {
      const { id_autenticacao } = req.params;
      if (!id_autenticacao) {
        res.status(400).json({ message: "ID da autenticação não fornecido." });
        return;
      }
      const result = await Autenticacao.findById(Number(id_autenticacao));
      if (result.length === 0) {
        res.status(404).json({ message: "Autenticação não encontrada." });
        return;
      }
      res.status(200).json(result[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao buscar autenticação." });
      return;
    }
  }

  // Busca autenticações pelo ID do funcionário
  static async findByFuncionarioId(req: Request, res: Response): Promise<void> {
    try {
      const { id_funcionario } = req.params;
      if (!id_funcionario) {
        res.status(400).json({ message: "ID do funcionário não fornecido." });
        return;
      }
      const result = await Autenticacao.findByFuncionarioId(Number(id_funcionario));
      if (result.length === 0) {
        res.status(404).json({ message: "Nenhuma autenticação encontrada para o funcionário." });
        return;
      }
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao buscar autenticações do funcionário." });
      return;
    }
  }

  // Busca todas as autenticações
  static async findAll(req: Request, res: Response): Promise<void> {
    try {
      const result = await Autenticacao.findAll();
      res.status(200).json(result);
      return;
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao buscar todas as autenticações." });
      return;
    }
  }

  // Atualiza uma autenticação pelo ID
  static async update(req: Request, res: Response): Promise<void> {
    try {
      const { id_autenticacao } = req.params;
      const { nivel_acesso } = req.body;
      if (!id_autenticacao || !nivel_acesso) {
        res.status(400).json({ message: "Dados insuficientes para atualização." });
        return;
      }
      const result = await Autenticacao.update(Number(id_autenticacao), Number(nivel_acesso));
      if (result.affectedRows === 0) {
        res.status(404).json({ message: "Autenticação não encontrada para atualização." });
        return;
      }
      res.status(200).json({ message: "Autenticação atualizada com sucesso.", data: result });
      return;
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao atualizar autenticação." });
      return;
    }
  }

  // Deleta uma autenticação pelo ID
  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id_autenticacao } = req.params;
      if (!id_autenticacao) {
        res.status(400).json({ message: "ID da autenticação não fornecido." });
        return;
      }
      const result = await Autenticacao.delete(Number(id_autenticacao));
      if (result.affectedRows === 0) {
        res.status(404).json({ message: "Autenticação não encontrada para exclusão." });
        return;
      }
      res.status(200).json({ message: "Autenticação excluída com sucesso.", data: result });
      return;
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao excluir autenticação." });
      return;
    }
  }
}

export default AutenticacaoController;

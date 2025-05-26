import { Request, Response } from 'express';
import TecnologiaAssistiva from '../models/TecnologiaAssistiva';

class TecnologiaAssistivaController {
  static async create(req: Request, res: Response): Promise<void> {
    try {
      const { nome, descricao, tipo } = req.body;
      if (!nome) {
        res.status(400).json({ message: 'Nome é obrigatório.' });
        return;
      }
      const result = await TecnologiaAssistiva.create(nome, descricao, tipo);
      res.status(201).json({
        message: 'Tecnologia Assistiva criada com sucesso.',
        data: result,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao criar Tecnologia Assistiva.' });
    }
  }

  static async findById(req: Request, res: Response): Promise<void> {
    try {
      const { id_tecnologia } = req.params;
      const result = await TecnologiaAssistiva.findById(Number(id_tecnologia));
      if (result.length === 0) {
        res
          .status(404)
          .json({ message: 'Tecnologia Assistiva não encontrada.' });
        return;
      }
      res.status(200).json(result[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao buscar Tecnologia Assistiva.' });
    }
  }

  static async findAll(req: Request, res: Response): Promise<void> {
    try {
      const result = await TecnologiaAssistiva.findAll();
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: 'Erro ao buscar todas as Tecnologias Assistivas.' });
    }
  }

  static async findByTipo(req: Request, res: Response): Promise<void> {
    try {
      const { tipo } = req.query;
      if (typeof tipo !== 'string') {
        res.status(400).json({ message: 'Tipo inválido.' });
        return;
      }
      const result = await TecnologiaAssistiva.findByTipo(tipo);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: 'Erro ao buscar Tecnologias Assistivas por tipo.' });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const { id_tecnologia } = req.params;
      const { nome, descricao, tipo } = req.body;
      const result = await TecnologiaAssistiva.update(
        Number(id_tecnologia),
        nome,
        descricao,
        tipo
      );
      if (result.affectedRows === 0) {
        res.status(404).json({
          message: 'Tecnologia Assistiva não encontrada para atualização.',
        });
        return;
      }
      res.status(200).json({
        message: 'Tecnologia Assistiva atualizada com sucesso.',
        data: result,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: 'Erro ao atualizar Tecnologia Assistiva.' });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id_tecnologia } = req.params;
      const result = await TecnologiaAssistiva.delete(Number(id_tecnologia));
      if (result.affectedRows === 0) {
        res.status(404).json({
          message: 'Tecnologia Assistiva não encontrada para exclusão.',
        });
        return;
      }
      res.status(200).json({
        message: 'Tecnologia Assistiva excluída com sucesso.',
        data: result,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: 'Erro ao excluir Tecnologia Assistiva.' });
    }
  }

  // TecnologiaAssistivaController.ts
  static async getTotalTecnologiasAssistivas(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const total = await TecnologiaAssistiva.getTotalTecnologias();
      console.log('Total calculado:', total); // Adicione isso para debug
      res.status(200).json({ totalTecnologias: total });
    } catch (error) {
      console.error('Erro ao buscar o total de tecnologias assistivas:', error);
      res
        .status(500)
        .json({ message: 'Erro ao buscar o total de tecnologias assistivas.' });
    }
  }

  // Método para gráfico TecnologiaAssistivaController.ts
  static async getCountByTipo(req: Request, res: Response): Promise<void> {
    try {
      const result = await TecnologiaAssistiva.getCountByTipo();
      res.status(200).json(result);
    } catch (error) {
      console.error('Erro ao buscar contagem de tecnologias por tipo:', error);
      res
        .status(500)
        .json({ message: 'Erro ao buscar contagem de tecnologias por tipo.' });
    }
  }
}

export default TecnologiaAssistivaController;

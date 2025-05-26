import { Request, Response } from 'express';
import Atendimento from '../models/Atendimento';

export const getAllAlunos = async (req: Request, res: Response) => {
  try {
    const alunos = await Atendimento.getAllAlunos();
    res.json(alunos);
  } catch (error) {
    console.error('Erro ao buscar alunos:', error);
    res.status(500).json({ message: 'Erro ao buscar alunos' });
  }
};

export const getAllProfissionais = async (req: Request, res: Response) => {
  try {
    const profissionais = await Atendimento.getAllProfissionais();
    res.json(profissionais);
  } catch (error) {
    console.error('Erro ao buscar profissionais:', error);
    res.status(500).json({ message: 'Erro ao buscar profissionais' });
  }
};

export const getAtendimentos = async (req: Request, res: Response) => {
  try {
    const atendimentos = await Atendimento.findAllComRelacionamentos();

    const formatados = atendimentos.map((a: any, index: number) => ({
      id_atendimento: a.id_atendimento,
      atendimento: `Atendimento ${index}`,
      nomeAluno: a.nome_aluno || 'Desconhecido',
      profissional: a.nome_profissional || 'Desconhecido',
      data_atendimento_inicio: a.data_atendimento_inicio,
      data_atendimento_fim: a.data_atendimento_fim,
    }));

    res.json(formatados);
  } catch (error) {
    console.error('Erro ao buscar atendimentos:', error); // já existe
    console.error('Erro completo:', JSON.stringify(error, null, 2)); // novo log detalhado
    res.status(500).json({ message: 'Erro ao buscar atendimentos' });
  }
};

export const getAtendimentoById = async (req: Request, res: Response) => {
  try {
    const id_atendimento = parseInt(req.params.id);
    const atendimento = await Atendimento.findById(id_atendimento);
    if (atendimento && Array.isArray(atendimento) && atendimento.length > 0) {
      res.json(atendimento[0]);
    } else {
      res.status(404).json({ message: 'Atendimento não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao buscar Atendimento:', error);
    res.status(500).json({ message: 'Erro ao buscar Atendimento' });
  }
};

export const getAtendimentosByFuncionario = async (
  req: Request,
  res: Response
) => {
  try {
    const id_funcionario = parseInt(req.params.id_funcionario);
    const atendimentos = await Atendimento.findByFuncionarioId(id_funcionario);
    res.json(atendimentos);
  } catch (error) {
    console.error('Erro ao buscar atendimentos do funcionário:', error);
    res
      .status(500)
      .json({ message: 'Erro ao buscar atendimentos do funcionário' });
  }
};

export const getAtendimentosByAluno = async (req: Request, res: Response) => {
  try {
    const id_aluno = parseInt(req.params.id_aluno);
    const atendimentos = await Atendimento.findByAlunoId(id_aluno);
    res.json(atendimentos);
  } catch (error) {
    console.error('Erro ao buscar atendimentos do aluno:', error);
    res.status(500).json({ message: 'Erro ao buscar atendimentos do aluno' });
  }
};

export const createAtendimento = async (req: Request, res: Response) => {
  try {
    const { id_aluno, id_funcionario, data_atendimento_inicio, data_atendimento_fim } = req.body;
    
    console.log('Dados recebidos:', req.body);
    
    // Converter explicitamente para números para evitar problemas de tipo
    const alunoId = Number(id_aluno);
    const funcionarioId = Number(id_funcionario);
    
    // Validar os IDs
    if (!alunoId || isNaN(alunoId) || !funcionarioId || isNaN(funcionarioId)) {
      return res.status(400).json({ message: 'IDs do aluno e do profissional são obrigatórios e devem ser números válidos' });
    }
    
    // Usa o novo método para criar o atendimento com IDs
    const result = await Atendimento.createComIds(
      alunoId,
      funcionarioId,
      data_atendimento_inicio,
      data_atendimento_fim
    );

    if (result && 'insertId' in result) {
      const novoAtendimento = await Atendimento.findById(result.insertId);
      res.status(201).json(novoAtendimento[0]);
    } else {
      res.status(400).json({ message: 'Erro ao criar Atendimento' });
    }
  } catch (error) {
    console.error('Erro ao criar Atendimento:', error);
    res.status(500).json({ message: 'Erro ao criar Atendimento' });
  }
};

export const updateAtendimento = async (req: Request, res: Response) => {
  try {
    const id_atendimento = parseInt(req.params.id);
    const { status_atendimento, id_funcionario, id_aluno } = req.body;

    const atendimento = await Atendimento.findById(id_atendimento);
    if (atendimento && Array.isArray(atendimento) && atendimento.length > 0) {
      await Atendimento.update(
        id_atendimento,
        status_atendimento,
        id_funcionario,
        id_aluno
      );
      const atendimentoAtualizado = await Atendimento.findById(id_atendimento);
      res.json(atendimentoAtualizado[0]);
    } else {
      res.status(404).json({ message: 'Atendimento não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao atualizar Atendimento:', error);
    res.status(500).json({ message: 'Erro ao atualizar Atendimento' });
  }
};

export const deleteAtendimento = async (req: Request, res: Response) => {
  try {
    const id_atendimento = parseInt(req.params.id);
    const atendimento = await Atendimento.findById(id_atendimento);

    if (atendimento && Array.isArray(atendimento) && atendimento.length > 0) {
      await Atendimento.delete(id_atendimento);
      res.json({ message: 'Atendimento removido com sucesso' });
    } else {
      res.status(404).json({ message: 'Atendimento não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao remover Atendimento:', error);
    res.status(500).json({ message: 'Erro ao remover Atendimento' });
  }
};

// //criação de um novo método para atribuir um profissional a um atendimento
export const atribuirProfissional = async (req: Request, res: Response) => {
  try {
    // Obtém o ID do atendimento e o ID do funcionário
    const id_atendimento = parseInt(req.params.id);
    const { id_funcionario } = req.body;

    // Verifica se o ID do funcionário foi fornecido
    if (!id_funcionario) {
      return res
        .status(400)
        .json({ message: 'ID do funcionário é obrigatório' });
    }

    // Busca o atendimento pelo ID
    const atendimento = await Atendimento.findById(id_atendimento);

    // Se atendimento encontrado, atualiza com o ID do funcionário
    if (atendimento && Array.isArray(atendimento) && atendimento.length > 0) {
      await Atendimento.update(
        id_atendimento,
        atendimento[0].status_atendimento,
        id_funcionario,
        atendimento[0].id_aluno
      );

      // Retorna o atendimento atualizado
      const atendimentoAtualizado = await Atendimento.findById(id_atendimento);
      res.json({
        message: 'Profissional atribuído com sucesso',
        atendimento: atendimentoAtualizado[0],
      });
    } else {
      // Se atendimento não encontrado, retorna erro 404
      res.status(404).json({ message: 'Atendimento não encontrado' });
    }
  } catch (error) {
    // Trata erros no processo
    console.error('Erro ao atribuir profissional ao atendimento:', error);
    res
      .status(500)
      .json({ message: 'Erro ao atribuir profissional ao atendimento' });
  }
};

export const getTotalAtendimentos = async (req: Request, res: Response) => {
  try {
    console.log('Iniciando busca por total de atendimentos');
    const total = await Atendimento.getTotalAtendimentos();
    console.log('Total de atendimentos encontrados:', total);
    res.json({ total });
  } catch (error) {
    console.error('Erro ao buscar total de atendimentos:', error);
    res.status(500).json({
      message: 'Erro interno no servidor',
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export const getTotalAtendimentosGeral = async (
  req: Request,
  res: Response
) => {
  try {
    const totalAtendimentos = await Atendimento.getTotalAtendimentosgeral();
    res.json({ totalAtendimentos });
  } catch (error) {
    console.error('Erro ao buscar o total geral de atendimentos:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};

export const getAtendimentosPorMes = async (req: Request, res: Response) => {
  try {
    const result = await Atendimento.getAtendimentosPorMes();
    res.json(result);
  } catch (error) {
    console.error('Erro ao obter atendimentos por mês:', error);
    res.status(500).json({ message: 'Erro ao obter atendimentos por mês' });
  }
}
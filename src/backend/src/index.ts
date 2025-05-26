import express from 'express';
import cors from 'cors';

import funcionarioRouter from './routers/funcionarioRouter';
import alunoRouter from './routers/alunoRouter';
import atendimentoRouter from './routers/atendimentoRouter';
import institutionRouter from './routers/institutionRouter';
import courseRouter from './routers/courseRouter';
import statsRouter from './routers/statsRouter';
import tecnologiaAssistivaRouter from './routers/tecnologiaAssistivaRouter';
import autenticacaoRouter from './routers/autenticacaoRouter';
import auxiliarRouter from './routers/auxiliarRouter';
import tecnologiaAluno from './routers/tecnologiaAlunoRouter';
import NecessidadeEspecialAluno from './routers/necessidadeEspecialAlunoRouter';
import necessidadeEspecial from './routers/necessidadeEspecialRouter';
import auxiliarDeAcompanhamento from './routers/auxiliarDeAcompanhamentoRouter';

const app = express();

// Configuração do CORS
import auxiliarDeAcompanhamentoRouter from './routers/auxiliarDeAcompanhamentoRouter';

console.log('Router:', auxiliarDeAcompanhamentoRouter);

app.use(
  cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());

// Log para depurar o carregamento das rotas
console.log('[index.ts] Registrando rotas...');
console.log('[index.ts] Importando auxiliarRouter:', auxiliarRouter);

// Rotas principais
app.use('/funcionarios', funcionarioRouter);
app.use('/atendimentos', atendimentoRouter);
app.use('/tecnologias-assistivas', tecnologiaAssistivaRouter);
app.use('/autenticacao', autenticacaoRouter);
app.use('/auxiliar-aluno', auxiliarRouter);
app.use('/auxiliar-acomp', auxiliarDeAcompanhamentoRouter);
app.use('/tech-aluno', tecnologiaAluno);
app.use('/necessidades-especiais-alunos', NecessidadeEspecialAluno);
app.use('/necessidades-especiais', necessidadeEspecial);
app.use('/alunos', alunoRouter);
app.use('/estudantes', alunoRouter);
app.use('/alunos-por-unidade', alunoRouter);

// Rotas com dados na API **Deprecadas**
app.use('/institutions', institutionRouter);
app.use('/courses', courseRouter);
app.use('/stats', statsRouter);
app.use('/students', alunoRouter);

// Rota de fallback para depurar
app.use((req, res) => {
  console.log(`[index.ts] Rota não encontrada: ${req.method} ${req.url}`);
  res.status(404).json({ message: 'Rota não encontrada' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EstatisticaService {
  private baseUrl = 'http://localhost:3000';

  // Endpoint para estatísticas de necessidades especiais
  private apiUrlNecessidades = `${this.baseUrl}/alunos/estatisticas-necessidades`;

  // Endpoint para total de alunos por unidade
  private apiUrlTotalAlunosPorUnidade = `${this.baseUrl}/students/alunos-por-unidade`;

  // Endpoint para total de alunos atendidos
  private apiUrlTotalAtendimentos = `${this.baseUrl}/atendimentos/total`;

  // Endpoint para total de atendimentos
  private apiUrlTotalAtendimentosGeral = `${this.baseUrl}/atendimentos/contagem-geral`;

  // Endpoint para total de tecnologias assistivas
  private apiUrlTotalTecnologiasAssistivas = `${this.baseUrl}/tecnologias-assistivas/contagem-geral`;

  // Endpoint para acompanhamento profissional
  private apiUrlTotalAcompanhamentos = `${this.baseUrl}/auxiliar-aluno/contagem-geral`;

  // Endpoint para atendimentos por mês
  private apiUrlAtendimentosPorMes = `${this.baseUrl}/atendimentos/por-mes`;

  // Endpoint para estatísticas de tecnologia assistiva
  private apiUrlTecnologiasPorTipo = `${this.baseUrl}/tecnologias-assistivas/contagem-por-tipo`;

  constructor(private http: HttpClient) {}

  getEstatisticas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlNecessidades);
  }

  getTotalAlunosPorUnidade(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlTotalAlunosPorUnidade);
  }

  getTotalAtendimentos(): Observable<{ total: number }> {
    return this.http.get<{ total: number }>(this.apiUrlTotalAtendimentos);
  }

  getTotalAtendimentosGeral(): Observable<{ totalAtendimentos: number }> {
    return this.http.get<{ totalAtendimentos: number }>(
      this.apiUrlTotalAtendimentosGeral
    );
  }

  getTotalTecnologiasAssistivas(): Observable<{ totalTecnologias: number }> {
    return this.http.get<{ totalTecnologias: number }>(
      this.apiUrlTotalTecnologiasAssistivas
    );
  }

  getTotalAcompanhamentos(): Observable<{ totalAcompanhamentos: number }> {
    return this.http.get<{ totalAcompanhamentos: number }>(
      this.apiUrlTotalAcompanhamentos
    );
  }

  getAtendimentosPorMes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlAtendimentosPorMes);
  }
  // Método para gráfico de tecnologia assistiva
  getTecnologiasPorTipo(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlTecnologiasPorTipo);
  }
}

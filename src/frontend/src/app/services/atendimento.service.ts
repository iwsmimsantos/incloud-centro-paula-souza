import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Atendimento {
  id_atendimento: number;
  atendimento: string;
  nomeAluno: string;
  profissional: string;
  data_atendimento_inicio?: string;
  data_atendimento_fim?: string;
}

const API_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class AtendimentoService {
  constructor(private http: HttpClient) {}

  getAtendimentos(): Observable<Atendimento[]> {
    return this.http.get<Atendimento[]>(`${API_URL}/atendimentos/`);
  }

  getAtendimentosByAluno(alunoId: number): Observable<Atendimento[]> {
    return this.http.get<Atendimento[]>(`${API_URL}/atendimentos/aluno/${alunoId}`);
  }

  atribuirProfissional(atendimentoId: number, funcionarioId: number): Observable<any> {
    return this.http.put(`${API_URL}/atendimentos/${atendimentoId}/atribuir-profissional`, {
      id_funcionario: funcionarioId
    });
  }

  createAtendimento(atendimento: any): Observable<any> {
    return this.http.post(`${API_URL}/atendimentos`, atendimento);
  }
}

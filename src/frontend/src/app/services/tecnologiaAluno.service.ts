import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interface para representar a relação entre aluno e tecnologia assistiva, incluindo dados da tecnologia
export interface TecnologiaAluno {
  id_aluno: number;
  id_tecnologia: number;
  nome: string;
  descricao?: string;
  tipo?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TecnologiaAlunoService {
  private apiUrl = 'http://localhost:3000/tech-aluno'; // Alinhado com o backend

  constructor(private http: HttpClient) {}

  createTecnologiaAluno(data: { id_aluno: number; id_tecnologia: number }): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  getTecnologiasByAlunoId(idAluno: number): Observable<TecnologiaAluno[]> {
    return this.http.get<TecnologiaAluno[]>(`${this.apiUrl}/aluno/${idAluno}`);
  }

  deleteTecnologiaAlunoByAlunoAndTecnologia(idAluno: number, idTecnologia: number): Observable<any> {
    const body = { id_aluno: idAluno, id_tecnologia: idTecnologia };
    return this.http.delete(this.apiUrl, { body });
  }
}
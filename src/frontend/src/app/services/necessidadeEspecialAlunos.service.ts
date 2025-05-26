import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NecessidadeEspecialAlunoService {
  private apiUrl = 'http://localhost:3000/necessidades-especiais-alunos';

  constructor(private http: HttpClient) {}

  // Método para listar todas as associações entre alunos e necessidades especiais
  getNecessidadesEspeciaisAlunos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  // Método para buscar uma associação por ID
  getNecessidadeEspecialAlunoById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Método para buscar necessidades especiais de um aluno específico
  getNecessidadesByAlunoId(idAluno: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/aluno/${idAluno}`);
  }

  // Método para buscar alunos associados a uma necessidade especial específica
  getAlunosByNecessidadeId(idNecessidade: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/necessidade/${idNecessidade}`);
  }

  // Método para criar uma nova associação entre aluno e necessidade especial
  createNecessidadeEspecialAluno(idAluno: number, idNecessidade: number): Observable<any> {
    const body = { id_aluno: idAluno, id_necessidade: idNecessidade };
    return this.http.post(`${this.apiUrl}`, body);
  }

  // Método para excluir uma associação pelo ID
  deleteNecessidadeEspecialAluno(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Método para excluir uma associação pelo ID do aluno e ID da necessidade especial
  deleteNecessidadeEspecialAlunoByAlunoAndNecessidade(idAluno: number, idNecessidade: number): Observable<any> {
    const body = { id_aluno: idAluno, id_necessidade: idNecessidade };
    return this.http.delete(`${this.apiUrl}`, { body });
  }
}

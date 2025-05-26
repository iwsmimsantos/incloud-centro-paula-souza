import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NecessidadeEspecialService {
  private apiUrl = 'http://localhost:3000/necessidades-especiais';

  constructor(private http: HttpClient) {}

  // Método para listar todas as necessidades especiais
  getNecessidadesEspeciais(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  // Método para buscar uma necessidade especial por ID
  getNecessidadeEspecialById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Método para criar uma nova necessidade especial
  createNecessidadeEspecial(descricao: string): Observable<any> {
    return this.http.post(`${this.apiUrl}`, { descricao });
  }

  // Método para atualizar uma necessidade especial existente
  updateNecessidadeEspecial(id: number, descricao: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, { descricao });
  }

  // Método para excluir uma necessidade especial
  deleteNecessidadeEspecial(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

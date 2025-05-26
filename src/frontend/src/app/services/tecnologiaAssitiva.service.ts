import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TecnologiaAssistiva {
  id_tecnologia: number;
  nome: string;
  descricao?: string;
  tipo?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TecnologiaAssistivaService {
  private apiUrl = 'http://localhost:3000/tecnologias-assistivas'; // URL completa

  constructor(private http: HttpClient) {}

  createTecnologiaAssistiva(tecnologia: TecnologiaAssistiva): Observable<any> {
    return this.http.post(this.apiUrl, tecnologia);
  }

  getAllTecnologiasAssistivas(): Observable<TecnologiaAssistiva[]> {
    return this.http.get<TecnologiaAssistiva[]>(this.apiUrl);
  }

  getTecnologiaAssistivaById(id: number): Observable<TecnologiaAssistiva> {
    return this.http.get<TecnologiaAssistiva>(`${this.apiUrl}/${id}`);
  }

  updateTecnologiaAssistiva(id: number, tecnologia: TecnologiaAssistiva): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, tecnologia);
  }

  deleteTecnologiaAssistiva(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getContagemGeral(): Observable<any> {
    return this.http.get(`${this.apiUrl}/contagem-geral`);
  }

  getContagemPorTipo(): Observable<any> {
    return this.http.get(`${this.apiUrl}/contagem-por-tipo`);
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:3000/api'; // Ajuste conforme seu ambiente

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  constructor(private http: HttpClient) { }

  getFuncionarios(): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}/funcionarios`);
  }
}
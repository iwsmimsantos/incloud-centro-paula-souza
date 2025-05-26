import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const API_URL = 'http://localhost:3000/auxiliar-acomp';

@Injectable({
  providedIn: 'root'
})
export class AuxiliarDeAcompanhamentoService {
  constructor(private http: HttpClient) {}

  getAuxiliares(): Observable<any[]> {
    return this.http.get<any[]>(API_URL).pipe(catchError(this.handleError));
  }

  createAuxiliarAluno(idAluno: number, idAuxiliar: number): Observable<any> {
    return this.http.post(`${API_URL}`, { id_aluno: idAluno, id_auxiliar: idAuxiliar })
      .pipe(catchError(this.handleError));
  }

  deleteAuxiliarAlunoByAlunoAndAuxiliar(idAluno: number, idAuxiliar: number): Observable<any> {
    return this.http.delete(`${API_URL}/by-aluno-auxiliar`, {
      body: { id_aluno: idAluno, id_auxiliar: idAuxiliar }
    }).pipe(catchError(this.handleError));
  }

  adicionarAuxiliar(auxiliar: any): Observable<any> {
    const payload = {
      nome: auxiliar.nome?.trim() || '',
      especializacoes: auxiliar.especializacoes?.trim() || null,
      telefone: auxiliar.telefone?.trim() || null,
      email: auxiliar.email?.trim() || null,
      empresa: auxiliar.empresa?.trim() ?? null
    };

    console.log('Payload enviado ao backend:', payload);
    return this.http.post<any>(API_URL, payload).pipe(catchError(this.handleError));
  }

  updateAuxiliar(id: number, auxiliar: any): Observable<any> {
    return this.http.put<any>(`${API_URL}/${id}`, auxiliar).pipe(catchError(this.handleError));
  }

  deleteAuxiliar(id: number): Observable<any> {
    return this.http.delete<any>(`${API_URL}/${id}`).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocorreu um erro desconhecido.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      errorMessage = `Código do erro: ${error.status}\nMensagem: ${error.message}`;
      if (error.status === 404) {
        errorMessage = 'Recurso não encontrado. Verifique se o servidor está rodando e se a URL está correta.';
      }
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}

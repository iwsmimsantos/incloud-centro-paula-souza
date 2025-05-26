import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuxiliarAlunoService {
  private API_URL = 'http://localhost:3000/auxiliar-aluno';

  constructor(private http: HttpClient) {}

  getAuxiliaresAlunos(): Observable<any[]> {
    return this.http.get<any[]>(this.API_URL).pipe(
      catchError(this.handleError)
    );
  }

  getAuxiliarAlunoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  getAuxiliaresByAlunoId(alunoId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/aluno/${alunoId}`).pipe(
      catchError(this.handleError)
    );
  }

  getAlunosByAuxiliarId(auxiliarId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/auxiliar/${auxiliarId}`).pipe(
      catchError(this.handleError)
    );
  }

  createAuxiliarAluno(idAluno: number, idAuxiliar: number): Observable<any> {
    return this.http.post(this.API_URL, {
      id_aluno: idAluno,
      id_auxiliar: idAuxiliar
    }).pipe(
      catchError(this.handleError)
    );
  }

  deleteAuxiliarAluno(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  deleteAuxiliarAlunoByAlunoAndAuxiliar(idAluno: number, idAuxiliar: number): Observable<any> {
    const url = `${this.API_URL}/by-aluno-auxiliar`;
    const params = {
      id_aluno: idAluno.toString(),
      id_auxiliar: idAuxiliar.toString()
    };
    console.log(`[AuxiliarAlunoService] Enviando DELETE para: ${url}?id_aluno=${idAluno}&id_auxiliar=${idAuxiliar}`);
    return this.http.delete(url, { params }).pipe(
      catchError(this.handleError)
    );
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
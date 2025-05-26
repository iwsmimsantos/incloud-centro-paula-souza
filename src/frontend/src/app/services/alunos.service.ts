import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 * Interface para representar a tabela Aluno no banco local.
 * Ajuste conforme seus campos exatos.
 */
export interface Aluno {
  id_aluno: number;
  nome: string;
  data_nascimento?: string;
  unidade?: string;
  curso?: string;
  turno?: string;
  tipo_necessidade?: string;
  necessita_tecnologia_assistiva?: number;
  necessita_acompanhamento?: number;
  ano_matricula?: string;
  data_da_matricula?: string;
  data_fim_do_curso?: string;
  tipo_do_curso?: string;
  nome_do_responsavel?: string;
  email_do_responsavel?: string;
  telefone_do_responsavel?: string;
  atendimento_unidade_anterior?: string;
  casos_na_familia?: string;
  observacao_casos_familia?: string;
  auxiliares?: number[]; // Alterado para number[], já que o backend espera um array de IDs
}

/**
 * Interface para representar um Auxiliar
 */
export interface Auxiliar {
  id_auxiliar: number;
  nome: string;
  // Outros campos, se necessário
}

@Injectable({
  providedIn: 'root',
})
export class AlunoService {
  private API_URL = 'http://localhost:3000/alunos'; // URL base para alunos
  private AUXILIAR_URL = 'http://localhost:3000/auxiliares'; // URL base para auxiliares

  constructor(private http: HttpClient) {}

  /**
   * Busca todos os alunos (GET /alunos)
   */
  getAlunos(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(`${this.API_URL}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Busca um aluno específico por ID (GET /alunos/:id)
   */
  getAlunoById(id: number): Observable<Aluno> {
    return this.http.get<Aluno>(`${this.API_URL}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Cria um novo aluno (POST /alunos)
   */
  createAluno(aluno: Partial<Aluno>): Observable<any> {
    return this.http.post<any>(`${this.API_URL}`, aluno).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Atualiza os dados de um aluno existente (PUT /alunos/:id)
   */
  updateAluno(id: number, aluno: Partial<Aluno> & { auxiliares?: number[] }): Observable<any> {
    return this.http.put<any>(`${this.API_URL}/${id}`, aluno).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Deleta um aluno pelo ID (DELETE /alunos/:id)
   */
  deleteAluno(id: number): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Obter o curso de um aluno (GET /alunos/:id/curso)
   */
  getCursoByAlunoId(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/${id}/curso`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Obter a unidade de um aluno (GET /alunos/:id/unidade)
   */
  getUnidadeByAlunoId(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/${id}/unidade`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Lista todos os cursos (GET /alunos/cursos)
   */
  getCursosDosAlunos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/cursos`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Lista todas as unidades (GET /alunos/todas-unidades)
   */
  getUnidadeDosAlunos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/todas-unidades`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Alunos que precisam de tecnologia assistiva (GET /alunos/tecnologia-assistiva/true)
   */
  getAlunosComTecnologiaAssistiva(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(`${this.API_URL}/tecnologia-assistiva/true`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Alunos que NÃO precisam de tecnologia assistiva (GET /alunos/tecnologia-assistiva/false)
   */
  getAlunosSemTecnologiaAssistiva(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(`${this.API_URL}/tecnologia-assistiva/false`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Contagem de alunos que precisam de tecnologia assistiva (GET /alunos/tecnologia-assistiva/contagem)
   */
  countAlunosComTecnologiaAssistiva(): Observable<number> {
    return this.http.get<number>(`${this.API_URL}/tecnologia-assistiva/contagem`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Status de tecnologia assistiva de um aluno específico (GET /alunos/:id/tecnologia-assistiva)
   */
  getStatusTecnologiaAssistivaById(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/${id}/tecnologia-assistiva`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Alunos que precisam de acompanhamento (GET /alunos/acompanhamento/true)
   */
  getAlunosComAcompanhamento(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(`${this.API_URL}/acompanhamento/true`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Alunos que NÃO precisam de acompanhamento (GET /alunos/acompanhamento/false)
   */
  getAlunosSemAcompanhamento(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(`${this.API_URL}/acompanhamento/false`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Contagem de alunos que precisam de acompanhamento (GET /alunos/acompanhamento/contagem)
   */
  countAlunosComAcompanhamento(): Observable<number> {
    return this.http.get<number>(`${this.API_URL}/acompanhamento/contagem`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Status de acompanhamento de um aluno específico (GET /alunos/:id/acompanhamento)
   */
  getStatusAcompanhamentoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/${id}/acompanhamento`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Contagem total de alunos (GET /alunos/contagem)
   */
  countTotalAlunos(): Observable<number> {
    return this.http.get<number>(`${this.API_URL}/contagem`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Data de matrícula de um aluno específico (GET /alunos/:id/data-matricula)
   */
  getDataMatriculaById(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/${id}/data-matricula`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Tipo de curso de um aluno específico (GET /alunos/:id/tipo-curso)
   */
  getTipoCursoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/${id}/tipo-curso`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Contagem de alunos por unidade (GET /alunos/alunos-por-unidade)
   */
  getAlunosPorUnidade(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/alunos-por-unidade`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Busca todos os auxiliares disponíveis (GET /auxiliares)
   */
  getAuxiliares(): Observable<Auxiliar[]> {
    return this.http.get<Auxiliar[]>(`${this.AUXILIAR_URL}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Busca os auxiliares associados a um aluno específico (GET /alunos/:id/auxiliares)
   */
  getAuxiliaresByAlunoId(id: number): Observable<Auxiliar[]> {
    return this.http.get<Auxiliar[]>(`${this.API_URL}/${id}/auxiliares`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Tratamento de erros para requisições HTTP
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocorreu um erro desconhecido.';
    if (error.error instanceof ErrorEvent) {
      // Erro do lado do cliente
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      // Erro do lado do servidor
      errorMessage = `Código do erro: ${error.status}\nMensagem: ${error.message}`;
      if (error.status === 404) {
        errorMessage = 'Recurso não encontrado. Verifique se o servidor está rodando e se a URL está correta.';
      }
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
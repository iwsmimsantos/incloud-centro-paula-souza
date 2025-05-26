import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BackButtonComponent } from '../../components/back-button/back-button.component';
import { SearchComponent } from '../../components/search/search.component';
import { NextPageComponent } from '../../components/next-page/next-page.component';
import { AlunoService } from '../../services/alunos.service';
import { forkJoin, of } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';

interface Aluno {
  id: number;
  nome: string;
  tipo_necessidade: string;
  curso: string;
  unidade: string;
}

@Component({
  selector: 'app-alunos-cadastrados',
  standalone: true,
  imports: [CommonModule, BackButtonComponent, SearchComponent, NextPageComponent],
  templateUrl: './alunos-cadastrados.component.html',
  styleUrls: ['./alunos-cadastrados.component.css']
})
export class AlunosCadastradosComponent implements OnInit {
  allAlunos: Aluno[] = [];
  filteredAlunos: Aluno[] = [];
  displayedAlunos: Aluno[] = [];
  sortColumn: keyof Aluno = 'nome';
  sortDirection: 'asc' | 'desc' = 'asc';
  currentPage: number = 1;
  pageSize: number = 10;
  searchTerm: string = '';
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private alunoService: AlunoService
  ) {}

  ngOnInit(): void {
    this.loadAlunosData();
  }

  loadAlunosData(): void {
    this.isLoading = true;

    this.alunoService.getAlunos().pipe(
      take(1),
      switchMap(alunos => {
        const observables = alunos.map(aluno =>
          this.alunoService.getAlunoById(aluno.id_aluno).pipe(
            take(1),
            catchError(() => of(null))
          )
        );
        return forkJoin(observables);
      }),
      map(responses => responses
        .filter(a => a !== null)
        .map(aluno => ({
          id: aluno.id_aluno,
          nome: aluno.nome,
          tipo_necessidade: aluno.tipo_necessidade || 'N/A',
          curso: aluno.curso || 'N/A',
          unidade: aluno.unidade || 'N/A'
        } as Aluno))
      )
    ).subscribe({
      next: (alunosFormatados) => {
        this.allAlunos = alunosFormatados;
        this.applyFiltersAndSort();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar dados dos alunos:', error);
        this.isLoading = false;
      }
    });
  }

  onSearchChanged(term: string): void {
    this.searchTerm = term;
    this.currentPage = 1;
    this.applyFiltersAndSort();
  }

  onFilterClicked(): void {
    console.log('Filtros avançados solicitados');
  }

  sortBy(column: keyof Aluno): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.applyFiltersAndSort();
  }

  navigateToStudentDetails(id: number): void {
    this.router.navigate(['/alunos', id]);
  }

  navigateToAddAluno() {
    this.router.navigate(['/add-aluno']);
  }

  onPageChanged(page: number): void {
    this.currentPage = page;
    this.updateDisplayedAlunos();
  }

  applyFiltersAndSort(): void {
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      this.filteredAlunos = this.allAlunos.filter(aluno =>
        aluno.nome.toLowerCase().includes(term) ||
        aluno.tipo_necessidade.toLowerCase().includes(term) ||
        aluno.curso.toLowerCase().includes(term) ||
        aluno.unidade.toLowerCase().includes(term)
      );
    } else {
      this.filteredAlunos = [...this.allAlunos];
    }

    this.filteredAlunos.sort((a, b) => {
      const valueA = a[this.sortColumn];
      const valueB = b[this.sortColumn];
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return this.sortDirection === 'asc'
          ? valueA.localeCompare(valueB, 'pt-BR')
          : valueB.localeCompare(valueA, 'pt-BR');
      }
      return 0;
    });

    this.updateDisplayedAlunos();
  }

  updateDisplayedAlunos(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.displayedAlunos = this.filteredAlunos.slice(startIndex, startIndex + this.pageSize);
  }

  getAriaSort(coluna: keyof Aluno): 'ascending' | 'descending' | 'none' {
    if (this.sortColumn !== coluna) return 'none';
    return this.sortDirection === 'asc' ? 'ascending' : 'descending';
  }
}

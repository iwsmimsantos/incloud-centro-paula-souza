import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackButtonComponent } from '../../components/back-button/back-button.component';
import { SearchComponent } from '../../components/search/search.component';
import { NextPageComponent } from '../../components/next-page/next-page.component';
import { AtendimentoService, Atendimento } from '../../services/atendimento.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Aluno {
  id_aluno: number;
  nome: string;
}

interface Profissional {
  id_funcionario: number;
  nome: string;
}

@Component({
  selector: 'app-historico',
  standalone: true,
  imports: [
    CommonModule, 
    BackButtonComponent, 
    SearchComponent, 
    NextPageComponent,
    ReactiveFormsModule
  ],
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css']
})
export class HistoricoComponent implements OnInit {
  // Todos os atendimentos vindos do banco
  allAtendimentos: Atendimento[] = [];

  // Atendimentos exibidos (após filtro e paginação)
  atendimentos: Atendimento[] = [];

  // Listas para os dropdowns
  alunos: Aluno[] = [];
  profissionais: Profissional[] = [];

  // Paginação
  currentPage: number = 1;
  pageSize: number = 9;
  totalItems: number = 0;

  // Ordenação
  sortField: string = 'atendimento';
  sortDirection: 'asc' | 'desc' = 'desc';

  // Termo de busca
  searchTerm: string = '';

  showModal = false;
  atendimentoForm: FormGroup;

  constructor(
    private atendimentoService: AtendimentoService,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {
    this.atendimentoForm = this.formBuilder.group({
      idAluno: ['', Validators.required],
      idFuncionario: ['', Validators.required],
      dataInicio: ['', Validators.required],
      dataFim: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.carregarAtendimentos();
    this.carregarAlunos();
    this.carregarProfissionais();
  }

  carregarAtendimentos(): void {
    this.atendimentoService.getAtendimentos().subscribe({
      next: (dados) => {
        this.allAtendimentos = dados;
        this.totalItems = dados.length;
        this.applyFilters();
      },
      error: (err) => {
        console.error('Erro ao buscar atendimentos:', err);
      }
    });
  }

  carregarAlunos(): void {
    this.http.get<Aluno[]>('http://localhost:3000/alunos').subscribe({
      next: (data) => {
        this.alunos = data;
        console.log('Alunos carregados:', this.alunos);
      },
      error: (error) => {
        console.error('Erro ao carregar alunos:', error);
      }
    });
  }
  
  carregarProfissionais(): void {
    this.http.get<any[]>('http://localhost:3000/funcionarios').subscribe({
      next: (data) => {
        // Mapear os dados retornados para a estrutura esperada
        this.profissionais = data.map(item => ({
          // Use o campo correto da API (id ou id_funcionario)
          id_funcionario: item.id || item.id_funcionario,
          nome: item.nome
        }));
        console.log('Dados brutos dos profissionais:', data);
        console.log('Profissionais mapeados:', this.profissionais);
      },
      error: (error) => {
        console.error('Erro ao carregar profissionais:', error);
      }
    });
  }

  onSearch(term: string): void {
    this.searchTerm = term;
    this.currentPage = 1;
    this.applyFilters();
  }

  aoClicarAdicionar(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.atendimentoForm.reset();
  }

  onOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.closeModal();
    }
  }

  submitAtendimento(): void {
    if (this.atendimentoForm.valid) {
      const formData = this.atendimentoForm.value;
      console.log('Dados originais do formulário:', formData);
      
      // Assegura que os IDs sejam números válidos
      const idAluno = parseInt(formData.idAluno, 10);
      let idFuncionario = parseInt(formData.idFuncionario, 10);
      
      // Verifica se os valores parseados são válidos
      if (isNaN(idAluno)) {
        alert('O ID do aluno deve ser um número válido.');
        return;
      }
      
      // Se o ID do funcionário for inválido, tenta buscar pelo objeto selecionado
      if (isNaN(idFuncionario)) {
        const profSelecionado = this.profissionais.find(p => p.nome === formData.idFuncionario);
        if (profSelecionado) {
          idFuncionario = profSelecionado.id_funcionario;
        } else {
          alert('O ID do profissional é inválido.');
          return;
        }
      }
      
      // Preparar os dados para envio
      const atendimentoData = {
        id_aluno: idAluno,
        id_funcionario: idFuncionario,
        data_atendimento_inicio: formData.dataInicio || null,
        data_atendimento_fim: formData.dataFim || null
      };
      
      console.log('Dados a serem enviados para o backend:', atendimentoData);
      
      this.atendimentoService.createAtendimento(atendimentoData).subscribe({
        next: (response) => {
          console.log('Atendimento registrado com sucesso:', response);
          this.closeModal();
          this.carregarAtendimentos(); // Recarrega a lista de atendimentos
        },
        error: (err) => {
          console.error('Erro ao registrar atendimento:', err);
          alert(`Erro ao registrar atendimento: ${err.error?.message || 'Erro no servidor'}`);
        }
      });
    } else {
      Object.keys(this.atendimentoForm.controls).forEach(key => {
        this.atendimentoForm.get(key)?.markAsTouched();
      });
    }
  }

  onPageChanged(page: number): void {
    this.currentPage = page;
    this.applyFilters();
  }

  toggleSort(field: string): void {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'desc';
    }
    this.applyFilters();
  }

  private applyFilters(): void {
    let filtered = this.allAtendimentos;

    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(item =>
        item.atendimento.toLowerCase().includes(term) ||
        item.nomeAluno.toLowerCase().includes(term) ||
        item.profissional.toLowerCase().includes(term)
      );
    }

    filtered = this.sortData(filtered);
    this.totalItems = filtered.length;

    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.atendimentos = filtered.slice(startIndex, startIndex + this.pageSize);
  }

  private sortData(data: Atendimento[]): Atendimento[] {
    return [...data].sort((a, b) => {
      // Pega o valor a ser ordenado (campo definido em sortField)
      const valueA = a[this.sortField as keyof Atendimento] ?? '';
      const valueB = b[this.sortField as keyof Atendimento] ?? '';

      // Extrai apenas os dígitos para fazer uma comparação numérica
      const numA = parseInt(String(valueA).replace(/\D+/g, ''), 10);
      const numB = parseInt(String(valueB).replace(/\D+/g, ''), 10);

      // Se ambos os valores forem números válidos, faz a comparação numérica
      if (!isNaN(numA) && !isNaN(numB)) {
        return this.sortDirection === 'asc' ? numA - numB : numB - numA;
      }

      // Caso contrário, usa a comparação alfanumérica
      if (valueA < valueB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valueA > valueB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  getAriaSort(coluna: string): 'ascending' | 'descending' | 'none' {
    if (this.sortField !== coluna) return 'none';
    return this.sortDirection === 'asc' ? 'ascending' : 'descending';
  }
}

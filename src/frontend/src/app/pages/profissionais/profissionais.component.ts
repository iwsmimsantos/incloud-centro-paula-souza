import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BackButtonComponent } from '../../components/back-button/back-button.component';
import { SearchComponent } from '../../components/search/search.component';
import { NextPageComponent } from '../../components/next-page/next-page.component';
import { AddProfissionalModalComponent } from '../add-profissional/add-profissional-modal.component';
import { AuxiliarDeAcompanhamentoService } from '../../services/auxiliarDeAcompanhamento.service';
import { TelefoneFormatPipe } from '../../pipes/telefone-format.pipe';

interface Profissional {
  id: number;
  nome: string;
  especialidade: string;
  telefone: string;
  email: string;
}

@Component({
  selector: 'app-profissionais',
  standalone: true,
  imports: [
    CommonModule, 
    BackButtonComponent, 
    SearchComponent, 
    NextPageComponent,
    AddProfissionalModalComponent,
    TelefoneFormatPipe
  ],
  templateUrl: './profissionais.component.html',
  styleUrl: './profissionais.component.css'
})
export class ProfissionaisComponent implements OnInit {
  @ViewChild('modalAdd') modalAdd!: AddProfissionalModalComponent;

  profissionaisTotais: Profissional[] = [];
  profissionaisFiltrados: Profissional[] = [];
  profissionaisExibidos: Profissional[] = [];

  colunaOrdenacao: keyof Profissional = 'nome';
  direcaoOrdenacao: 'asc' | 'desc' = 'asc';

  paginaAtual: number = 1;
  itensPorPagina: number = 10;

  termoBusca: string = '';

  constructor(
    private roteador: Router,
    private auxiliarService: AuxiliarDeAcompanhamentoService
  ) {}

  ngOnInit(): void {
    this.carregarProfissionais();
  }

  carregarProfissionais(): void {
    this.auxiliarService.getAuxiliares().subscribe({
      next: (dados: any[]) => {
        this.profissionaisTotais = dados.map((aux) => ({
          id: aux.id_auxiliar,
          nome: aux.nome,
          especialidade: aux.especializacoes || 'Não informado',
          telefone: aux.telefone || '',  // Mudamos para vazio, o pipe cuidará da mensagem
          email: aux.email || 'Sem email'
        }));
        this.aplicarFiltrosEOrdenacao();
      },
      error: (err) => {
        console.error('Erro ao carregar auxiliares:', err);
      }
    });
  }

  aoClicarAdicionar(): void {
    this.modalAdd.abrir();
  }

  onModalClosed(): void {
    // Callback quando o modal é fechado sem salvar
  }

  onProfissionalSaved(profissional: any): void {
    console.log('Salvando profissional:', profissional);
    
    // Certifique-se de que o telefone é passado no formato correto ao backend
    // O backend deve receber o telefone já formatado pelo componente modal
    
    this.auxiliarService.adicionarAuxiliar(profissional).subscribe({
      next: (resposta) => {
        console.log('Profissional adicionado com sucesso', resposta);
        
        // Atualiza a lista de profissionais
        this.carregarProfissionais();
        
        // Exibir mensagem de sucesso
        alert('Profissional adicionado com sucesso!');
      },
      error: (erro) => {
        console.error('Erro ao adicionar profissional:', erro);
        
        let mensagemErro = 'Erro ao adicionar profissional.';
        
        // Verifica mensagens de erro específicas
        if (erro.error && erro.error.message) {
          mensagemErro += ' Detalhe: ' + erro.error.message;
        }
        
        // Verificar mais informações de erro que podem estar disponíveis
        if (erro.message) {
          console.log('Mensagem de erro:', erro.message);
        }
        
        alert(mensagemErro);
      }
    });
  }

  aoMudarBusca(termo: string): void {
    this.termoBusca = termo;
    this.paginaAtual = 1;
    this.aplicarFiltrosEOrdenacao();
  }

  ordenarPor(coluna: keyof Profissional): void {
    if (this.colunaOrdenacao === coluna) {
      this.direcaoOrdenacao = this.direcaoOrdenacao === 'asc' ? 'desc' : 'asc';
    } else {
      this.colunaOrdenacao = coluna;
      this.direcaoOrdenacao = 'asc';
    }
    this.aplicarFiltrosEOrdenacao();
  }

  navegarParaDetalhesProfissional(id: number): void {
    this.roteador.navigate(['/profissionais', id]);
  }

  aoMudarPagina(pagina: number): void {
    this.paginaAtual = pagina;
    this.atualizarProfissionaisExibidos();
  }

  aplicarFiltrosEOrdenacao(): void {
    if (this.termoBusca.trim()) {
      const termo = this.termoBusca.toLowerCase();
      this.profissionaisFiltrados = this.profissionaisTotais.filter(prof => 
        prof.nome.toLowerCase().includes(termo) ||
        prof.especialidade.toLowerCase().includes(termo) ||
        prof.email.toLowerCase().includes(termo)
      );
    } else {
      this.profissionaisFiltrados = [...this.profissionaisTotais];
    }

    this.profissionaisFiltrados.sort((a, b) => {
      const valorA = a[this.colunaOrdenacao];
      const valorB = b[this.colunaOrdenacao];

      if (typeof valorA === 'string' && typeof valorB === 'string') {
        return this.direcaoOrdenacao === 'asc'
          ? valorA.localeCompare(valorB, 'pt-BR')
          : valorB.localeCompare(valorA, 'pt-BR');
      }

      if (valorA < valorB) return this.direcaoOrdenacao === 'asc' ? -1 : 1;
      if (valorA > valorB) return this.direcaoOrdenacao === 'asc' ? 1 : -1;
      return 0;
    });

    this.atualizarProfissionaisExibidos();
  }

  atualizarProfissionaisExibidos(): void {
    const indiceInicial = (this.paginaAtual - 1) * this.itensPorPagina;
    this.profissionaisExibidos = this.profissionaisFiltrados.slice(indiceInicial, indiceInicial + this.itensPorPagina);
  }

  getAriaSort(coluna: string): 'ascending' | 'descending' | 'none' {
    if (this.colunaOrdenacao !== coluna) return 'none';
    return this.direcaoOrdenacao === 'asc' ? 'ascending' : 'descending';
  }
}
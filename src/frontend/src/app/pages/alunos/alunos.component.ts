import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlunoService, Aluno } from '../../services/alunos.service';
import { AuxiliarDeAcompanhamentoService } from '../../services/auxiliarDeAcompanhamento.service';
import { AuxiliarAlunoService } from '../../services/auxiliar-aluno.service';
import { TecnologiaAssistivaService, TecnologiaAssistiva } from '../../services/tecnologiaAssitiva.service';
import { TecnologiaAlunoService, TecnologiaAluno } from '../../services/tecnologiaAluno.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BackButtonComponent } from '../../components/back-button/back-button.component';
import { forkJoin } from 'rxjs';

// Interface para tipar os auxiliares
interface Auxiliar {
  id_auxiliar: number;
  nome: string;
}

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BackButtonComponent],
})
export class AlunosComponent implements OnInit {
  aluno: Aluno | null = null;
  alunoOriginal: Aluno | null = null; // Para armazenar os dados originais do backend
  auxiliares: Auxiliar[] = [];
  auxiliaresSelecionados: Auxiliar[] = [];
  tecnologiasAssistivas: TecnologiaAssistiva[] = [];
  tecnologiasSelecionadas: TecnologiaAluno[] = [];
  error: string | null = null;
  loading: boolean = false;
  id: number = 0;
  form: FormGroup;
  isInclusaoUser: boolean = false;
  isNovaTecnologiaValidValue: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alunoService: AlunoService,
    private auxiliarDeAcompanhamentoService: AuxiliarDeAcompanhamentoService,
    private auxiliarAlunoService: AuxiliarAlunoService,
    private tecnologiaAssistivaService: TecnologiaAssistivaService,
    private tecnologiaAlunoService: TecnologiaAlunoService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      tecnologiaAssistiva: ['', Validators.required],
      acompanhamentoProfissional: ['', Validators.required],
      novoAuxiliar: [''],
      novaTecnologia: [null],
      necessidade: ['', this.isInclusaoUser ? Validators.required : []],
      observacaoCasosFamilia: [''],
    });

    this.form.get('novaTecnologia')?.valueChanges.subscribe(value => {
      this.isNovaTecnologiaValidValue = this.isNovaTecnologiaValid();
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'] || 0;
      if (this.id) {
        console.log(`Carregando dados para o aluno com ID: ${this.id}`);
        this.loadData();
      } else {
        console.log('Nenhum ID fornecido na rota. Mostrando mensagem padrão.');
        this.error = 'Por favor, acesse a página com um ID de aluno válido (exemplo: /alunos/3).';
      }
    });
  }

  loadData(): void {
    this.loading = true;
    forkJoin({
      aluno: this.alunoService.getAlunoById(this.id),
      auxiliares: this.auxiliarDeAcompanhamentoService.getAuxiliares(),
      auxiliaresAtuais: this.auxiliarAlunoService.getAuxiliaresByAlunoId(this.id),
      tecnologiasAssistivas: this.tecnologiaAssistivaService.getAllTecnologiasAssistivas(),
      tecnologiasAtuais: this.tecnologiaAlunoService.getTecnologiasByAlunoId(this.id),
    }).subscribe({
      next: ({ aluno, auxiliares, auxiliaresAtuais, tecnologiasAssistivas, tecnologiasAtuais }) => {
        // Armazenar os dados originais do aluno
        this.alunoOriginal = { ...aluno };

        // Formatar as datas para exibição no frontend
        if (aluno.data_nascimento) {
          const dataNascimento = new Date(aluno.data_nascimento);
          aluno.data_nascimento = dataNascimento.toLocaleDateString('pt-BR');
        }
        if (aluno.data_da_matricula) {
          const dataMatricula = new Date(aluno.data_da_matricula);
          aluno.data_da_matricula = dataMatricula.toLocaleDateString('pt-BR');
        }
        if (aluno.data_fim_do_curso) {
          const dataFimCurso = new Date(aluno.data_fim_do_curso);
          aluno.data_fim_do_curso = dataFimCurso.toLocaleDateString('pt-BR');
        }

        console.log('Dados do aluno recebidos:', aluno);
        this.aluno = aluno;
        this.auxiliares = auxiliares || [];
        console.log('Auxiliares carregados:', this.auxiliares);

        console.log('Auxiliares atuais recebidos do backend:', auxiliaresAtuais);
        this.auxiliaresSelecionados = auxiliaresAtuais.map((aux: any) => ({
          id_auxiliar: aux.id_auxiliar,
          nome: aux.nome || 'Desconhecido'
        })) || [];
        console.log('Auxiliares selecionados:', this.auxiliaresSelecionados);

        this.tecnologiasAssistivas = tecnologiasAssistivas || [];
        console.log('Tecnologias Assistivas carregadas:', this.tecnologiasAssistivas);
        this.tecnologiasAssistivas.forEach(tec => {
          console.log('Tecnologia Assistiva:', tec);
        });
        this.tecnologiasSelecionadas = tecnologiasAtuais || [];
        console.log('Tecnologias associadas ao aluno:', this.tecnologiasSelecionadas);

        this.error = null;
        this.loading = false;

        if (this.aluno) {
          const tecnologiaAssistivaValue = this.tecnologiasSelecionadas.length > 0 ? 'sim' : (this.aluno.necessita_tecnologia_assistiva === 1 ? 'sim' : 'não');
          const acompanhamentoProfissionalValue = this.aluno.necessita_acompanhamento === 1 ? 'sim' : 'não';
          console.log('Valor de tecnologiaAssistiva:', tecnologiaAssistivaValue);
          console.log('Valor de acompanhamentoProfissional:', acompanhamentoProfissionalValue);
          this.form.patchValue({
            tecnologiaAssistiva: tecnologiaAssistivaValue,
            acompanhamentoProfissional: acompanhamentoProfissionalValue,
            necessidade: this.aluno.tipo_necessidade || '',
            observacaoCasosFamilia: this.aluno.observacao_casos_familia || '',
          });
        }
      },
      error: (err: HttpErrorResponse) => {
        console.error('Erro ao carregar dados:', err);
        if (err.status === 404) {
          this.error = 'Aluno ou auxiliares não encontrados.';
          this.aluno = null;
        } else {
          this.error = 'Erro ao carregar dados: ' + err.message;
        }
        this.loading = false;
        alert('Erro ao carregar dados. Verifique o console para mais detalhes.');
      },
    });
  }

  // Função para formatar datas no formato YYYY-MM-DD
  private formatDateForBackend(date: string | Date | undefined): string | undefined {
    if (!date) return undefined;
    const d = new Date(date);
    if (isNaN(d.getTime())) return undefined; // Verifica se a data é inválida
    return d.toISOString().split('T')[0]; // Retorna no formato YYYY-MM-DD
  }

  onNovaTecnologiaChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    console.log('Nova Tecnologia selecionada:', selectElement.value);
    console.log('FormControl novaTecnologia:', this.form.get('novaTecnologia')?.value);
  }

  adicionarAuxiliar(): void {
    const idAuxiliar = this.form.get('novoAuxiliar')?.value;
    if (idAuxiliar) {
      const idNum = parseInt(idAuxiliar, 10);
      if (this.auxiliaresSelecionados.some(aux => aux.id_auxiliar === idNum)) {
        alert('Este auxiliar já está vinculado ao aluno.');
        return;
      }
      this.auxiliarAlunoService.createAuxiliarAluno(this.id, idNum).subscribe({
        next: () => {
          this.carregarAuxiliaresAtuais();
          this.form.get('novoAuxiliar')?.setValue('');
          alert('Auxiliar adicionado com sucesso!');
        },
        error: (err: HttpErrorResponse) => {
          console.error('Erro ao adicionar auxiliar:', err);
          alert('Erro ao adicionar auxiliar. Verifique o console para mais detalhes.');
        },
      });
    } else {
      alert('Por favor, selecione um auxiliar para adicionar.');
    }
  }

  removerAuxiliar(idAuxiliar: number): void {
    this.auxiliarAlunoService.deleteAuxiliarAlunoByAlunoAndAuxiliar(this.id, idAuxiliar).subscribe({
      next: () => {
        this.carregarAuxiliaresAtuais();
        alert('Auxiliar removido com sucesso!');
      },
      error: (err: HttpErrorResponse) => {
        console.error('Erro ao remover auxiliar:', err);
        alert('Erro ao remover auxiliar. Verifique o console para mais detalhes.');
      },
    });
  }

  carregarAuxiliaresAtuais(): void {
    if (!this.id) return;
    console.log(`Tentando buscar auxiliares para o aluno com ID: ${this.id}`);
    this.auxiliarAlunoService.getAuxiliaresByAlunoId(this.id).subscribe({
      next: (response: Auxiliar[]) => {
        this.auxiliaresSelecionados = response || [];
        this.error = null;
        console.log('Auxiliares atuais carregados:', this.auxiliaresSelecionados);
      },
      error: (err: HttpErrorResponse) => {
        this.error = 'Erro ao carregar auxiliares atuais: ' + err.message;
        console.error('Erro ao carregar auxiliares atuais:', err);
      },
    });
  }

  adicionarTecnologia(): void {
    if (!this.isNovaTecnologiaValidValue) {
      alert('Por favor, selecione uma tecnologia válida antes de adicionar.');
      return;
    }

    const idTecnologia = this.form.get('novaTecnologia')?.value;
    if (idTecnologia) {
      const idNum = parseInt(idTecnologia, 10);
      if (this.tecnologiasSelecionadas.some(tec => tec.id_tecnologia === idNum)) {
        alert('Esta tecnologia já está vinculada ao aluno.');
        return;
      }
      this.tecnologiaAlunoService.createTecnologiaAluno({ id_aluno: this.id, id_tecnologia: idNum }).subscribe({
        next: () => {
          this.carregarTecnologiasAtuais();
          this.form.get('novaTecnologia')?.setValue(null);
          alert('Tecnologia adicionada com sucesso!');
        },
        error: (err: HttpErrorResponse) => {
          console.error('Erro ao adicionar tecnologia:', err);
          alert('Erro ao adicionar tecnologia: ' + (err.error?.message || err.message));
        },
      });
    }
  }

  removerTecnologia(idTecnologia: number): void {
    this.tecnologiaAlunoService.deleteTecnologiaAlunoByAlunoAndTecnologia(this.id, idTecnologia).subscribe({
      next: () => {
        this.carregarTecnologiasAtuais();
        alert('Tecnologia removida com sucesso!');
      },
      error: (err: HttpErrorResponse) => {
        console.error('Erro ao remover tecnologia:', err);
        alert('Erro ao remover tecnologia. Verifique o console.');
      },
    });
  }

  carregarTecnologiasAtuais(): void {
    if (!this.id) return;
    this.tecnologiaAlunoService.getTecnologiasByAlunoId(this.id).subscribe({
      next: (response) => {
        this.tecnologiasSelecionadas = response || [];
        console.log('Tecnologias atuais carregadas:', this.tecnologiasSelecionadas);
        const tecnologiaAssistivaValue = this.tecnologiasSelecionadas.length > 0 ? 'sim' : (this.aluno?.necessita_tecnologia_assistiva === 1 ? 'sim' : 'não');
        this.form.patchValue({
          tecnologiaAssistiva: tecnologiaAssistivaValue,
        });
      },
      error: (err: HttpErrorResponse) => {
        console.error('Erro ao carregar tecnologias:', err);
      },
    });
  }

  salvar(): void {
    if (!this.form.valid) {
      console.log('Formulário inválido:', this.form.errors);
      Object.keys(this.form.controls).forEach(key => {
        const control = this.form.get(key);
        if (control?.invalid) {
          console.log(`Campo ${key} inválido:`, control.errors);
          control.markAsTouched();
        }
      });
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (!this.id || !this.aluno || !this.alunoOriginal) {
      console.log('ID do aluno ou dados do aluno não encontrados.');
      alert('ID do aluno ou dados do aluno não encontrados.');
      return;
    }

    // Validação de tecnologias e auxiliares
    const tecnologiaAssistiva = this.form.get('tecnologiaAssistiva')?.value;
    if (tecnologiaAssistiva === 'sim' && this.tecnologiasSelecionadas.length === 0) {
      alert('Por favor, adicione pelo menos uma tecnologia assistiva.');
      return;
    }

    const acompanhamentoProfissional = this.form.get('acompanhamentoProfissional')?.value;
    if (acompanhamentoProfissional === 'sim' && this.auxiliaresSelecionados.length === 0) {
      alert('Por favor, adicione pelo menos um auxiliar.');
      return;
    }

    const alunoData = this.form.value;
    // Enviar TODOS os campos do aluno, usando os dados originais e formatando as datas corretamente
    const filteredData: Partial<Aluno> = {
      id_aluno: this.id,
      nome: this.aluno.nome,
      data_nascimento: this.formatDateForBackend(this.alunoOriginal.data_nascimento),
      unidade: this.aluno.unidade || undefined,
      curso: this.aluno.curso || undefined,
      turno: this.aluno.turno || undefined,
      tipo_necessidade: alunoData.necessidade || undefined,
      necessita_tecnologia_assistiva: alunoData.tecnologiaAssistiva === 'sim' ? 1 : 0,
      necessita_acompanhamento: alunoData.acompanhamentoProfissional === 'sim' ? 1 : 0,
      ano_matricula: this.aluno.ano_matricula || undefined,
      data_da_matricula: this.formatDateForBackend(this.alunoOriginal.data_da_matricula),
      data_fim_do_curso: this.formatDateForBackend(this.alunoOriginal.data_fim_do_curso),
      tipo_do_curso: this.aluno.tipo_do_curso || undefined,
      nome_do_responsavel: this.aluno.nome_do_responsavel || undefined,
      email_do_responsavel: this.aluno.email_do_responsavel || undefined,
      telefone_do_responsavel: this.aluno.telefone_do_responsavel || undefined,
      atendimento_unidade_anterior: this.aluno.atendimento_unidade_anterior || undefined,
      casos_na_familia: this.aluno.casos_na_familia || undefined,
      observacao_casos_familia: alunoData.observacaoCasosFamilia || undefined,
    };

    console.log('Dados enviados para atualização:', JSON.stringify(filteredData, null, 2));
    this.alunoService.updateAluno(this.id, filteredData).subscribe({
      next: () => {
        console.log('Aluno atualizado com sucesso');
        alert('Aluno atualizado com sucesso!');
        this.router.navigate(['/alunoscadastrados']);
      },
      error: (err: HttpErrorResponse) => {
        console.error('Erro ao atualizar aluno:', err);
        console.error('Detalhes do erro:', err.error);
        alert('Erro ao atualizar aluno: ' + (err.error?.message || err.message));
      },
    });
  }

  cancelar(): void {
    this.router.navigate(['/alunoscadastrados']);
  }

  getAuxiliaresDisponiveis(): Auxiliar[] {
    return this.auxiliares.filter(
      aux => !this.auxiliaresSelecionados.some(selected => selected.id_auxiliar === aux.id_auxiliar)
    );
  }

  isNovaTecnologiaValid(): boolean {
    const value = this.form.get('novaTecnologia')?.value;
    const isValid = value != null && value !== '' && value !== undefined && !isNaN(parseInt(value, 10)) && parseInt(value, 10) > 0;
    return isValid;
  }
}
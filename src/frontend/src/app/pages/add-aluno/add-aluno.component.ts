import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlunoService } from '../../services/alunos.service';

@Component({
  selector: 'app-add-aluno',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-aluno.component.html',
  styleUrls: ['./add-aluno.component.css']
})
export class AddAlunoComponent implements OnInit {
  alunoForm: FormGroup;
  unidades: string[] = [];
  cursos: string[] = [];
  loading = false;
  notification = { message: '', visible: false, type: '' };
  
  constructor(
    private fb: FormBuilder,
    private alunoService: AlunoService,
    private router: Router
  ) {
    this.alunoForm = this.fb.group({
      nome: ['', [Validators.required]],
      data_nascimento: [''],
      unidade: [''],
      curso: [''],
      turno: [''],
      tipo_necessidade: [''],
      necessita_tecnologia_assistiva: [false],
      necessita_acompanhamento: [false],
      ano_matricula: [''],
      data_da_matricula: [''],
      data_fim_do_curso: [''],
      tipo_do_curso: [''],
      nome_do_responsavel: [''],
      email_do_responsavel: ['', [Validators.email]],
      telefone_do_responsavel: [''],
      atendimento_unidade_anterior: [''],
      casos_na_familia: [''],
      observacao_casos_familia: ['']
    });
  }

  ngOnInit(): void {
    this.carregarUnidades();
    this.carregarCursos();
  }

  showNotification(message: string, type: string = 'error'): void {
    this.notification = {
      message,
      visible: true,
      type
    };
    
    setTimeout(() => {
      this.notification.visible = false;
    }, 3000);
  }

  carregarUnidades(): void {
    this.alunoService.getUnidadeDosAlunos().subscribe({
      next: (data) => {
        this.unidades = data.map(item => item.unidade).filter(Boolean);
      },
      error: (error) => {
        console.error('Erro ao carregar unidades:', error);
        this.showNotification('Erro ao carregar unidades');
      }
    });
  }

  carregarCursos(): void {
    this.alunoService.getCursosDosAlunos().subscribe({
      next: (data) => {
        this.cursos = data.map(item => item.curso).filter(Boolean);
      },
      error: (error) => {
        console.error('Erro ao carregar cursos:', error);
        this.showNotification('Erro ao carregar cursos');
      }
    });
  }

  onSubmit(): void {
    if (this.alunoForm.invalid) {
      this.showNotification('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    this.loading = true;
    const formData = this.alunoForm.value;
    
    // Converter booleanos para Sim/Não conforme solicitado
    formData.necessita_tecnologia_assistiva = formData.necessita_tecnologia_assistiva ? 'Sim' : 'Não';
    formData.necessita_acompanhamento = formData.necessita_acompanhamento ? 1 : 0; // Mantém o padrão 1/0

    this.alunoService.createAluno(formData).subscribe({
      next: (response) => {
        this.loading = false;
        this.showNotification('Aluno cadastrado com sucesso!', 'success');
        this.router.navigate(['/alunoscadastrados']);
      },
      error: (error) => {
        this.loading = false;
        console.error('Erro ao cadastrar aluno:', error);
        this.showNotification('Erro ao cadastrar aluno');
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/alunoscadastrados']);
  }

  // Getter para facilitar o acesso aos controles do formulário no template
  get f() { 
    return this.alunoForm.controls; 
  }
}
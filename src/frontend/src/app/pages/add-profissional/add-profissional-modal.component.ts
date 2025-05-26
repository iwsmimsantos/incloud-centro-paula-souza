import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-profissional-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-profissional-modal.component.html',
  styleUrl: './add-profissional-modal.component.css'
})
export class AddProfissionalModalComponent {
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  profissional = {
    nome: '',
    especializacoes: '',
    telefone: '',
    email: '',
    empresa: ''
  };

  isVisible = false;
  formError = '';
  telefoneInvalido = false;
  emailInvalido = false;

  abrir(): void {
    this.isVisible = true;
    this.limparFormulario();
  }

  fechar(): void {
    this.isVisible = false;
    this.formError = '';
    this.close.emit();
  }

  formatarTelefone(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, ''); 
    

    if (value.length > 11) {
      value = value.slice(0, 11);
    }
    
    if (value.length > 0) {
      this.telefoneInvalido = false;
      
      if (value.length <= 2) {
        this.profissional.telefone = `(${value}`;
      } else if (value.length <= 3) {
        this.profissional.telefone = `(${value.slice(0, 2)}) ${value.slice(2)}`;
      } else if (value.length <= 7) {
        this.profissional.telefone = `(${value.slice(0, 2)}) ${value.slice(2, 3)}${value.slice(3)}`;
      } else {
        this.profissional.telefone = `(${value.slice(0, 2)}) ${value.slice(2, 3)}${value.slice(3, 7)}-${value.slice(7)}`;
      }
    } else {
      this.profissional.telefone = '';
    }
  }

  validarEmail(): void {
    if (!this.profissional.email || this.profissional.email.includes('@')) {
      this.emailInvalido = false;
    } else {
      this.emailInvalido = true;
    }
  }

  salvar(): void {
    if (this.validarFormulario()) {
      const telefoneApenasNumeros = this.profissional.telefone.replace(/\D/g, '');
      
      const profissionalParaSalvar = {
        nome: this.profissional.nome.trim(),
        especializacoes: this.profissional.especializacoes.trim() || null,
        telefone: telefoneApenasNumeros || null, 
        email: this.profissional.email.trim() || null,
        empresa: this.profissional.empresa.trim() || null
      };
  
      console.log("Dados enviados para o backend:", profissionalParaSalvar); 
  
      this.save.emit(profissionalParaSalvar);
      this.fechar();
    }
  }

  private limparFormulario(): void {
    this.profissional = {
      nome: '',
      especializacoes: '',
      telefone: '',
      email: '',
      empresa: ''
    };
    this.formError = '';
    this.telefoneInvalido = false;
    this.emailInvalido = false;
  }

  private validarFormulario(): boolean {

    if (!this.profissional.nome.trim()) {
      this.formError = 'Nome é obrigatório';
      return false;
    }

    if (this.profissional.telefone && !this.validarFormatoTelefone()) {
      this.telefoneInvalido = true;
      this.formError = 'Formato de telefone inválido';
      return false;
    }


    if (this.profissional.email && !this.profissional.email.includes('@')) {
      this.emailInvalido = true;
      this.formError = 'Email inválido. Deve conter @';
      return false;
    }

    return true;
  }

  private validarFormatoTelefone(): boolean {
    const regex = /^\(\d{2}\) \d{5}-\d{4}$/;
    return regex.test(this.profissional.telefone);
  }
}
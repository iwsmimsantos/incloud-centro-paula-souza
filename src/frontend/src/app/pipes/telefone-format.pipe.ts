import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'telefoneFormat',
  standalone: true
})
export class TelefoneFormatPipe implements PipeTransform {
  transform(telefone: string | null): string {
    if (!telefone) {
      return 'Sem telefone';
    }

    const numeroLimpo = telefone.replace(/\D/g, '');
    
    if (numeroLimpo.length < 10) {
      return telefone; 
    }
    

    if (numeroLimpo.length === 11) {
      return `(${numeroLimpo.slice(0, 2)}) ${numeroLimpo.slice(2, 3)}${numeroLimpo.slice(3, 7)}-${numeroLimpo.slice(7)}`;
    }
    

    if (numeroLimpo.length === 10) {
      return `(${numeroLimpo.slice(0, 2)}) ${numeroLimpo.slice(2, 6)}-${numeroLimpo.slice(6)}`;
    }
    
    return telefone; 
  }
}
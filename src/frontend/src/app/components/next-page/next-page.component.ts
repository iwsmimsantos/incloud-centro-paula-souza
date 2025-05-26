import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-next-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './next-page.component.html',
  styleUrl: './next-page.component.css'
})
export class NextPageComponent implements OnChanges {
  @Input() totalItems: number = 0;
  @Input() currentPage: number = 1;
  @Input() pageSize: number = 5;
  @Output() pageChanged = new EventEmitter<number>();
  
  pages: number[] = [];
  totalPages: number = 0;
  
  ngOnChanges(changes: SimpleChanges): void {
    this.calculatePages();
  }
  
  calculatePages(): void {
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
    
    // Reset do array de páginas
    this.pages = [];
    
    // Determina quais números de página mostrar
    if (this.totalPages <= 7) {
      // Se houver poucas páginas, mostra todas
      for (let i = 1; i <= this.totalPages; i++) {
        this.pages.push(i);
      }
    } else {
      // Sempre inclui a primeira página
      this.pages.push(1);
      
      // Para páginas atuais perto do início
      if (this.currentPage <= 3) {
        this.pages.push(2, 3, 4, 5);
        this.pages.push(0); // Representa reticências
        this.pages.push(this.totalPages);
      } 
      // Para páginas atuais perto do fim
      else if (this.currentPage >= this.totalPages - 2) {
        this.pages.push(0); // Representa reticências
        for (let i = this.totalPages - 4; i <= this.totalPages; i++) {
          this.pages.push(i);
        }
      } 
      // Para páginas atuais no meio
      else {
        this.pages.push(0); // Representa reticências
        for (let i = this.currentPage - 1; i <= this.currentPage + 1; i++) {
          this.pages.push(i);
        }
        this.pages.push(0); // Representa reticências
        this.pages.push(this.totalPages);
      }
    }
  }
  
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.pageChanged.emit(page);
    }
  }
  
  isEllipsis(page: number): boolean {
    return page === 0;
  }
  
  previousPage(): void {
    if (this.currentPage > 1) {
      this.changePage(this.currentPage - 1);
    }
  }
  
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.changePage(this.currentPage + 1);
    }
  }
}
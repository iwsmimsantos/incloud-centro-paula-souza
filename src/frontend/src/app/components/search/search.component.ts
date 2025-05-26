import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  @Output() searchChanged = new EventEmitter<string>();
  @Output() addClicked = new EventEmitter<void>(); 
  
  searchTerm: string = '';
  
  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
    this.searchChanged.emit(this.searchTerm);
  }
  
  onAddClick(): void {
    this.addClicked.emit();
  }
}
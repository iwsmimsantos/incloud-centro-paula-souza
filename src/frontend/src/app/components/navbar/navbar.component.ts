import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isUserMenuOpen = false;

  constructor(
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
  }

  isActive(route: string): boolean {
    return this.router.url.includes(route);
  }

  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  logout(): void {
    // Fechar o menu após clicar
    this.isUserMenuOpen = false;
    
    // Usar o método de logout local para evitar redirecionamento para páginas de erro
    this.auth.logout({
      openUrl: false, // Não abre URL externa após logout
      logoutParams: {
        returnTo: window.location.origin + '/login'
      }
    });
    
    // Redirecionar imediatamente para a página de login
    setTimeout(() => {
      window.location.href = '/login';
    }, 100);
  }
}
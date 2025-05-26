import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading = false;

  constructor(
    public auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('Login component initialized');
    
    // Verificar e logar o estado de autenticação
    this.auth.isAuthenticated$.pipe(
      tap(isAuthenticated => {
        console.log('Is authenticated:', isAuthenticated);
        if (isAuthenticated) {
          console.log('User is authenticated, redirecting to /home');
          this.router.navigate(['/home']);
        } else {
          console.log('User is not authenticated');
        }
      })
    ).subscribe();
    
    // Verificar se há erros de autenticação
    this.auth.error$.subscribe(error => {
      if (error) {
        console.error('Auth error:', error);
      }
    });
  }

  login(): void {
    console.log('Login button clicked');
    this.isLoading = true;
    this.auth.loginWithRedirect({
      appState: { target: '/home' }
    });
  }
}
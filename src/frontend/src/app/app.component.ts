import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoginRoute$: Observable<boolean>;

  constructor(
    private router: Router,
    private auth: AuthService
  ) {
    // Observable que retorna true se a rota atual for '/login'
    this.isLoginRoute$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(event => {
        if (event instanceof NavigationEnd) {
          return event.url === '/login' || event.url === '/' || event.url === '';
        }
        return false;
      })
    );
  }

  ngOnInit() {
    // Verificar o estado de autenticação no carregamento do app
    this.auth.isAuthenticated$.subscribe(isAuth => {
      console.log('App component - isAuthenticated:', isAuth);
      
      // Se já estiver autenticado e na rota de login, redirecionar para home
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe((event: any) => {
        if (isAuth && (event.url === '/login' || event.url === '/' || event.url === '')) {
          console.log('Already authenticated and on login page, redirecting to home');
          this.router.navigate(['/home']);
        }
      });
    });
  }
}
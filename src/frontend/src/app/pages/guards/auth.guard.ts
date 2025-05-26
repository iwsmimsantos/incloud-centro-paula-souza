import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { map, tap } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  
  console.log('Auth guard activated for route:', state.url);
  
  return auth.isAuthenticated$.pipe(
    tap(loggedIn => {
      console.log('Auth guard - isAuthenticated:', loggedIn);
      if (!loggedIn) {
        console.log('User not authenticated, redirecting to login');
        router.navigate(['/login']);
      } else {
        console.log('User authenticated, allowing navigation');
      }
    }),
    map(loggedIn => loggedIn) // Explicitamente retornar o valor booleano
  );
};
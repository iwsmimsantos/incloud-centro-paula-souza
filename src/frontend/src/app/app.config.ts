import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAuth0 } from '@auth0/auth0-angular';
import { routes } from './app.routes';
import { apiUrlInterceptor } from './interceptors/api-url.interceptor';

const USE_API_INTERCEPTOR = false; // Ligar ou desligar o Interceptador

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        ...(USE_API_INTERCEPTOR ? [apiUrlInterceptor] : [])
      ])
    ),
    provideAuth0({
      domain: 'dev-u23msh42ijevd8z2.us.auth0.com',
      clientId: 'ckmyUtbYW1dwLk1TKHhBLYFScmnOC6fb',
      authorizationParams: {
        redirect_uri: window.location.origin,
        scope: 'openid profile email',
        ui_locales: 'pt-BR'
      },
      cacheLocation: 'localstorage',
      useRefreshTokens: true,
      skipRedirectCallback: false,
    })
  ]
};

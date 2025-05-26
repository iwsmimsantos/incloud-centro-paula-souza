import { HttpInterceptorFn } from '@angular/common/http';
import { Observable } from 'rxjs';

export const apiUrlInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes('http://localhost:3000')) {
    const newUrl = req.url.replace('http://localhost:3000', 'http://10.32.0.15:4040');
    const clonedReq = req.clone({ url: newUrl });
    return next(clonedReq);
  }
  return next(req);
};

// Interceptador para trocar as chamadas do front para rotas que funcionam.

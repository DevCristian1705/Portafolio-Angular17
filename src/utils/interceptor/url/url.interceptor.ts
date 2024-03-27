import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class UrlInterceptor implements HttpInterceptor {

  // Lista de URLs permitidas
  allowedUrls: string[] = [
    'https://cambix.com.pe/cambix/',
    'https://cambix.com.pe/cambix-business/',
    'https://www.bancom.pe/libro-de-reclamaciones/',
    'https://www.facebook.com/cambix.pe',
    'https://www.instagram.com/cambix.pe/',
    'https://www.youtube.com/channel/UCQX3lQjNcBYsF9lZbr_9Uww',
    'https://dcf.bancaparatodos.com.pe',
  ];

  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Verifica si la solicitud es una redirección o reenvío de URL
    if (request.url !== request.urlWithParams) {
      // Verifica si la URL de destino está permitida
      if (!this.isUrlAllowed(request.urlWithParams)) {
        // Redirigir a una página de advertencia
        this.router.navigate(['/secure-redirect']);
      }
    }
    return next.handle(request);
  }

  // Verifica si una URL está permitida
  private isUrlAllowed(url: string): boolean {
    return this.allowedUrls.some(allowedUrl => url.startsWith(allowedUrl));
  }
}

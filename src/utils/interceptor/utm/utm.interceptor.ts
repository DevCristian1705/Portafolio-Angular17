import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { UtmService } from 'src/utils/service/utm/utm.service';

@Injectable()
export class UtmInterceptor implements HttpInterceptor {

  constructor(private utmService: UtmService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const utmParams = this.extractUtmParamsFromUrl();
    if (utmParams) {
      this.utmService.saveUtmParams(utmParams);
    }
    return next.handle(req);
  }

  private extractUtmParamsFromUrl(): Record<string, string | boolean> | null {
    const urlParams = new URLSearchParams(window.location.search);
    const utmParams: Record<string, string | boolean> = {};
    urlParams.forEach((value, key) => {
      if (key.startsWith('utm_')) {
        utmParams[key] = value || true;
      }
    });
    return Object.keys(utmParams).length ? utmParams : null;
  }
}

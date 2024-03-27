import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { environment } from "src/environments/environment";
import { tap } from "rxjs/operators";
 
@Injectable()
export class CahcheInterceptor implements HttpInterceptor {

  private _cache = new Map<string, HttpResponse<any>>();

  private _endpointsToCache = new Set([
    '/v2/exchange-rates/exchange-rate?typeCode=TC&documentNumber=null'
  ]);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const URL = req.url.replace(environment.api_url, '');

    if(this._endpointsToCache.has(URL)) {
      const CACHE_RESPONSE = this._cache.get(req.url);

      if(CACHE_RESPONSE) {
        return of(CACHE_RESPONSE);
      }

      return next.handle(req).pipe(
        tap((resp) => {
          if(resp instanceof HttpResponse){
            this._cache.set(req.url, resp);
          }
        })
      );
    }

    return next.handle(req);
  }

}

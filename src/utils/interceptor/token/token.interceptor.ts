// import { Injectable } from '@angular/core';
// import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
// import { throwError, Observable, BehaviorSubject } from 'rxjs';
// import { catchError, filter, take, switchMap, finalize } from 'rxjs/operators';  
// import { environment } from 'src/environments/environment';
// import { TokenStorageService } from 'src/utils/service/token/token.storage.service';
// import { TokenRes } from 'src/utils/interface/token/token.response';


// @Injectable()
// export class HttpTokenInterceptor implements HttpInterceptor {

//   private AUTH_HEADER = 'Authorization';
//   private APIM_HEADER = 'Ocp-Apim-Subscription-Key';
//   private refreshTokenInProgress = false;
//   private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
//   private token!: string;

//   constructor(
//     private tokenService: TokenStorageService,
//   ) {

//   }

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     if (req.url.includes('/files/file')) {
//       req = req.clone({
//         headers: req.headers
//           .set(this.APIM_HEADER, environment.OcpApimSubscriptionKey)
//       });
//     } else {
//       req = req.clone({
//         headers: req.headers
//           .set('Content-Type', 'application/json')
//           .set(this.APIM_HEADER, environment.OcpApimSubscriptionKey)

//       });
//     }

//     if(
//       req.url.includes('/auth/') 
//       // (req.url.includes('/v4/users/user/me') && req.method.toUpperCase() === 'POST') ||   
//       // (req.url.includes('/v3/validations/email/resend') && req.method.toUpperCase() === 'POST') || 
//       // (req.url.includes('/v3/validations/email/send') && req.method.toUpperCase() === 'POST') || 
//       // (req.url.includes('/v4/users/password') && req.method.toUpperCase() === 'PATCH') || 
//       // (req.url.includes('/v2/user-leads/user-lead') && req.method.toUpperCase() === 'PATCH') || 
//       // (req.url.includes('/v3/auth/password/sms') && req.method.toUpperCase() === 'POST') || 
//       // (req.url.includes('/v3/validations/sms/resend') && req.method.toUpperCase() === 'POST') ||
//       // (req.url.includes('/v3/validations/sms/check') && req.method.toUpperCase() === 'POST') 
      
//     ) {
//       req = req.clone();
//     } else {
//       req = this.addAuthenticationToken(req);
//       if (!this.token) {
//         req = req.clone({
//           headers: req.headers.set(this.AUTH_HEADER, "")
//         });
//       } else {
//         req = req.clone({
//           headers: req.headers.set(this.AUTH_HEADER, 'Bearer ' + this.token)
//         });
//       }

//     }


//     return next.handle(req).pipe(catchError(error => {
//       if (!req.url.includes('/login')) {
//         if (error instanceof HttpErrorResponse && error.status === 401) {
//           return this.handle401Error(req, next);
//         } else {
//           return throwError(error);
//         }
//       } else {
//         return throwError(error);
//       }
//     }));

//   }

//   private handle401Error(req: HttpRequest<any>, next: HttpHandler) {
//     if (!this.refreshTokenInProgress) {
//       this.refreshTokenInProgress = true;
//       this.refreshTokenSubject.next(null);
//       return this.refreshAccessToken().pipe(
//         switchMap((tokenRes: TokenRes) => {
//           this.refreshTokenSubject.next(tokenRes);
//           return next.handle(this.addAuthenticationToken(req));
//         }),
//         finalize(() => this.refreshTokenInProgress = false)
//       );
//     } else {
//       return this.refreshTokenSubject.pipe(
//         filter(token => token != null),
//         take(1),
//         switchMap(jwt => {
//           return next.handle(this.addAuthenticationToken(req));
//         }));
//     }
//   }


//   addAuthenticationToken(req: HttpRequest<any>): HttpRequest<any> {
//     this.token = this.tokenService.getToken();
//     if (!this.token) {
//       return req;
//     }
//     return req.clone({
//       headers: req.headers.set(this.AUTH_HEADER, 'Bearer ' + this.token)
//     });
//   }

//   // private refreshAccessToken(): Observable<any> {
//   //   return this.tokenService.refreshToken();
//   // }



// }

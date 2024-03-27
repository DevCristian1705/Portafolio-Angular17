// /* eslint-disable @nrwl/nx/enforce-module-boundaries */
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { throwError } from 'rxjs';
// import { catchError, tap } from 'rxjs/operators';
// import { StorageService } from '../storage/storage.service';
// import { STORAGE_KEY } from '../../constants/storage';
// import { environment } from 'src/environments/environment'; 
// import { SmsCodeResV3, TokenRes } from 'src/utils/interface/token/token.response';

// @Injectable({
//   providedIn: 'root',
// })
// export class TokenStorageService {
//   path: string = "";

//   constructor(
//     private http: HttpClient,
//     private storageService: StorageService
//   ) {
//     //this.path = 'v2/auth/refresh-token';
//   }

//   // onValidateFormEmail(email: string)  {
//   //   let validateEmail: boolean;
//   //   if (email) {
//   //     const regex = /(\.{2,}|\.+$)/;
//   //     const dotCount = email.split('.').length - 1;
//   //     if (dotCount > 2 || regex.test(email)) {
//   //       validateEmail = true;
//   //     }
//   //   }

//   //   return validateEmail;
//   // }
 
//   // refreshToken() {
//   //   return this.http
//   //     .post<any>(`${environment.api_url}${this.path}`, {
//   //       refreshToken: this.getRefreshToken(),
//   //     })
//   //     .pipe(
//   //       tap((tokenRes: TokenRes) => {
//   //         this.storeTokens(tokenRes);
//   //       }, catchError(this.formatErrors))
//   //     );
//   // }

//   getToken(): any {
//     return this.storageService.getData(STORAGE_KEY.authToken)  || null;
//   }

//   getRefreshToken() {
//     return this.storageService.getData(STORAGE_KEY.refreshAuthToken) || null;
//   }

//   storeToken(token: string) {
//     this.storageService.setData(STORAGE_KEY.authToken, token);
//   }

//   storeTokens(tokenRes: TokenRes): void {
//     this.storageService.setData(STORAGE_KEY.authToken, tokenRes.token);
//     this.storageService.setData(STORAGE_KEY.refreshAuthToken, tokenRes.refreshToken);
//   }

//   removeToken() {
//     this.storageService.removeData(STORAGE_KEY.authToken);
//   }

//   getStoreSessionUser() {
//     return this.storageService.getData(STORAGE_KEY.sessionUser) || null;
//   }

//   setStoreSessionUser(data: any) {
//     data.profile = this.setProfileSession(data);
//     this.storageService.setData(STORAGE_KEY.sessionUser, JSON.stringify(data));
//   }

//   setProfileSession(data: any): string[] {
//     const profiles: string[] = [];
//     // SI ERES PERSONA
//     if (data.userType === 'PER') {
//       if (data.hasCompany) {
//         profiles.push('persona', 'empresa');
//       } else {
//         profiles.push('persona');
//       }
//     }

//     // SI ERES EMPRESA
//     if (data.userType === 'EMP') {
//       if (data.hasUser) {
//         profiles.push('persona', 'empresa');
//       } else {
//         profiles.push('empresa');
//       }
//     }

//     return profiles;
//   }

//   removeStoreSessionUser() {
//     this.storageService.removeData(STORAGE_KEY.sessionUser);
//   }
 
//   private formatErrors(error: any) {
//     return throwError(error.error);
//   }

//   getSms(): SmsCodeResV3 | null {
//     const storageSmsRes = sessionStorage.getItem('sms-response');
//     if (storageSmsRes) {
//       const smsCodeRes = JSON.parse(storageSmsRes) as SmsCodeResV3;
//       return smsCodeRes;
//     }
//     return null;
//   }

//   get isAuthenticated(): boolean {
//     const datosSession: any = this.getStoreSessionUser();
//     const user = datosSession ? JSON.parse(datosSession) : null;
//     const token = this.getToken();
//     return token && user;
//   }
// }

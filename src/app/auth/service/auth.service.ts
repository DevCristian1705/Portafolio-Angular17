import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';

import { User,AuthStatus, LoginResponse, CheckTokenResposner } from '../interfaces'; 

@Injectable({ providedIn: 'root' })

export class AuthService {

    private readonly baseUrl = environment.baseUrl;
    private http = inject(HttpClient);

    private _currentUser = signal<User| null>(null);
    private _authStatus = signal<AuthStatus>( AuthStatus.checking);


    //EXPONER 
    public currentUser = computed( ()=> this._currentUser() )
    public authStatus =computed( ()=> this._authStatus() )


    private setAuthentication(user : User, token : string): boolean {
        this._currentUser.set(user);
        this._authStatus.set( AuthStatus.authenticated);
        localStorage.setItem('token', token);
        return true;
    }

    constructor(){
        this.checAuthStatus().subscribe();
    }

    login(email : string , password: string) : Observable<boolean>{
        const url = `${this.baseUrl}/auth/login`;
        const body = { email, password};

        return this.http.post<LoginResponse>( url, body)
        .pipe(
            map( ({token, user}) => this.setAuthentication(user, token) ),
            catchError( err => throwError ( ()=> err.error.message ))
        );
    }



    checAuthStatus(): Observable<boolean>{
        const url = `${this.baseUrl}/auth/check-token`;
        const token = localStorage.getItem('token');

        if( !token ) {
            this.logout();
            return of(false);
        } 
    
        const headers = new HttpHeaders()
        .set('Authorization', `Bearer ${token}`);

        return this.http.get<CheckTokenResposner>(url, {headers})
            .pipe(
                map( ({token, user}) => this.setAuthentication(user, token) ),
                catchError( () => {
                    this._authStatus.set( AuthStatus.noAuthenticated);
                    return of(false);
                })
            )
    }



    logout(){
        localStorage.removeItem('token');
        this._currentUser.set(null);
        this._authStatus.set(AuthStatus.noAuthenticated);
    }

}
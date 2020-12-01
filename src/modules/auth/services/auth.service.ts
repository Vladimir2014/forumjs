import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignupRequestPayload } from '../models/signup-request.payload';
import { Observable, throwError } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import { LoginRequestPayload } from '../models/login.request.payload';
import { LoginResponsePayload } from '../models/login.response.payload';
import { VerifyPasswordResetCodeRequest } from '../models/verify-password-reset-code-request'
import { map, tap } from 'rxjs/operators';
import { ResetPasswordRequest } from '../models/reset-password-request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();
  
  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUserName()
  }
  
  constructor(private httpClient: HttpClient,
    private localStorage: LocalStorageService) {
    }
    
    signup(signupRequestPayload: SignupRequestPayload): Observable<any> {
      return this.httpClient.post('http://localhost:8081/api/auth/signup', signupRequestPayload, { responseType: 'text' });
    }
    
    login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
      return this.httpClient.post<LoginResponsePayload>('http://localhost:8081/api/auth/login', loginRequestPayload)
      .pipe(map(data => {
        this.localStorage.store('authenticationToken', data.authenticationToken);
        this.localStorage.store('username', data.username);
        this.localStorage.store('refreshToken', data.refreshToken);
        this.localStorage.store('expiresAt', data.expiresAt);
        
        this.loggedIn.emit(true);
        this.username.emit(data.username);
        return true;
      }));
    }
    
    sendPasswordResetCode(username: String): Observable<any> {
      return this.httpClient.post('http://localhost:8081/api/auth/code/send', username, { responseType: 'text' });
    }
    
    verifyPasswordResetCode(verifyPasswordResetCodeRequest: VerifyPasswordResetCodeRequest) {
      return this.httpClient.post('http://localhost:8081/api/auth/code/verify', verifyPasswordResetCodeRequest, { responseType: 'text' });
    }
    
    resetPassword(resetPasswordRequest: ResetPasswordRequest) {
      return this.httpClient.post('http://localhost:8081/api/auth/password/reset', resetPasswordRequest, { responseType: 'text' });
    }
    
    getJwtToken() {
      return this.localStorage.retrieve('authenticationToken');
    }
    
    refreshToken() {
      return this.httpClient.post<LoginResponsePayload>('http://localhost:8081/api/auth/refresh/token',
      this.refreshTokenPayload)
      .pipe(tap(response => {
        this.localStorage.clear('authenticationToken');
        this.localStorage.clear('expiresAt');
        
        this.localStorage.store('authenticationToken',
        response.authenticationToken);
        this.localStorage.store('expiresAt', response.expiresAt);
      }));
    }
    
    logout() {
      this.httpClient.post('http://localhost:8081/api/auth/logout', this.refreshTokenPayload,
      { responseType: 'text' })
      .subscribe(data => {
        console.log(data);
      }, error => {
        throwError(error);
      })
      this.localStorage.clear('authenticationToken');
      this.localStorage.clear('username');
      this.localStorage.clear('refreshToken');
      this.localStorage.clear('expiresAt');
  }

  getUserName() {
    return this.localStorage.retrieve('username');
  }
  getRefreshToken() {
    return this.localStorage.retrieve('refreshToken');
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }
}
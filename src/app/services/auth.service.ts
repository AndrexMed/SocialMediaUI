import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { TokenService } from './token.service';
import { BehaviorSubject, catchError, switchMap, tap, throwError } from 'rxjs';
import { UserLogin } from '../../models/userLogin.model';
import { LoginResponse, UserDetails } from '../../models/auth.model';
import { checkToken } from '../interceptors/token.interceptor';
import { User } from '../../models/user.model';
import { ApiResponse } from '../../models/getPostResponse.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = `${environment.apiBaseURL}/api/Token`

  // private user = new BehaviorSubject<User | null>(null);
  // user$ = this.user.asObservable();

  userSignal = signal<UserDetails | null>(null);

  constructor(private http: HttpClient,
    private tokenSvc: TokenService) { }

  loginAndGetProfile(userLogin: UserLogin) {
    return this
      .login(userLogin)
      .pipe(
        //switchMap(() => this.getProfile()),
        catchError((error) => {
          if (error.status = 404) {
            return throwError("User or password invalid.");
          }
          return throwError("Ups");
        })
      );
  }

  login(userLogin: UserLogin) {

    const { user, password } = userLogin;

    return this.http.post<LoginResponse>(`${this.apiUrl}`, { user, password })
      .pipe(
        tap(response => {
          this.tokenSvc.saveToken(response.token);
          this.userSignal.set(response.item2)
        })
      );
  }

  getProfile() {
    return this.http.get<UserDetails>(`${this.apiUrl}/Get-Profile`, { context: checkToken() })
      .pipe(
        // tap((user) => this.user.next(user)),
        tap((user) => this.userSignal.set(user))
      );
  }
}
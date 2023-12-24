import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { TokenService } from './token.service';
import { BehaviorSubject, catchError, switchMap, tap } from 'rxjs';
import { UserLogin } from '../../models/userLogin.model';
import { Auth } from '../../models/auth.model';
import { checkToken } from '../interceptors/token.interceptor';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = `${environment.apiBaseURL}/api/Token`

  private user = new BehaviorSubject<User | null>(null);
  user$ = this.user.asObservable()

  constructor(private http: HttpClient,
    private tokenSvc: TokenService) { }

  loginAndGetProfile(userLogin: UserLogin) {
    return this.login(userLogin).pipe(
      switchMap(() => this.getProfile())
    );
  }

  login(userLogin: UserLogin) {
    const { user, password } = userLogin;

    return this.http.post<Auth>(`${this.apiUrl}`, { user, password })
      .pipe(
        tap(response => {
          this.tokenSvc.saveToken(response.token);
        })
      );
  }

  getProfile() {
    return this.http.get<User>(`${this.apiUrl}/Get-Profile`, { context: checkToken() })
      .pipe(
        tap((user) => this.user.next(user))
      );
  }
}

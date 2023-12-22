import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { TokenService } from './token.service';
import { tap } from 'rxjs';
import { UserLogin } from '../../models/userLogin.model';
import { Auth } from '../../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = `${environment.apiBaseURL}/api/Token`

  constructor(private http: HttpClient,
    private tokenSvc: TokenService) { }

  login(userLogin: UserLogin) {
    const { user, password } = userLogin;

    return this.http.post<Auth>(`${this.apiUrl}`, { user, password })
      .pipe(
        tap(response => {
          this.tokenSvc.saveToken(response.token)
        })
      )
  }
}

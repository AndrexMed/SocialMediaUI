import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  private authSvc = inject(AuthService);
  private tokenSvc = inject(TokenService);

  ngOnInit(): void {
    const token = this.tokenSvc.isValidToken();
    if (token) {
      this.authSvc.getProfile().subscribe();
    } else {
      console.log("No hay token valido")
    }
  }

}

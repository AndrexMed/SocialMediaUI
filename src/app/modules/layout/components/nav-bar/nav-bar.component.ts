import { Component, inject } from '@angular/core';
import { TokenService } from '../../../../services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {

  private tokenSvc = inject(TokenService);
  private router = inject(Router);

  logout() {
    this.tokenSvc.removeToken();
    this.router.navigate(['/login'])
  }
}

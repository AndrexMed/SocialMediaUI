import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { TokenService } from '../../../../services/token.service';
import { Router } from '@angular/router';
import { CreatepostDialogComponent } from '../../../shared/components/createpost-dialog/createpost-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../../services/auth.service';
import { UserDetails } from '../../../../../models/auth.model';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit {

  private tokenSvc = inject(TokenService);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private authSvc = inject(AuthService);

  userSignal = this.authSvc.userSignal;

  ngOnInit(): void {
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(CreatepostDialogComponent, {
      width: 'auto',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  logout() {
    this.tokenSvc.removeToken();
    this.router.navigate(['/login'])
  }

  profile() {
    this.router.navigate(['/profile'])
  }
}
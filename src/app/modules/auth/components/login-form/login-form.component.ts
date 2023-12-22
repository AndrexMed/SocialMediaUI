import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserLogin } from '../../../../../models/userLogin.model';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  hide = true;

  constructor(private formBuilder: FormBuilder,
    private authSvc: AuthService,
    private router: Router,
    private route: ActivatedRoute) { }

  loginForm = this.formBuilder.nonNullable.group({
    userName: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  clearInputUserName() {
    this.loginForm.get('userName')!.setValue('');
  }

  daLogin() {
    if (this.loginForm.valid) {

      const { userName, password } = this.loginForm.getRawValue();

      const credentials: UserLogin = {
        user: userName,
        password: password
      }

      console.log(credentials)

      this.authSvc.login(credentials).subscribe({
        next: () => {
          this.router.navigate(['/app'])
        },
        error: (error) => {
          console.log(error)
        },
        
      })
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}

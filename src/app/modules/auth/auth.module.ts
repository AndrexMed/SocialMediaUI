import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Components
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { RegisterComponent } from './pages/register/register.component';

//Routing
import { AuthRoutingModule } from './auth-routing.module';

//Material
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    LoginFormComponent,
    LoginComponent,
    RegisterFormComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule
  ]
})
export class AuthModule { }

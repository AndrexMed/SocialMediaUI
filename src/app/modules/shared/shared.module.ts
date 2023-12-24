import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Components
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { CreatepostDialogComponent } from './components/createpost-dialog/createpost-dialog.component';

//Material
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    NotfoundComponent,
    SpinnerComponent,
    CreatepostDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    SpinnerComponent,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class SharedModule { }

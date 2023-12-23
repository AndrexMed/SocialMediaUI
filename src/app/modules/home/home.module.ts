import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';

//Components
import { PostDialogComponent } from './components/post-dialog/post-dialog.component';
import { HomeComponent } from './pages/home/home.component';

//Material
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    HomeComponent,
    PostDialogComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatCardModule,
    MatIconModule
  ]
})
export class HomeModule { }

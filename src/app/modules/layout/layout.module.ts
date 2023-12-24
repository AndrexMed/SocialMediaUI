import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

//Material
import { MatMenuModule } from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [
    LayoutComponent,
    NavBarComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    MatMenuModule,
    MatButtonModule,
    DialogModule
  ]
})
export class LayoutModule { }

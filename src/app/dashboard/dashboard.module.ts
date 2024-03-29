import {CUSTOM_ELEMENTS_SCHEMA,  LOCALE_ID, NgModule } from "@angular/core"; 
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from "./home/home.component";



@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule, 
    SharedModule
  ],
  providers: [    
    { provide: LOCALE_ID, useValue: 'es' }  
  ],  
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardModule { }

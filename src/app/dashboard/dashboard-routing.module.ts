import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';   
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {
      path: '',
      component: DashboardComponent,
      children: [
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        {
          path: 'home',
          component: HomeComponent, 
        },
    //     {
    //       path: 'registro',
    //       component: RegistroComponent, 
    //     },
    //     {
    //       path: 'change-password',
    //       component: ChangePasswordComponent, 
    //     },
      ], 
    } 
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class DashboardRoutingModule { }
  
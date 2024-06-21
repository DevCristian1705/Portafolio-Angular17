import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { LandingComponent } from './landing/landing.component';
import { IsAuthGuard } from './auth/guard/auth.guard';
import { IsNotAuthGuard } from './auth/guard/not-auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent 
  }, 
  {
    path: 'auth',
    canActivate : [IsNotAuthGuard],
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },   
  {
    path: 'dashboard',
    canActivate : [IsAuthGuard],
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },   
  {
    path: '', redirectTo: '', pathMatch: 'full'
  },
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

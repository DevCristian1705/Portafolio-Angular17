import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecureURLComponent } from './secure-url/secure-url.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule)
  }, 
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },   
  {
    path: 'secure-redirect',
    component: SecureURLComponent
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

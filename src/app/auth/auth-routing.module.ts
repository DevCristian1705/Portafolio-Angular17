import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';   
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
 
export const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        component: LoginComponent, 
      },
      {
        path: 'registro',
        component: RegistroComponent, 
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent, 
      },
    ], 
  } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

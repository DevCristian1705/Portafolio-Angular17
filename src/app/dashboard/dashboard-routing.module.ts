import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';   
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { EncuestaComponent } from './proyectos/encuesta/encuesta.component';
import { GenerateOtpComponent } from './proyectos/generate-otp/generate-otp.component';
import { SimulatorChangeComponent } from './proyectos/simulator-change/simulator-change.component';
import { HistorialSimulatorComponent } from './proyectos/simulator-change/historial-simulator/historial-simulator.component';

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
        {
          path: 'encuesta',
          component: EncuestaComponent, 
        },
        {
          path: 'generate-otp',
          component: GenerateOtpComponent, 
        },
        {
          path: 'simulator-change',
          component: SimulatorChangeComponent,  
        },
        {
          path: 'historial-simulations',
          component: HistorialSimulatorComponent,  
        },

      

      ], 
    } 
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class DashboardRoutingModule { }
  
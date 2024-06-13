import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historial-simulator', 
  templateUrl: './historial-simulator.component.html',
  styleUrl: './historial-simulator.component.scss'
})
export class HistorialSimulatorComponent {

  arrayHistory : any[] = [];

  constructor(
    private router : Router
  ){

  }
  ngOnInit(){
    this.onGetHistorical();
  }

  onGetHistorical(){
    const DATA = JSON.parse(localStorage.getItem('simulations-exchange') || '[]');
    this.arrayHistory = DATA; 
  }

  
 onBack(){
  this.router.navigateByUrl('/dashboard/simulator-change')
 }

}

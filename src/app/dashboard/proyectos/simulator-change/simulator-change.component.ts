import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Component({
  selector: 'app-simulator-change', 
  templateUrl: './simulator-change.component.html',
  styleUrl: './simulator-change.component.scss'
})
export class SimulatorChangeComponent {

  simulatorForm!: FormGroup; 
  typeChangePurchase  : number  = 3.460;
  typeChangeSale  : number  = 3.680;   
  currentAmount : number = 0;

  isRotate : boolean = true; 
  isLoading : boolean = true;

  constructor(
    public fb: FormBuilder,
    private router : Router, 
  ) {  
    this.onCreateForm(); 
  }
 
  ngOnInit(){ 
    this.onDetectedChangeAmount(); 
  }

  onCreateForm(){
    this.simulatorForm = this.fb.group({
      amountLeft: [null, [Validators.min(20), Validators.required]],
      amountRight: [null, [Validators.max(30000), Validators.required]],
    });
  }

  onDetectedChangeAmount(){  
    this.simulatorForm.get('amountLeft')?.valueChanges 
      .pipe(
        tap(()=> this.isLoading = false )
      )  
      .subscribe((value: number) => {  
        if (value) { 
          this.currentAmount = value; 
          this.onAmountLeftChange();   
          return;
        }  

        this.currentAmount = 0;
        this.simulatorForm.get('amountRight')?.setValue(null);
  
    }); 
  }
 
  onRotateIcon() { 
    if(this.currentAmount){
      this.isRotate = !this.isRotate; 
      this.onAmountLeftChange(); 
    }  
  }
  
  onAmountLeftChange(): void {
    const amountLeftValue = this.simulatorForm.get('amountLeft')?.value;

    if (!amountLeftValue) {
      this.simulatorForm.get('amountRight')?.setValue(null);
      return
    }

    const newAmountRight = this.isRotate
    ? amountLeftValue * this.typeChangeSale 
    : amountLeftValue / this.typeChangePurchase;

    const roundedNewAmountRight = (Math.round(newAmountRight * 100) / 100).toFixed(2);
    this.simulatorForm.get('amountRight')?.setValue(roundedNewAmountRight);

   
  }
  

  onSaveSimulate(){
    const DATA = {
      valuePurchase : this.typeChangePurchase,
      valueSale : this.typeChangeSale,
      amount  : this.simulatorForm.get('amountLeft')?.value,
      amountChange:this.simulatorForm.get('amountRight')?.value, 
      type: (this.isRotate ? 'VENTA' : 'COMPRA')
    }
    
    const existingDataString = localStorage.getItem('simulations-exchange');
    let existingData = existingDataString ? JSON.parse(existingDataString) : []; 
 
    if (!Array.isArray(existingData)) existingData = [];
   
    const newData = [...existingData, DATA]; 
    localStorage.setItem('simulations-exchange', JSON.stringify(newData));
    this.simulatorForm.reset(); 
  }

 onToGoHistorial(){
   this.router.navigateByUrl('/dashboard/historial-simulations')
 }

}

import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-simulator-change', 
  templateUrl: './simulator-change.component.html',
  styleUrl: './simulator-change.component.scss'
})
export class SimulatorChangeComponent {

simulatorForm!: FormGroup; 
TCcompra = 3.460;
TCventa = 3.680;   
currentAmount = 0;

flgRotate : boolean = true; 
isLoading : boolean = true;

  constructor(
    public fb: FormBuilder,
    private router : Router, 
  ) {  
    this.onCreateForm(); 
  }
 
  ngOnInit(){ 
    this.onDetectedChangeAmount();
    setTimeout(() => {
      this.isLoading = false
    }, 1000);
  }

  onCreateForm(){
    this.simulatorForm = this.fb.group({
      amountLeft: [null, [Validators.min(20), Validators.required]],
      amountRight: [null, [Validators.max(30000), Validators.required]],
    });
  }

  onDetectedChangeAmount(){  
    this.simulatorForm.get('amountLeft')?.valueChanges.subscribe((value: number) => { 
      console.log('value',value);
      if (value) {
        this.currentAmount = value; 
        this.amountLeftValChanges();   
        return;
      }  

      this.currentAmount = 0;
      this.simulatorForm.get('amountRight')?.setValue(null);
 
      
    }); 
  }


  
  onRotateIcon() { 
    if(this.currentAmount){
      this.flgRotate = !this.flgRotate; 
      this.amountLeftValChanges(); 
    }  
  }
  
  amountLeftValChanges(): void {
    const amountLeftValue = this.simulatorForm.get('amountLeft')?.value;
    if (amountLeftValue) {
      const newAmountRight = this.flgRotate
      ? amountLeftValue * this.TCventa 
      : amountLeftValue / this.TCcompra;

      const roundedNewAmountRight = (Math.round(newAmountRight * 100) / 100).toFixed(2);
      this.simulatorForm.get('amountRight')?.setValue(roundedNewAmountRight);

    } else {
      this.simulatorForm.get('amountRight')?.setValue(null);
    }
  }
  

  onSaveSimulate(){
    const DATA = {
      valuePurchase : this.TCcompra,
      valueSale : this.TCventa,
      amount  : this.simulatorForm.get('amountLeft')?.value,
      amountChange:this.simulatorForm.get('amountRight')?.value, 
      type: (this.flgRotate ? 'VENTA' : 'COMPRA')
    }
    
    const existingDataString = localStorage.getItem('simulations-exchange');
    let existingData = existingDataString ? JSON.parse(existingDataString) : []; 
 
    if (!Array.isArray(existingData)) {
        existingData = [];
    }
   
    const newData = [...existingData, DATA]; 
    localStorage.setItem('simulations-exchange', JSON.stringify(newData));

    this.simulatorForm.reset(); 
  }

 onToGoHistorial(){
   this.router.navigateByUrl('/dashboard/historial-simulations')
 }

}

import { Component, Input } from '@angular/core'; 
import { ValidatorsService } from '../../../service/validators.service';
 
@Component({
  selector: 'page-valid-password', 
  templateUrl: './page-valid-password.component.html',
  styleUrl: './page-valid-password.component.scss'
})
export class PageValidPasswordComponent  {
 
  @Input() set password(value: string){ 
    this.validPassword( value);
  }
  flgShowCaracters : boolean = false;
  propertiesValidPass  = {
    isMayuscula : false, 
    isMinuscula : false, 
    isSimbolo : false, 
    isLength : false, 
    isNumber : false
  };
  
  constructor(
    private validatorsService: ValidatorsService
  ){
    
  }

 

  validPassword( newPass : string) {  
    this.propertiesValidPass = this.validatorsService.onValidPassword(newPass);

    console.log('validPass',  this.propertiesValidPass);
    
  }
}


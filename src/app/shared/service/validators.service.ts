import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ValidatorsService {

  public message : string = "";
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  flgPropertiesPassword : any;
  
  public isValidField( form: FormGroup, field: string ) {
    return form.controls[field].errors && form.controls[field].touched;
  }
 
  public isValidCustomMessageError(form: FormGroup, field : string ) : string {
   
    if(field === 'cellphone'){
      if (!form.controls[field].value.startsWith('9')) {
        this.message = `El  ${field} debe empezar con 9`;
      } else if( form.controls[field].value.length === 9 
        && form.controls[field].value.startsWith('9')){
          this.message = ''
      }  
    }else{
      this.message = `No tiene formato de ${field}  `;
    }
 
    return this.message;
  }

  public isValidCustomMinLengthError(field: string, min : number ) : string {
    this.message =  `El ${field} debe tener ${min} digitos`;
    return this.message;
  }
 
  public onValidPassword(password : string) {   
    this.flgPropertiesPassword = {
      isMayuscula : false, 
      isMinuscula : false, 
      isSimbolo : false, 
      isLength : false, 
      isNumber : false
    }

    for (let i = 0; i < password.length; i++) {
      const charCode = password.charCodeAt(i);
      if (this.isUppercase(charCode)) {
        this.flgPropertiesPassword.isMayuscula = true;
      } else if (this.isLowercase(charCode)) {
        this.flgPropertiesPassword.isMinuscula = true;
      } else if ( this.isNumber(charCode) ) {
        this.flgPropertiesPassword.isNumber = true;
      } else if (this.isSymbol(charCode) ) {
        this.flgPropertiesPassword.isSimbolo = true;
      }
    }

    if (password.length >= 8) { 
      this.flgPropertiesPassword.isLength = true;
    }  
 
    this.flgPropertiesPassword.isComplete = Object.values(this.flgPropertiesPassword).every(val => val === true);

    return this.flgPropertiesPassword
  }
 
    private isUppercase(charCode: number): boolean {
      return charCode >= 65 && charCode <= 90;
    }
    
    private isLowercase(charCode: number): boolean {
      return charCode >= 97 && charCode <= 122;
    }
    
    private isNumber(charCode: number): boolean {
      return charCode >= 48 && charCode <= 57;
    }
    
    private isSymbol(charCode: number): boolean {
      return (charCode >= 33 && charCode <= 47) ||
            (charCode >= 58 && charCode <= 64) ||
            (charCode >= 123 && charCode <= 126);
    }
 
}

import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { ValidatorsService } from '../../../service/validators.service';
import { FormGroup } from '@angular/forms';
import { EInputValidation } from '../../../../../utils/interface/type-input-validation';
 
const getStyles = (...args: string[]) => [...args].filter(Boolean)
 
@Component({
  selector: 'app-input-library',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnChanges {

  @Input() form! : FormGroup;
  @Input() idTextField = 'idTextField';
  @Input() placeholder = ' ';
  @Input() label = 'label';
  @Input() type = 'text';
  @Input() disabled = false;
  @Input() value : string = "";
  @Input() maxLength = '60'; 
  @Input() minCaracter = 0; 
  @Input() size = 'md';
  @Input() paste = true;  
  @Input() height = '48px';
  @Input() icon = '';
  @Input() inputValidation!: EInputValidation;
  @Output() public valueChanged = new EventEmitter();
  @Output() public blurred = new EventEmitter();
  @Output() public enter = new EventEmitter();
  @Input() typeInput: "ClassicInput" | "ClassicInputRegistroPass" | "ClassicInputPass" = "ClassicInput";
  @Input() loading = false;
  @Input() readOnly=false;
   
  hasIcon = false;
  showPassword : boolean = false;  
  flgVerCaracteristicas: boolean = false; 

  isNumber: boolean = false;
  isMayuscula: boolean = false;
  isMinuscula: boolean = false;
  isSimbolo: boolean = false;
  isLength: boolean = false; 
 
  classInput = {
    'text-input': true,
    'error-input': false
  };
 

  constructor(
    private validatorsService: ValidatorsService
  ){

  }
  public get typeInputs(): string[] {
    return getStyles(this.typeInput)
  }
 
  isValidField() {
    return this.validatorsService.isValidField( this.form, this.idTextField );
  }
   
  getFieldError( field: string ): string | null {

    if ( !this.form.controls[field] ) {
      this.classInput['error-input'] = false;
      this.classInput['text-input'] = true;
      return null;
    }

    const errors = this.form.controls[field].errors || {};

    for (const key of Object.keys(errors) ) {
      switch( key ) {
        case 'required':
          this.onErrorInput();
          return `Ingresa un ${this.label}`;

        case 'minLength':
          this.onErrorInput();
          return  `El ${this.label} debe tener ${this.minCaracter} digitos`;

        case 'pattern':
          this.onErrorInput();
          return  `No tiene formato de ${this.label}`; 
      }
    }

    return null;
  }

  onErrorInput(){
    this.classInput['error-input'] = true;
    this.classInput['text-input'] = false;
  }

  ngOnChanges(changes: SimpleChanges) {  
    if (this.icon != "") this.hasIcon = true;
    else this.hasIcon = false;   
  }
 
  onChange(target: any) { 
    this.flgVerCaracteristicas = true;    
    target.value = target.value.substr(0, Number(this.maxLength)); 
    this.validPassword(target.value); 
    this.valueChanged.emit(target.value);  
  }
 
  onFocus(event : any){    
    this.classInput['error-input'] = true;
    this.classInput['text-input'] = false;
  }
 
  onBlur(event :any ){ 
    this.classInput['error-input'] = true;
    this.classInput['text-input'] = false;
    this.blurred.emit(event.value); 
  }

  onEnter(event: any, value: any) {
    this.enter.emit(value || event.target.value);
  }

  onPaste(event: ClipboardEvent) {
    if ((window as any).clipboardData) {
      const pastedText = (window as any).clipboardData;
    } else {
      const pastedText = event?.clipboardData?.getData('text');
    }
    return this.paste;
  }

  onchangeIconPass(){
    this.showPassword = !this.showPassword
  }

  validPassword(newPass : string) {  
    this.isMayuscula = false;
    this.isMinuscula = false;
    this.isNumber = false;
    this.isSimbolo = false;
    this.isLength = false;   

    for (let i = 0; i < newPass.length; i++) {
      if (newPass.charCodeAt(i) >= 65 && newPass.charCodeAt(i) <= 90) {
        this.isMayuscula = true;
      } else if ( newPass.charCodeAt(i) >= 97 && newPass.charCodeAt(i) <= 122 ) {
        this.isMinuscula = true;
      } else if ( newPass.charCodeAt(i) >= 48 && newPass.charCodeAt(i) <= 57 ) {
        this.isNumber = true;
      } else if (
        newPass.charCodeAt(i) >= 33 && newPass.charCodeAt(i) <= 47 ||
        newPass.charCodeAt(i) >= 58 && newPass.charCodeAt(i) <= 64 ||
        newPass.charCodeAt(i) >= 123 && newPass.charCodeAt(i) <= 126
        ) {
        this.isSimbolo = true;
      }
    }

    if (newPass.length >= 8) { 
      this.isLength = true;
    }
 
    if (this.isMayuscula && this.isMinuscula && this.isSimbolo && this.isLength && this.isNumber) {  
      this.flgVerCaracteristicas = false;  
    }else{
      this.flgVerCaracteristicas = true;  
    }
  }

}

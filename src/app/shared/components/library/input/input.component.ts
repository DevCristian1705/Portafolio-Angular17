import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
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
  @Input() isReadOnly = false; 
  @Input() value : string = "";
  @Input() typeCurrency : string = "";
  @Input() maxLength = '60'; 
  @Input() minCaracter : number = 0; 
  @Input() size = 'md';
  @Input() paste = true;  
  @Input() height = '48px';
  @Input() icon = '';
  @Input() inputValidation!: EInputValidation;
  @Output() public valueChanged = new EventEmitter();
  @Output() public blurred = new EventEmitter();
  @Output() public enter = new EventEmitter();
  @Input() typeInput: "ClassicInput" | "InputSimulator" | "ClassicInputRegistroPass" | "ClassicInputPass" = "ClassicInput";
  @Input() loading = false;
  @Input() readOnly=false;
   
  hasIcon = false;
  showPassword : boolean = false;  
  flgValidPass : boolean = false;  
  currentValueInput : string = "";
  expression!: RegExp;

  classInput = {
    'text-input': true,
    'error-input': false
  };
 

  constructor(
    private validatorsService: ValidatorsService, 
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
 
        case 'pattern':
          this.onErrorInput();
          let mssg : string = this.validatorsService.isValidCustomMessageError( this.form, field ); 
          return mssg

        case 'minlength':
            this.onErrorInput();  
            return this.validatorsService.isValidCustomMinLengthError( field, this.minCaracter);
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
    switch (this.inputValidation) {
      case EInputValidation.Number:
        this.expression = /[A-Za-z}{ÑÁÉÍÓÚñáéíóú`~!¡@#$%^&*()_|+\-=?;:'",.<>° ]/g;
        break;
      case EInputValidation.Alpha:
        this.expression = /[0-9`~!¡@#$%^&*()_|+\-=?;:'",.<>° ]/g;
        break;
      case EInputValidation.Alphanumeric:
        this.expression = /[`~!¡@#$%^&*()_|+\-=?;:'",.<>° ]/g;
        break;
      case EInputValidation.Text:
        this.expression = /[0-9`~!¡@#$%^&*()_|+\-=?;:'",.<>°]/g;
        break;
    }
  
    if (this.expression) {
      target.value = target.value
        .replace(this.expression, ''); 
    }

   
    target.value = target.value.substr(0, Number(this.maxLength)); 
    this.currentValueInput =  target.value;  
    this.valueChanged.emit(target.value);  
  }
 
  onFocus(event : any){    
    this.flgValidPass = true;    
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

 

}

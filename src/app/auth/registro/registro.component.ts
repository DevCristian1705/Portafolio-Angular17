import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import { StorageService } from '../../../utils/service/storage/storage.service';
import { GlobalService } from '../../shared/service/global';
import { STORAGE_KEY } from '../../../utils/constants/storage';
import { IUser } from '../../../utils/interface/user.interface';
import { EInputValidation } from '../../shared/components/library/input/input.component';
 
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

 registerForm!: FormGroup; 
 loadingButton: boolean = false;
 numberInput = EInputValidation.Number; 

get frmNameControl(): FormControl { return this.registerForm.get("names") as FormControl;}
get frmLastNameControl(): FormControl { return this.registerForm.get("lastname") as FormControl;}
get frmCellphoneControl(): FormControl { return this.registerForm.get("cellphone") as FormControl;}
get frmEmailControl(): FormControl { return this.registerForm.get("email") as FormControl;}
get frmPassControl(): FormControl { return this.registerForm.get("password") as FormControl;}

get getErrorName(): string {
  if (this.frmNameControl.invalid && this.frmNameControl.touched) {
    if (this.frmNameControl.hasError('required')) { return 'Ingresa un/tus nombre(s)'} 
  }
  return '';
}

get getErrorLastName(): string {
  if (this.frmLastNameControl.invalid && this.frmLastNameControl.touched) {
    if (this.frmLastNameControl.hasError('required')) { return 'Ingresa el/los/ apellidos'} 
  }
  return '';
}

get getErrorCellphone(): string {
  if (this.frmCellphoneControl.invalid && this.frmCellphoneControl.touched) {
    if (this.frmCellphoneControl.hasError('required')) { return 'Ingresa un celular'} 
    if (this.frmCellphoneControl.hasError('customErrorCellphone')) {
      return this.frmCellphoneControl?.errors?.['customErrorCellphone'];
    }
  }
  return '';
}

get getErrorEmail(): string { 
  if (this.frmEmailControl.invalid && this.frmEmailControl.touched) {
    if (this.frmEmailControl.hasError('required')) { return 'Ingresa un correo electrónico.'}
    if (this.frmEmailControl.hasError('pattern')) { return 'Ingresa un correo electrónico correcto.'} 
  }
  return '';
}

get getErrorPass(): string {
  if (this.frmPassControl.invalid && this.frmPassControl.touched) {
    if (this.frmPassControl.hasError('required')) { return 'Ingresa una contraseña'} 
    if (this.frmPassControl.hasError('customErrorPass')) {
      return this.frmPassControl?.errors?.['customErrorPass'];
    }
  }
  return '';
}


  constructor(
    public fb: FormBuilder, 
    private router: Router,  
    private storageService : StorageService,
    private globalsrv: GlobalService, 
  ) { 
    const patronCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    this.registerForm = this.fb.group({
      code_user: [ this.globalsrv.generateUniqueId('USER') , Validators.required],
      names: ['', [Validators.required, Validators.minLength(3)]],
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      cellphone: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern(patronCorreo)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  

  ngOnInit(): void {
    console.log('lista usuarior registrados', this.storageService.getData(STORAGE_KEY.listUser));
  }


  onLogin() {
    this.router.navigateByUrl("auth/login");
  }
 
 
  onRegistro() { 
    this.loadingButton = true;
    const newUser = this.registerForm.value;  
 
    //obtener la lista de usuarios registrados,
    // si ya existe indicar modal y mandarlo a login
    let listUserRegistrados : any = this.storageService.getData(STORAGE_KEY.listUser);
    this.onValidateDatos(listUserRegistrados, newUser);
  
  }


  onValidateDatos(listUserRegistrados: IUser[], newUser: IUser){ 
    let existingUser = listUserRegistrados.filter(user => user.code_user === newUser.code_user);

    if (existingUser.length === 0) {
      listUserRegistrados.push(newUser);
      this.storageService.setData(STORAGE_KEY.listUser, JSON.stringify(listUserRegistrados));
      this.onLogin(); 
    } else {
      console.log('El usuario con código ' + newUser.code_user + ' ya existe.');
      return;
    }
  
    this.loadingButton = false; 
  }


  

 
}

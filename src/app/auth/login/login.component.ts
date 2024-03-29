import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';   
import { StorageService } from '../../../utils/service/storage/storage.service';
import { STORAGE_KEY } from '../../../utils/constants/storage';
import { IUser } from '../../../utils/interface/user.interface';

@Component({
  selector: 'app-login', 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent   {

  loginForm!: FormGroup; 
  loadingButton: boolean = false; 
  userReg : IUser = {} as IUser;

  emailExiste : boolean = false; 

  constructor(
    public fb: FormBuilder, 
    private router: Router,  
    private storageService : StorageService
  ) {
    const patronCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern(patronCorreo)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  
  get frmEmailControl(): FormControl { return this.loginForm.get("email") as FormControl;  }
  get frmPassControl(): FormControl { return this.loginForm.get("password") as FormControl;  }

  get getErrorEmail(): string { 
    if (this.frmEmailControl.invalid && this.frmEmailControl.touched) {
      if (this.frmEmailControl.hasError('required')) { return 'Ingresa un correo electrónico.'}
      if (this.frmEmailControl.hasError('pattern')) { return 'Ingresa un correo electrónico correcto.'}
      if (this.frmEmailControl.hasError('customErrorEmail')) { return this.frmEmailControl?.errors?.['customErrorEmail']}
    }
    return '';
  }

  get getErrorPass(): string {
    if (this.frmPassControl.invalid && this.frmPassControl.touched) {
      if (this.frmPassControl.hasError('required')) { return 'Ingresa una contraseña'}
      if (this.frmPassControl.hasError('customErrorPass')) { return this.frmPassControl?.errors?.['customErrorPass']}
    }
    return '';
  }

 

  onLogin() {
    this.loadingButton = true
    const dataForm = this.loginForm.value; 

    if (this.onValidateCredentials(dataForm.email, dataForm.password)) { 
      this.loadingButton = false;   
      this.onNavigate('dashboard');
    } else {
      console.log('Los datos no existen, te invitamos a registrarte');
      this.loadingButton = false;  
    } 
  }

  onValidateCredentials(email: string, password: string): boolean {
    const users : any = this.storageService.getData(STORAGE_KEY.listUser)
    const listUserRegistrados = JSON.parse(users) || []; 
    const user = listUserRegistrados.find((user: any) => user.email === email && user.password === password);
    return user !== undefined;
  }

  

 
  onNavigate(url : string){
    this.router.navigateByUrl(url);
  }

}


import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../../../utils/interface/user.interface';
import { Router } from '@angular/router';
import { StorageService } from '../../../utils/service/storage/storage.service';
import { STORAGE_KEY } from '../../../utils/constants/storage';

@Component({
  selector: 'app-change-password', 
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {

  loginForm!: FormGroup; 
  loadingButton: boolean = false; 
  userReg : IUser = {} as IUser;

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

  ngOnInit(){ 
  }

  
  onLogin() {
    this.router.navigateByUrl("auth");
  }

  onChangePass(){
    const DATOS_FORM = this.loginForm.value;
    this.updateUserPassword(DATOS_FORM.email, DATOS_FORM.password);
  }

  updateUserPassword(email: string, newPassword: string): void { 
    const users : any = this.storageService.getData(STORAGE_KEY.listUser)
    const listUserRegistrados = JSON.parse(users) || []; 
 
    const userIndex = listUserRegistrados.findIndex((user: any) => user.email === email);

    if (userIndex !== -1) {
      listUserRegistrados[userIndex].password = newPassword;  
      this.storageService.setData(STORAGE_KEY.listUser, JSON.stringify(listUserRegistrados)); 
      this.onLogin();
    } else {
      console.log('User not found');
    } 
  }

}

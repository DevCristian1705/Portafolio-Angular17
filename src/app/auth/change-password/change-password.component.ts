import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../../../utils/service/storage/storage.service';
import { STORAGE_KEY } from '../../../utils/constants/storage';
import { ValidatorsService } from '../../shared/service/validators.service';

@Component({
  selector: 'app-change-password', 
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {

  loginForm!: FormGroup; 
  loadingButton: boolean = false; 
 
  constructor(
    public fb: FormBuilder, 
    private router: Router,  
    private storageService : StorageService,
    private validatorsService: ValidatorsService
  ) {
 
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  
  onLogin() {
    this.router.navigateByUrl("auth");
  }

  onChangePass(){
    const {email, password} = this.loginForm.value;
    this.updateUserPassword(email, password);
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

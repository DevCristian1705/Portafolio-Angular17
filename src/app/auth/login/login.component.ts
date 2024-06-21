import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';   
import { DialogMessageComponent } from '../../shared/components/dialog/dialog-message/dialog-message.component';
import { MatDialog } from '@angular/material/dialog';
import { messageAuth } from '../../shared/components/message-type/message-type';
import { ValidatorsService } from '../../shared/service/validators.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login', 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent   {
 
  loadingButton: boolean = false; 
  loginForm! : FormGroup;
  showPassword : boolean = false;  
  
  private authServie = inject(AuthService)
  private router = inject(Router)
  private dialog = inject(MatDialog)
  private fb = inject(FormBuilder)
  private validatorsService = inject(ValidatorsService)


  classInput = {
    'text-input': true,
    'error-input': false
  };

  constructor() {
    this.onCreateForm();
  }
    
  onCreateForm(){
    this.loginForm  = this.fb.group({
      email: ['Cristian@prueba.com', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)]],
      password: ['123456', [Validators.required, Validators.minLength(6)]],
    });
  }


  onLogin() { 
    this.loadingButton = true
    const {email , password } = this.loginForm.value;  

    this.authServie.login(email, password).subscribe({
      next: () => this.router.navigateByUrl('/Dashboard'),
      error: () =>  this.onMessageModal()
    });

  }

  onMessageModal(){
    const dialogRef = this.dialog.open(DialogMessageComponent, {
      disableClose: false, width: '350px', data: messageAuth.datos_Noexistentes 
    });

    dialogRef.afterClosed().subscribe(() => this.onNavigate('/auth/registro'));   
    this.loadingButton = false;  
  }

  onNavigate(url : string){
    this.router.navigateByUrl(url);
  }

  isValidField(field: string){
    return this.loginForm.controls[field].errors && this.loginForm.controls[field].touched; 
  }

  getFieldError(field : string){
    if ( !this.loginForm.controls[field] ) {
      this.classInput['error-input'] = false;
      this.classInput['text-input'] = true;
      return null;
    }

    const errors = this.loginForm.controls[field].errors || {};

    for (const key of Object.keys(errors) ) {
      switch( key ) {
        case 'required':
          this.onErrorInput();
          return `Ingresa un ${field}`;
        case 'pattern':
          this.onErrorInput();
          return `No tienes formato de ${field}`; 
        case 'minlength':
          this.onErrorInput();  
          return `${field} debe tener `;
      }
    }

    return null;
  }


  onErrorInput(){
    this.classInput['error-input'] = true;
    this.classInput['text-input'] = false;
  }


}


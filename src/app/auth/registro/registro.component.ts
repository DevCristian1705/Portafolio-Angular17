import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import { MatDialog } from '@angular/material/dialog';
import { DialogMessageComponent } from '../../shared/components/dialog/dialog-message/dialog-message.component';
import { messageAuth } from '../../shared/components/message-type/message-type';
import { ValidatorsService } from '../../shared/service/validators.service';
import { AuthService } from '../service/auth.service';
import { User } from '../interfaces';
import { tap } from 'rxjs';
 
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
 
  isLoadingButton: boolean = false; 
  users : any[] = [];  
  registerForm! : FormGroup
  classInput : string  = 'text-input'
  isShowPassword : boolean = false;

  private authServie = inject(AuthService);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private fb = inject(FormBuilder);
  private validatorsService = inject(ValidatorsService);

  constructor( 
  ) { 
    this.onCreateForm();
  }
 
  onCreateForm(){
    this.registerForm = this.fb.group({  
      names: ['', [Validators.required, Validators.minLength(3)]],
      lastname: ['', [Validators.required, Validators.minLength(3)]],  
      email: ['', [Validators.required, Validators.minLength(10), Validators.pattern(this.validatorsService.emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  
  onLogin() {
    this.router.navigateByUrl("auth/login");
  }
  
  onRegistro() { 
    this.isLoadingButton = true; 
    const NEWUSER : User = this.registerForm.value;  
    this.authServie.create(NEWUSER).
    pipe(
      tap( () =>  this.isLoadingButton = false )
    ).
    subscribe({
      next: () => this.onLogin(),
      error: () =>  this.onMessageModal()
    }); 
  }
  
    onMessageModal(){
      const dialogRef = this.dialog.open(DialogMessageComponent, {
        disableClose: false, width: '350px', data: messageAuth.datos_existentes 
      }); 
      dialogRef.afterClosed().
      pipe(
        tap( () =>  this.isLoadingButton = false )
      ).
      subscribe(() => this.onLogin());   
    }
  

    isValidField(field: string){
      return this.registerForm.controls[field].errors && this.registerForm.controls[field].touched; 
    }
  
    getFieldError(field : string){
      if ( !this.registerForm.controls[field] ) return null;
  
      const errors = this.registerForm.controls[field].errors || {};
  
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
      this.classInput = 'error-input';
    }

    
  
  }



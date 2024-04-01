import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';   
import { StorageService } from '../../../utils/service/storage/storage.service';
import { IUser } from '../../../utils/interface/user.interface';
import { STORAGE_KEY } from '../../../utils/constants/storage';
import { DialogMessageComponent } from '../../shared/components/dialog/dialog-message/dialog-message.component';
import { MatDialog } from '@angular/material/dialog';
import { messageAuth } from '../../shared/components/message-type/message-type';

@Component({
  selector: 'app-login', 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent   {

  loginForm!: FormGroup; 
  loadingButton: boolean = false; 
  userReg : IUser = {} as IUser;
  listUser : any[] = [];
  emailExiste : boolean = false; 

  constructor(
    public fb: FormBuilder, 
    private router: Router,  
    private storageService : StorageService,
    public dialog: MatDialog
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
    console.log('userSession', this.storageService.getData(STORAGE_KEY.listUser));
  }
 

  onLogin() { 
    this.loadingButton = true
    const DATA_FORM = this.loginForm.value;  
    if(this.onValidateCredentials(DATA_FORM.email, DATA_FORM.password)) { 
      this.loadingButton = false;    
      this.onNavigate('/dashboard');
    } else {
       
      const dialogRef = this.dialog.open(DialogMessageComponent, {
        disableClose: false, width: '350px', data: messageAuth.datos_Noexistentes 
      });

      dialogRef.afterClosed().subscribe((resp: boolean) => { 
        this.onNavigate('/auth/registro');
      });   
      this.loadingButton = false;  
    } 
  }

  onValidateCredentials(email: string, password: string): boolean {  
    const listUserRegistrados: IUser[] = this.storageService.listUsuarios()
    const user = listUserRegistrados.find((user: any) => user.email === email && user.password === password);
    //seteamos  la session del usuario
    const userIndex = listUserRegistrados.findIndex((user: any) => user.email === email && user.password === password);
    if (userIndex !== -1) {
      listUserRegistrados[userIndex]  
      this.storageService.setSessionUser(listUserRegistrados[userIndex]);  
    } 

    return user !== undefined;
  }
 
 
  onNavigate(url : string){
    this.router.navigateByUrl(url);
  }

}


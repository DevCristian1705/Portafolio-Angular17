import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';   
import { StorageService } from '../../../utils/service/storage/storage.service';
import { IUser } from '../../../utils/interface/user.interface';
import { STORAGE_KEY } from '../../../utils/constants/storage';
import { DialogMessageComponent } from '../../shared/components/dialog/dialog-message/dialog-message.component';
import { MatDialog } from '@angular/material/dialog';
import { messageAuth } from '../../shared/components/message-type/message-type';
import { ValidatorsService } from '../../shared/service/validators.service';

@Component({
  selector: 'app-login', 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent   {
 
  loadingButton: boolean = false; 
   
  public loginForm : FormGroup = this.fb.group({
    email: ['', [Validators.required,  Validators.minLength(4), Validators.pattern(this.validatorsService.emailPattern)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor(
    public fb: FormBuilder, 
    private router: Router,  
    private storageService : StorageService,
    public dialog: MatDialog,
    private validatorsService: ValidatorsService
  ) { 
  }
    
  onLogin() { 
    this.loadingButton = true
    const {email , password } = this.loginForm.value;  
    if(this.onValidateCredentials(email, password)) { 
      this.loadingButton = false;    
      this.onNavigate('/dashboard');
    } else {
      const dialogRef = this.dialog.open(DialogMessageComponent, {
        disableClose: false, width: '350px', data: messageAuth.datos_Noexistentes 
      });

      dialogRef.afterClosed().subscribe(() => this.onNavigate('/auth/registro'));   
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
      this.storageService.setData(
        STORAGE_KEY.sessionUser, 
        JSON.stringify(listUserRegistrados[userIndex])
      );
    } 

    return user !== undefined;
  }
 
 
  onNavigate(url : string){
    this.router.navigateByUrl(url);
  }

}


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import { StorageService } from '../../../utils/service/storage/storage.service';
import { GlobalService } from '../../shared/service/global';
import { STORAGE_KEY } from '../../../utils/constants/storage';
import { IUser } from '../../../utils/interface/user.interface'; 
import { MatDialog } from '@angular/material/dialog';
import { DialogMessageComponent } from '../../shared/components/dialog/dialog-message/dialog-message.component';
import { messageAuth } from '../../shared/components/message-type/message-type';
import { ValidatorsService } from '../../shared/service/validators.service';
import { EInputValidation } from '../../../utils/interface/type-input-validation';
 
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent  {

 registerForm!: FormGroup; 
 loadingButton: boolean = false;
 numberInput = EInputValidation.Number; 
 listUser : any[] = [];
 

  constructor(
    public fb: FormBuilder, 
    private router: Router,  
    private storageService : StorageService,
    private globalsrv: GlobalService, 
    public dialog: MatDialog,
    private validatorsService: ValidatorsService
  ) { 
 
    this.registerForm = this.fb.group({
      code_user: [ this.globalsrv.generateUniqueId('USER') , Validators.required], 
      names: ['', [Validators.required, Validators.minLength(3)]],
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      cellphone: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern(this.validatorsService.emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
 
  onLogin() {
    this.router.navigateByUrl("auth/login");
  }
  
  onRegistro() { 
    this.loadingButton = true; 
    this.onValidateDatos(this.registerForm.value); 
  }
 
  onValidateDatos(newUser: IUser){  
    this.listUser.push(this.storageService.listUsuarios()); 
    const listUserRegistrados = this.listUser
 
    let existingUser = listUserRegistrados.filter((user: IUser) => 
        user.names === newUser.names 
        && user.email === newUser.email
    );
 
    if (existingUser.length === 0) {
      listUserRegistrados.push(newUser);
      this.storageService.setData(STORAGE_KEY.listUser, JSON.stringify(listUserRegistrados));
      this.loadingButton = false; 
      this.onLogin(); 
    } else { 
      this.loadingButton = false;   
      const dialogRef = this.dialog.open(DialogMessageComponent, {
        disableClose: false, width: '350px', data: messageAuth.datos_existentes 
      }); 
      dialogRef.afterClosed().subscribe(() => this.onLogin());   
      return;
    }
  
  
  }


  

 
}

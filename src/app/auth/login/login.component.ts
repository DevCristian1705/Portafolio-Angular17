import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';  
import { EncrdecrService } from '../../../utils/service/encrdecr.service';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent   {

  loginForm!: FormGroup; 
  loadingButton: boolean = false; 
 
  constructor(
    public fb: FormBuilder, 
    private router: Router, 
    private serviceEncrypt: EncrdecrService, 
  ) {
    const patronCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern(patronCorreo)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  
  get frmEmailControl(): FormControl {
    return this.loginForm.get("email") as FormControl;
  }
  get frmPassControl(): FormControl {
    return this.loginForm.get("password") as FormControl;
  }

  get getErrorEmail(): string { 
    if (this.frmEmailControl.invalid && this.frmEmailControl.touched) {
      if (this.frmEmailControl.hasError('required')) {
        return 'Ingresa un correo electrónico.';
      }

      if (this.frmEmailControl.hasError('pattern')) {
        return 'Ingresa un correo electrónico correcto.';
      }
      if (this.frmEmailControl.hasError('customErrorEmail')) {
        return this.frmEmailControl?.errors?.['customErrorEmail'];
      }
    }
    return '';
  }


  get getErrorPass(): string {
    if (this.frmPassControl.invalid && this.frmPassControl.touched) {
      if (this.frmPassControl.hasError('required')) {
        return 'Ingresa una contraseña';
      }
      if (this.frmPassControl.hasError('customErrorPass')) {
        return this.frmPassControl?.errors?.['customErrorPass'];
      }
    }
    return '';
  }

 
  ngOnInit(){
  
  }

  onLogin() {
    this.loadingButton = true
    const dataForm = this.loginForm.value;
    dataForm.password = this.serviceEncrypt.setSha(dataForm.password);

    console.log("datos dataForm",dataForm);

    //filtramos el email para obtener datos del usuario registrado
    //y dejarlo pasar al dashboard o dejarlo ver los proyectos

    // this.globalObservable.getUser(email).subscribe((res: any)=>{
    //creamos una variable para llenar los datos del usuario logeado
      // userLogged 
      // if(ID_USER === res.ID_USER){
       // userLogger = resp;
       //this.router.navigateByUrl('dashboard');
    //  }
      
    //})

  }

  onChangePassword() {
    this.router.navigateByUrl('auth/cambio-contrasenea');
  }
 
  onRegistro() {
    this.router.navigateByUrl("auth/registro");
  }


}


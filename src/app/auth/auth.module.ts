import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from "@angular/core"; 
import { SharedModule } from "../shared/shared.module";
import { AuthComponent } from "./auth.component";
import { AuthRoutingModule } from "./auth-routing.module";
import { LoginComponent } from './login/login.component'; 
import { CommonModule } from "@angular/common";
import { RegistroComponent } from './registro/registro.component';
import { ChangePasswordComponent } from "./change-password/change-password.component";
 
@NgModule({
    declarations: [
        AuthComponent,
        LoginComponent,
        RegistroComponent, 
        ChangePasswordComponent
    ], 
    imports: [   
        CommonModule,
        AuthRoutingModule, 
        SharedModule,
        
    ],
    providers: [    
        { provide: LOCALE_ID, useValue: 'es' }  
    ],  
    bootstrap: [AuthComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AuthModule{}

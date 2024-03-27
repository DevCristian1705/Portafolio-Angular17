import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from "@angular/core"; 
import { SharedModule } from "../shared/shared.module";
import { AuthComponent } from "./auth.component";
import { AuthRoutingModule } from "./auth-routing.module";
import { LoginComponent } from './login/login.component'; 
import { CommonModule } from "@angular/common";
import { RegistroComponent } from './registro/registro.component';
 
@NgModule({
    declarations: [
        AuthComponent,
        LoginComponent,
        RegistroComponent, 
    ], 
    imports: [   
        CommonModule,
        AuthRoutingModule, 
        SharedModule
    ],
    providers: [    
        { provide: LOCALE_ID, useValue: 'es' }  
    ],  
    bootstrap: [AuthComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AuthModule{}

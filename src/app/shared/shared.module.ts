import { NgModule } from "@angular/core";   
import { ButtonComponent } from "./components/library/button/button.component";
import { FooterComponent } from "./components/footer/footer.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { CommonModule } from "@angular/common";
import { MenuComponent } from "./components/library/menu/menu.component";
import { InputComponent } from "./components/library/input/input.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
 
 
import { DialogMessageComponent } from "./components/dialog/dialog-message/dialog-message.component";
import { AppObservable } from "../../utils/observables/app.observable";
import { StripHtmlDirective } from "../../utils/directives/strip-html.directive";
import { SanitizeHtmlPipe } from "../../utils/interceptor/pipes/sanitizeHtml.pipe"; 
import { ReactiveFormDirective } from "../../utils/directives/reactiveForm.directive"; 
import { RouterOutlet } from "@angular/router";
import { CardComponent } from "./components/library/card/card.component";
import { SidebarComponent } from "./components/library/sidebar/sidebar.component";
import { MatDialogRef } from "@angular/material/dialog";
import { DialogEncuestaComponent } from "./components/dialog/dialog-encuesta/dialog-encuesta.component";
import { DialogConfirmComponent } from "./components/dialog/dialog-confirm/dialog-confirm.component";
import { PageValidPasswordComponent } from "./components/library/page-valid-password/page-valid-password.component";
import { HttpClientModule } from "@angular/common/http";
 
 
const MODULE_DIRECTIVES = [
    ReactiveFormDirective,  
    StripHtmlDirective,
]
 
const MODULE_PIPES = [
    SanitizeHtmlPipe
]

const MODULE_DIALOG = [
    DialogMessageComponent,
    DialogEncuestaComponent,
    DialogConfirmComponent
]


@NgModule({
    imports: [
        CommonModule,
        FormsModule, 
        ReactiveFormsModule,
        HttpClientModule,
        RouterOutlet,   
    ],

    declarations: [
        ...MODULE_DIRECTIVES,
        ...MODULE_PIPES,
        ...MODULE_DIALOG,
        FooterComponent, 
        ButtonComponent,
        NavbarComponent,
        MenuComponent,
        InputComponent, 
        CardComponent,
        SidebarComponent,
        PageValidPasswordComponent
        
    ],

    exports: [
        ...MODULE_DIRECTIVES,
        ...MODULE_PIPES,
        ...MODULE_DIALOG,
        FormsModule,
        ReactiveFormsModule,  
        FooterComponent,
        NavbarComponent,
        ButtonComponent,
        MenuComponent,
        InputComponent, 
        CardComponent, 
        SidebarComponent,
        PageValidPasswordComponent
    ],
 
    providers :[
        AppObservable,   
        { provide: MatDialogRef, useValue: {} }, 
    ]
 
})

export class SharedModule{}

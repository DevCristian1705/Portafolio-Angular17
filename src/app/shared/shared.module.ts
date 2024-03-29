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
import { CellphoneValidationDirective } from "../../utils/directives/cellphone.validation.directive";
import { PasswordValidationDirective } from "../../utils/directives/pass.validate.directive";
import { ReactiveFormDirective } from "../../utils/directives/reactiveForm.directive";
import { EmailValidationDirective } from "../../utils/directives/email-validation.directive";
import { RouterOutlet } from "@angular/router";
import { CardComponent } from "./components/library/card/card.component";
import { SidebarComponent } from "./components/library/sidebar/sidebar.component";
 
const MODULE_DIRECTIVES = [
    ReactiveFormDirective,
    EmailValidationDirective,
    PasswordValidationDirective,
    CellphoneValidationDirective,
    StripHtmlDirective,
]
 
const MODULE_PIPES = [
    SanitizeHtmlPipe
]

const MODULE_DIALOG = [
    DialogMessageComponent
]


@NgModule({
    imports: [
        CommonModule,
        FormsModule, 
        ReactiveFormsModule,
        RouterOutlet
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
        SidebarComponent
        
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
        SidebarComponent
    ],
 
    providers :[
        AppObservable,  
    ]
 
})

export class SharedModule{}

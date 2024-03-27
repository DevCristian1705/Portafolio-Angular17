import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common"; 
import { LandingRoutingModule } from "./landing-routing.module"; 
import { LandingComponent } from "./landing.component"; 
import { SharedModule } from "../shared/shared.module";
 
@NgModule({
    declarations: [
        LandingComponent, 
    ],
    imports: [
        CommonModule,
        LandingRoutingModule,
        SharedModule
    ],
    providers: [    
        { provide: LOCALE_ID, useValue: 'es' },
    ],

    bootstrap: [LandingComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LandingModule{}

import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
 
import { AppComponent } from './app.component';   
import { CommonModule } from '@angular/common'; 
import { SharedModule } from './shared/shared.module';  
import { AppRoutingModule } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LandingComponent } from './landing/landing.component';
 

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent, 
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers:[
    provideAnimationsAsync(), 
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }

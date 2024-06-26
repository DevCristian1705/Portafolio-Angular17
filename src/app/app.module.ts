import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
 
import { AppComponent } from './app.component';   
import { CommonModule } from '@angular/common'; 
import { SharedModule } from './shared/shared.module'; 
import { SecureURLComponent } from './secure-url/secure-url.component';
import { AppRoutingModule } from './app.routes';
 
 

@NgModule({
  declarations: [
    AppComponent,
    SecureURLComponent, 
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    
  ],
  
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }

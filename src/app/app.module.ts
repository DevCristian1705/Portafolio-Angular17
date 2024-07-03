import { CUSTOM_ELEMENTS_SCHEMA, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
 
import { AppComponent } from './app.component';   
import { CommonModule } from '@angular/common'; 
import { SharedModule } from './shared/shared.module';  
import { AppRoutingModule } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LandingComponent } from './landing/landing.component';
import { provideTransloco } from '@ngneat/transloco'; 
import { TranslocoRootModule } from './transloco.root.module';


@NgModule({
  declarations: [
    AppComponent,
    LandingComponent, 
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    TranslocoRootModule
  ],
  providers:[
    provideAnimationsAsync(), 
    provideTransloco({
      config: {
          availableLangs: ['en', 'es'],
          defaultLang: 'en',
          // Remove this option if your application doesn't support changing language in runtime.
          reRenderOnLangChange: true,
          prodMode: !isDevMode(),
      },
  })
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }

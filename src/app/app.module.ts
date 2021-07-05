import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//angular fire
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

// Ngrx
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducers } from './app.reducer';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { environment } from 'src/environments/environment';

//Modulos
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    AuthModule,

    AppRoutingModule,
    
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    StoreModule.forRoot( appReducers ),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

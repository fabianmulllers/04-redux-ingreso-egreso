import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { from, of, Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';


import { Store } from '@ngrx/store';
import * as authAction from '../auth/auth.actions';
import { Usuario } from '../modelos/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription!: Subscription

  constructor(
    public auth: AngularFireAuth,
    public firestore: AngularFirestore,
    private store:Store
  ) { }
  
  initAuthListener(){

    return this.auth.authState.subscribe( fbUser => {

      if( fbUser ){

        this.userSubscription = this.firestore.doc(`/${ fbUser.uid }/usuario`).valueChanges()
          .subscribe( (firestoreUser : any) => {
            
            console.log( {firestoreUser} )
            
            const user = Usuario.fromFirebase( firestoreUser );

            this.store.dispatch( authAction.setUser({ user }) );

          })
      }else{

        if( this.userSubscription ){
          this.userSubscription.unsubscribe();
        }

        this.store.dispatch( authAction.unSetUser() );

      }

    })
  }

  crearUsuario( nombre: string, correo: string, password: string){
    
    return this.auth.createUserWithEmailAndPassword(correo, password)
            .then( ({ user }) => {
            
              const newUser = new Usuario( user!.uid, nombre, correo )
            
              return this.firestore.doc(`${ user!.uid }/usuario`).set( { ...newUser } );

            })
  }

  loginUsuario( correo: string, password: string){
    return this.auth.signInWithEmailAndPassword(correo, password); // observable
    // return from(this.auth.signInWithEmailAndPassword(correo, password)); //promesa
  }

  logout(){
    return this.auth.signOut();
  }

  isAuth(){
    return this.auth.authState.pipe(
      map( fbUser => fbUser != null)
    )

  }

}

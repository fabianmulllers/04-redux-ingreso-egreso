import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, of, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Usuario } from '../modelos/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public auth: AngularFireAuth,
    public firestore: AngularFirestore
    
  ) { }
  
  initAuthListener(){

    return this.auth.authState.subscribe( fbUser => {
      console.log( fbUser );
      console.log( fbUser?.uid);
      console.log( fbUser?.email );

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

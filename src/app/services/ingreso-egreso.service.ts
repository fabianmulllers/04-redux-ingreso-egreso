import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresoEgreso } from '../modelos/ingreso-egreso.model';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService implements OnInit{

  constructor(

    private firestore:AngularFirestore,
    private authService: AuthService
  ) { }


  ngOnInit(): void {
      const { uid } = this.authService.user;
  }

  crearIngresoEgreso( ingresoEgreso: IngresoEgreso ){
    
    const { uid } = this.authService.user;
    console.log( ingresoEgreso );
    return this.firestore.doc(`/${ uid }/ingresos-egresos`)
      .collection('items')
      .add({...ingresoEgreso })
  }

  initIngresosEgresosListener( uid: string){
    
    // return 
    return this.firestore.collection(`/${ uid }/ingresos-egresos/items`)
      .valueChanges({ idField: 'uid' })
      // .snapshotChanges()
      // .pipe(
      //   map( snapshot => ( snapshot.map(doc => ({ uid: doc.payload.doc.id , ... doc.payload.doc.data() as any })) ) )
      // )
  }

  borrarIngresoEgreso( uidItem: string ){
    const { user } = this.authService;
    return this.firestore.doc(`/${ user.uid }/ingresos-egresos/items/${ uidItem }`).delete();
  }

}

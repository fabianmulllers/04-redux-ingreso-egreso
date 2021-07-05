import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { Usuario } from '../modelos/usuario.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import * as ingresosEgresosAction from '../ingreso-egreso/ingreso-egreso.action';
import { IngresoEgreso } from '../modelos/ingreso-egreso.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit,OnDestroy {
  
  userSubs!: Subscription;
  ingresoSubs! : Subscription

  constructor(
     private store: Store<AppState>,
     private ingresoEgreso: IngresoEgresoService

  ) { }
  
  ngOnInit(): void {
    
    this.userSubs = this.store.select( 'user' )
      .pipe( 
        filter( auth => auth.user.uid.length > 0 )
      )
      .subscribe( user =>{

        const { uid } = user.user;
        
        this.ingresoSubs = this.ingresoEgreso.initIngresosEgresosListener( uid )
          .subscribe( (ingresosEgresos: any) => {

            // console.log( ingresosEgresos );
            this.store.dispatch( ingresosEgresosAction.setItems( { items: ingresosEgresos } ) );

          })
      
        }

    );
  }
    
  ngOnDestroy(): void {
    this.userSubs?.unsubscribe();
    this.ingresoSubs?.unsubscribe();
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from '../../modelos/ingreso-egreso.model';
import { filter, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../../services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { AppStateWithIngreso } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit,OnDestroy {
  
  ingresosEgresos: IngresoEgreso[] = [] 
  ingresosEgresosSubs!: Subscription;

  constructor(
    private store: Store<AppStateWithIngreso>,
    private ingresoEgresoService: IngresoEgresoService
  ) { }
  
  ngOnInit(): void {
    
    this.ingresosEgresosSubs = this.store.select( 'ingresosEgresos' )
    
    .pipe(
      filter( ({items}) => items.length > 0)
      )
      .subscribe( ({items}) => this.ingresosEgresos = items);
      
  }
    
  ngOnDestroy(): void {
  
    this.ingresosEgresosSubs.unsubscribe();
  }



  borrar( uid: string){

    this.ingresoEgresoService.borrarIngresoEgreso( uid )
      .then( _ => Swal.fire('Borrado','Item Borrado', 'success') )
      .catch( err => Swal.fire('Error', err.message , 'error'))

  }

}

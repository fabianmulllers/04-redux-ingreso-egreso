import { Component, OnDestroy, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { AppState } from '../app.reducer';
import { IngresoEgreso } from '../modelos/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import * as ui from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [
  ]
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

    ingresoForm: FormGroup = this.fb.group({
        descripcion: ['',[Validators.required]],
        monto:['',[Validators.required]],
    });
    tipo: string = 'ingreso';
    cargando: boolean = false;
    loadingSubs!: Subscription;
    constructor(
        private fb:FormBuilder,
        private ingresoEgresoService: IngresoEgresoService,
        private store: Store<AppState>
    ) { }
    
    ngOnInit(): void {    
        
        this.loadingSubs =this.store.select('ui')
        .subscribe( ({isLoading}) => this.cargando = isLoading)
    }
    
    ngOnDestroy(): void {
        
        this.loadingSubs.unsubscribe();
    }


    guardar(){
        
        if(this.ingresoForm.invalid){ return;}
        
        this.store.dispatch( ui.isLoading() )
        const { descripcion, monto } = this.ingresoForm.value
        const ingresoEgreso = new IngresoEgreso( descripcion, monto, this.tipo, null);
        this.ingresoEgresoService.crearIngresoEgreso( ingresoEgreso )
            .then( (resp) => {
                console.log( 'exito', resp )
                Swal.fire('Registro creado', descripcion, 'success');
                this.store.dispatch( ui.stopLoading() )
                this.ingresoForm.reset()
            } )
            .catch( (err) => {
                Swal.fire('Error', err.message , 'error');
                this.store.dispatch( ui.stopLoading() )
            })
    }

}

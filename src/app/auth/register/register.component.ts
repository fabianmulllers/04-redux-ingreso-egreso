import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

import * as ui from '../../shared/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {
  
  
  miFormulario: FormGroup = this.fb.group({
    nombre: ['',Validators.required],
    correo: ['',[Validators.required, Validators.email] ],
    password: ['',Validators.required],

  })
  
  cargando:boolean = false;
  uiSubscription!: Subscription

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.select( 'ui' )
      .subscribe( ui =>{
        this.cargando = ui.isLoading;
        console.log( 'cargando subs',ui )  
      });
  }
  
  miCampoValido( campo: string ){
    return this.miFormulario.get( campo )?.valid &&
    this.miFormulario.get( campo )?.statusChanges
  }

  crearUsuario(){
    if(this.miFormulario.invalid){ return }
      
    this.store.dispatch( ui.isLoading() );
    // Swal.fire({
    //   title: 'Espere por favor',
    //   didOpen: () => {
    //     Swal.showLoading()
    //   },
    // });

    const { nombre, correo, password }  = this.miFormulario.value  

    this.authService.crearUsuario( nombre, correo, password)
      .then( credenciales => {
        console.log( credenciales );
        // Swal.close();
        this.store.dispatch( ui.stopLoading() );
        
        this.router.navigateByUrl('/dashboard')
      })
      .catch( err => {

        this.store.dispatch( ui.stopLoading() );

        Swal.fire({
          title: 'Error!',
          text: err.message,
          icon: 'error',
          confirmButtonText: 'Cerrar'
        })
      });

  }

}

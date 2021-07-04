import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

// alert
import Swal from 'sweetalert2';

//reducer
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';

// observer
import { of, EMPTY, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { AjaxError } from 'rxjs/ajax'
import * as ui from '../../shared/ui.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy {
  
  loginForm: FormGroup = this.fb.group({
    email: ['fabian@fabian.cl',[Validators.email, Validators.required]],
    password: ['123456',[ Validators.required]],

  })
  
  cargando: boolean = false;
  uiSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService:AuthService,
    private store: Store<AppState>,
    private router:Router
  ) { }

  
  ngOnInit(): void {
    
    this.uiSubscription = this.store.select('ui')
    .subscribe( ui => {
      this.cargando = ui.isLoading;
      console.log( 'cargando subs' );
    });
    
  }
  
  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  campoValido( campo: string){
    return this.loginForm.get( campo )?.valid &&
    this.loginForm.get( campo )?.statusChanges;
  }

  validarUsuario(){
    if( this.loginForm.invalid ){ return }
      
    this.store.dispatch( ui.isLoading() )

    // Swal.fire({
    //   title: 'Espere por favor',
    //   didOpen: () => {
    //     Swal.showLoading()
    //   },
    // });

    
    // promesa
    const { email, password } = this.loginForm.value;

    this.authService.loginUsuario( email, password)
      .then( resp => {
        console.log( resp )
        // Swal.close();
        this.store.dispatch( ui.stopLoading() )
        this.router.navigateByUrl('/dashboard')
      })
      .catch( err => {

          this.store.dispatch( ui.stopLoading() )

          Swal.fire({
            title: 'Error!',
            text: err.message,
            icon: 'error',
            confirmButtonText: 'Cerrar'
          })
      });

    // observable
    // this.authService.loginUsuario( email, password).pipe(
    //     catchError( ( err ) => {
            
    //         Swal.fire({
    //           title: 'Error!',
    //           text: 'Do you want to continue',
    //           icon: 'error',
    //           confirmButtonText: 'Cool'
    //         })

    //         return EMPTY;
    //     }) 
    //   ).subscribe( resp => {
    //       console.log( resp );
    //       this.router.navigateByUrl( '/dashboard' );
    //     },
    //   )
  }
}

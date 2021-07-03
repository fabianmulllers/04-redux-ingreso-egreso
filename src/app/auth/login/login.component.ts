import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { catchError } from 'rxjs/operators'
import { of, EMPTY } from 'rxjs';
import { AjaxError } from 'rxjs/ajax'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup = this.fb.group({
    email: ['',[Validators.email, Validators.required]],
    password: ['',[ Validators.required]],

  })

  constructor(
    private fb: FormBuilder,
    private authService:AuthService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  campoValido( campo: string){
    return this.loginForm.get( campo )?.valid &&
    this.loginForm.get( campo )?.statusChanges;
  }

  validarUsuario(){
    if( this.loginForm.invalid ){ return }
    

      Swal.fire({
        title: 'Espere por favor',
        didOpen: () => {
          Swal.showLoading()
        },
      });

    
    // promesa
    const { email, password } = this.loginForm.value;

    this.authService.loginUsuario( email, password)
      .then( resp => {
        console.log( resp )
        Swal.close();
        this.router.navigateByUrl('/dashboard')
      })
      .catch( err => {
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

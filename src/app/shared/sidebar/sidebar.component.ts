import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from '../../services/auth.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
    `
      li{
        cursor:pointer;
      }
    `
  ]
})
export class SidebarComponent implements OnInit, OnDestroy {
  
  nombre!: string;
  userSubs!: Subscription;

  constructor(
    private authService: AuthService,
    private router:Router,
    private store:Store<AppState>
  ) { }


  ngOnInit(): void {

    this.userSubs =this.store.select( 'user' )
    .pipe(
      filter( user => user != null)
    )
    .subscribe(( ({user}) => this.nombre = user.nombre ))
  }

  ngOnDestroy(): void {
    
    this.userSubs.unsubscribe();

  }

  logout(){
    this.authService.logout()
      .then( resp =>  console.log( resp ))
      .catch( err => console.log( err ))
      this.router.navigateByUrl('/login')
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit, OnDestroy{
  
  nombre!: string;
  userSubs!: Subscription;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {

    this.store.select( 'user' )
    .subscribe(( ({user}) => this.nombre = user.nombre ))

  }

  ngOnDestroy(): void {
    
    this.userSubs.unsubscribe();
    
  }

}

import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
export class SidebarComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout()
      .then( resp =>  console.log( resp ))
      .catch( err => console.log( err ))
      this.router.navigateByUrl('/login')
  }

}

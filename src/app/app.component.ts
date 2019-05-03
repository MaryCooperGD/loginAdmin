import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'login-app';

  constructor(private router:Router){}

  logout(){
    localStorage.removeItem('access_token');
    this.router.navigate(['welcome']);
  }
}

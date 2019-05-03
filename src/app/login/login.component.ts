import { Component, OnInit } from '@angular/core';
import { Authentication } from '../authservice/authservice';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService:Authentication) { }

  private token:string;
  username:string;
  password:string;

  ngOnInit() {
  }

  login() : void {
    this.authService.login(this.username,this.password).subscribe((response:any) =>{
      console.log("Response " + response.token);
      this.token = response.token;
      localStorage.setItem('access_token', response.token);
      //this.router.navigate(['example', {token:this.token}]);
    });
   
  }

  getCLients(){
    this.authService.getClients().subscribe((response:any)=>{
      console.log("Response clients " + response);
    });
  }


}


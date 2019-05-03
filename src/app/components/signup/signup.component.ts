import { Component, OnInit } from '@angular/core';
import { Authentication } from '../../services/authservice/authservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  username: string;
  password: string;  
  role: string;
  name: string;
  constructor(private authService:Authentication, private router:Router) { }

  ngOnInit() {
  }


  signup() : void{
    this.authService.signup(this.username,this.password,this.role,this.name).subscribe((response:any) =>{
      this.router.navigate(['login']);
    });
  }

}

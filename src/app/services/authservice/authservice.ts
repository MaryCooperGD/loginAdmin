
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable} from '@angular/core';
import {Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent, throwError} from 'rxjs';
import {catchError} from "rxjs/internal/operators";

@Injectable({
    providedIn: 'root'
  })
export class Authentication{

constructor(private http: HttpClient){}

public httpOptions;

private roleArray= new Array<String>();


login(username:string, password:string){
    this.httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json'})
      };

   return this.http.post<any>('http://localhost:9090/helios-admin/api/auth/login',{
    "username": username,
    "password":password
}, this.httpOptions).pipe(catchError(this.loginErrorHandler));
}

signup(username:string, password: string, role:string, name:string){
    this.httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json'})
      };
   this.roleArray.push(role);

    return this.http.post<any>('http://localhost:9090/helios-admin/api/auth/signup',{
    "name": name,
	"username": username,
	"password": password,
	"role": this.roleArray
}, this.httpOptions).pipe(catchError(this.signupErrorHandler));
}

logout(){
    localStorage.removeItem('access_token');
}


/**
 * TODO
 * move this method in the right class
 */
getClients(){

    this.httpOptions = {
        headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('access_token')})
    };

    return this.http.get<any>('http://localhost:9090/helios-admin/api/dashboard/clients?page=0&size=30',this.httpOptions).pipe(catchError(this.signupErrorHandler));
    
}

loginErrorHandler(error: HttpErrorResponse){
    if(error.status == 401){
        return throwError(alert("Username o password errati"));
    } else if (error.status == 500){
        return throwError(alert("Errore del server " +error.message));
    }
    return throwError(alert("Errore: " +error.message));
}

signupErrorHandler(error: HttpErrorResponse){
    if(error.status == 500){
        return throwError(alert("Lo username inserito è già esistente"));
    }
    return throwError(alert("Errore: " +error.message));
}



}
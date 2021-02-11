import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHandlerService } from './jwt-handler.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private _baseUrl= "http://localhost:3000/api";


  constructor(private http:HttpClient, private _router: Router, private jwtHandler: JwtHandlerService) { }

  registerUser(user) {
    return this.http.post<any>(`${this._baseUrl}/register`, user)
  }

  loginUser(user){
    return this.http.post<any>(`${this._baseUrl}/login`, user);
  }
  loggedIn() {
    return this.jwtHandler.checkToken();
  }
  logoutUser(){
    this.jwtHandler.destroyToken();
    this._router.navigate(['auth/login'])
  }

  getEvents(){
    return this.http.get(`${this._baseUrl}/dogs`);
  }

  getUserInfo(){
    return this.jwtHandler.GetPayload();
  }

  getToken(){
    console.log(this.jwtHandler.getToken());
    return this.jwtHandler.getToken();
  }
}

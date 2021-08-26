import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from './models/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'https://localhost:5001/api/account/';
  currentUser: any;
  isAdmin = false;

  constructor(private http: HttpClient) { }

  login(model: LoginModel) {
    return this.http.post(this.baseUrl +'login', model);
  }

  setCurrentUser(model: any) {
    this.currentUser = model;
  }

  removeCurrentUser() {
    this.currentUser = null;
  }

  setAdmin(model: any) {
    console.log('Admin');
    let res = JSON.parse(model);
    this.isAdmin = res.isAdmin;
  }

  removeAdmin() {
    this.isAdmin = false;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private registerUrl = 'http://localhost:3000/api/register';
  private loginUrl = 'http://localhost:3000/api/login';
  private loginUrls = 'http://localhost:3000/api/logins';
  private loginUrlsa = 'http://localhost:3000/api/loginsa';
  private registerUrla = 'http://localhost:3000/api/registera';
  private registerUrlas = 'http://localhost:3000/api/registers';
  private registerUrlasa = 'http://localhost:3000/api/registersa';
  private loginUrla = 'http://localhost:3000/api/logina';
  private getlistAdminUrl = 'http://localhost:3000/api/list/admin';
  private deletepadminUrl = 'http://localhost:3000/api/list/admin';
  private getListUser = 'http://localhost:3000/api/list/user';
  private getByName = 'http://localhost:3000/api';
  private forgotPass = 'http://localhost:3000/api/list/user';




  constructor(private http: HttpClient, private router: Router) { }



  loginUser(user ) {
    return this.http.post<any>(this.loginUrl, user);
  }
  loginAdmin(user) {
    return this.http.post<any>(this.loginUrla, user);
  }

  registerUser(user) {
    return this.http.post<any>(this.registerUrl, user);
  }
  registerAdmin(user) {
    return this.http.post<any>(this.registerUrla, user);
  }
  getListuser() {
    return this.http.get<any>(this.getlistAdminUrl);
  }
  getListusers() {
    return this.http.get<any>(this.getListUser);
  }

  getToken() {
    return localStorage.getItem('token');
  }
  setLoggedina() {
    localStorage.setItem('isAdmin', 'true');

  }
   loggedIn() {
    return localStorage.getItem('token');
  }
  // tslint:disable-next-line:variable-name
  deletePark(_id: string) {
    return this.http.delete(this.deletepadminUrl + `/${_id}`);
  }
  getBynames(email: string) {
    return this.http.delete(this.getByName + `/${email}`);
  }
  forgotPassword(emp) {
    return this.http.put(this.forgotPass + `/${emp.email}`, emp);
  }
  loginSUP(user ) {
    return this.http.post<any>(this.loginUrls, user);
  }

  registerSup(user) {
    return this.http.post<any>(this.registerUrlas, user);
  }
  loginSUPA(user ) {
    return this.http.post<any>(this.loginUrlsa, user);
  }

  registerSupA(user) {
    return this.http.post<any>(this.registerUrlasa, user);
  }

}

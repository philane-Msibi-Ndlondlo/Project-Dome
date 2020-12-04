import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

export interface Response {
  status: string;
  message: string;
  token?: string;
  data?: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  URL = 'http://localhost:3000/api/projectDome';
  token = localStorage.getItem('auth-token') || '';

  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router) { }

  loginUser(user) {
    return this.http.post<Response>(`${this.URL}/users/login`, user);
  }

  get baseLink() {
    return this.URL;
  }

  setTokenAndData(response) {
    this.token = response.data.token;
    localStorage.setItem('user', JSON.stringify({
      id: response.data._id,
      firstname: response.data.firstname,
      lastname: response.data.lastname,
      email: response.data.email
    }));

    localStorage.setItem('auth-token', JSON.stringify(response.data.token));
  }

  get userToken() {
    return this.token || localStorage.getItem('auth-token');
  }

  get userData() {
    return JSON.parse(localStorage.getItem('user') || '');
  }

  logout() {
    this.token = '';
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}

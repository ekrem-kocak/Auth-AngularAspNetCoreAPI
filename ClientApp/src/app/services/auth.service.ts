import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserForLogin } from '../Model/UserForLogin.model';
import { tap } from "rxjs/operators";

import { JwtHelperService } from "@auth0/angular-jwt";
import { UserForRegister } from '../Model/UserForRegister.model';
import { Observable } from 'rxjs';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl = "http://localhost:5000/myapi/user/"

  decodedToken: any;

  constructor(private http: HttpClient) { }

  login(user: UserForLogin): Observable<any> {
    return this.http.post<any>(this.apiUrl + "login", user).pipe(
      tap((res: any) => {
        this.decodedToken = helper.decodeToken(res.token);
      })
    )
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');

    if (token) {
      var result = !helper.isTokenExpired(token);
      return result ? true : false;
    }
    return false;
  }

  register(user: UserForRegister) {
    return this.http.post(this.apiUrl + "register", user);
  }


}

import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

import { JwtHelperService } from "@auth0/angular-jwt";

const helper = new JwtHelperService();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ClientAppTekrar';

  private readonly token = localStorage.getItem('token');
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.decodedToken = helper.decodeToken(this.token!);
  }


}

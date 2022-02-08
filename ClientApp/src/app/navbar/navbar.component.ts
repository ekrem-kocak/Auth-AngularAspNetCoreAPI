import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserForLogin } from '../Model/UserForLogin.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
  })

  constructor(
    public authService: AuthService,
    private rotuer: Router
  ) { }

  ngOnInit(): void {
  }

  login() {
    var loginUser: UserForLogin = new UserForLogin(
      this.loginForm.get('username')?.value,
      this.loginForm.get('password')?.value,
    );

    this.authService.login(loginUser).subscribe((next: any) => {
      localStorage.setItem("token", next.token);
    }, (err: any) => {
      console.log(err);
    })
  }

  logout(): void {
    localStorage.removeItem('token');
    this.rotuer.navigate(["/"]);
  }

}

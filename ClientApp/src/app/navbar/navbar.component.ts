import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserForLogin } from '../Model/UserForLogin.model';
import { AlertifyService } from '../services/alertify.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  loading: boolean = false;

  loginForm: FormGroup = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
  })

  constructor(
    public authService: AuthService,
    private rotuer: Router,
    private alertifyService: AlertifyService
  ) { }

  ngOnInit(): void {
  }

  login() {
    this.authService.loading = true;
    var loginUser: UserForLogin = new UserForLogin(
      this.loginForm.get('username')?.value,
      this.loginForm.get('password')?.value,
    );

    this.authService.login(loginUser).subscribe((next: any) => {
      localStorage.setItem("token", next.token);
      this.alertifyService.success("Welcome " + this.authService.decodedToken.unique_name);
      this.authService.loading = false;
      this.closeNav();

      this.rotuer.navigate(["/products"]);
    }, (err: any) => {
      console.log(err);
      this.alertifyService.error(err.error.message);
      this.authService.loading = false;
    })
  }

  logout(): void {
    this.closeNav();

    localStorage.removeItem('token');
    this.rotuer.navigate(["/"]);
  }

  closeNav(): void {
    document.querySelector("#navbarSupportedContent")?.classList.remove("show");
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserForLogin } from '../Model/UserForLogin.model';
import { UserForRegister } from '../Model/UserForRegister.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  error: string[] = [];

  signUpForm: FormGroup = new FormGroup({
    name: new FormControl("", Validators.required),
    password: new FormControl("", [Validators.required]),
    userName: new FormControl("", Validators.required),
    email: new FormControl("", [Validators.required, Validators.email]),
    gender: new FormControl("male", Validators.required),
  })

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  signUp() {
    var newUser: UserForRegister = new UserForRegister(
      this.signUpForm.get('name')?.value,
      this.signUpForm.get('password')?.value,
      this.signUpForm.get('userName')?.value,
      this.signUpForm.get('email')?.value,
      this.signUpForm.get('gender')?.value,
    );

    this.authService.register(newUser).subscribe(() => {
      this.authService.login(new UserForLogin(
        this.signUpForm.get('userName')?.value,
        this.signUpForm.get('password')?.value,
      )).subscribe(next => {
        console.log(next);
        localStorage.setItem('token', next.token);
        this.router.navigate(["/products"]);
      })
    }, err => {
      console.log(err.error);
      this.error = err.error;
    })
  }

}

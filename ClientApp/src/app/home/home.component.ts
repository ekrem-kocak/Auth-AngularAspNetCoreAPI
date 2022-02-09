import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserForLogin } from '../Model/UserForLogin.model';
import { UserForRegister } from '../Model/UserForRegister.model';
import { AlertifyService } from '../services/alertify.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  error: any[] = [];

  signUpForm: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(5)]),
    password: new FormControl("", [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@_$!%*?&])[A-Za-z\d$@$!%*?&].{0,}')]),
    userName: new FormControl("", [Validators.required, Validators.pattern('^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$')]),
    email: new FormControl("", [Validators.required, Validators.email]),
    gender: new FormControl("male", Validators.required),
  })

  get name() { return this.signUpForm.get('name') };
  get password() { return this.signUpForm.get('password') };
  get userName() { return this.signUpForm.get('userName') };
  get email() { return this.signUpForm.get('email') };

  constructor(public authService: AuthService, private router: Router, private alertifyService: AlertifyService) { }

  ngOnInit(): void {
  }

  signUp() {
    this.authService.loading = true;
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
        this.alertifyService.success("Welcome " + this.authService.decodedToken.unique_name);
        this.authService.loading = false;
        this.router.navigate(["/products"]);
      })
    }, err => {
      this.authService.loading = false;
      console.log(err.error);
      this.error = err.error;
    })
  }

}

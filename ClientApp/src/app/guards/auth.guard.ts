import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertifyService } from '../services/alertify.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private alertifyService: AlertifyService) { }

  canActivate() {
    if (!this.authService.isLoggedIn()) {
      this.alertifyService.error("Please log in to see this field");
    }
    return this.authService.isLoggedIn();
  }

}

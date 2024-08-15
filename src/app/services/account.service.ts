import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { JwtService } from './jwt.service';







@Injectable({
  providedIn: 'root'
})
export class AccountService {


  constructor(
    private router: Router,
    private cookieService: CookieService,
    private jwtService: JwtService,

  ) { }


  isLoggedIn(): boolean {
    const token = this.cookieService.get('token');

    if (token) {
      if (this.jwtService.isTokenExpired(token)) {
        this.router.navigate(['/login']);
        alert('Your session has expired. Please log in again.');
        this.cookieService.delete('token');
        this.cookieService.delete('user');
        console.log('You are not logged in!');
        return false;
      }

      else
        return true;
    } else {

      this.router.navigate(['/login']);
      //console.log('You are not logged in!');

      return false;
    }
  }

}

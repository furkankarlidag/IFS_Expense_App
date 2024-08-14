import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,private cookieService : CookieService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
   
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('AuthGuard#canActivate called');
    
    const isAuthenticated = this.checkLogin();

    if (!isAuthenticated) {
      
      
      this.cookieService.delete('token');
      this.cookieService.delete('user');
      this.router.navigate(['/login']);
      alert('You are not authorized to access this page. Please login again.');
      return false;
    }
    return true;
  }

  

 


  public logout() {
    this.cookieService.delete('token');
    this.cookieService.delete('user');
 
    this.router.navigate(['/login']); // Redirect to the login page or other action
  }
  public checkLogin(): boolean {
   // api den gelen token kontrol edilecek
    let cor = false;
    const token = this.cookieService.get('token');
    const helper = new JwtHelperService();
    if (token) {
      cor = !helper.isTokenExpired(token);
      return cor;
    }
    else return false;
    
  }
}
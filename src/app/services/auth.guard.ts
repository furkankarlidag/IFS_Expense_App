import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
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
    this.checkSessionValidity();
    const isAuthenticated = this.checkLogin();

    if (!isAuthenticated) {
      
      
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

  checkSessionValidity() {
    const expiry = this.cookieService.get('expiry');
    if (expiry) {
      const expiryDate = new Date(expiry);
      const now = new Date();
      if (now > expiryDate) {
        this.logout(); // or any other method to handle the session expiration
      }
    } else {
      this.logout(); // No expiry cookie found, consider it expired
    }
  }
  logout() {
    this.cookieService.delete('token');
    this.cookieService.delete('user');
    this.cookieService.delete('expiry');
    this.router.navigate(['/login']); // Redirect to the login page or other action
  }
  private checkLogin(): boolean {
   // api den gelen token kontrol edilecek
    
    return !!this.cookieService.get('token');
  }
}
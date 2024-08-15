import { Component, Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, GuardResult, MaybeAsync } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { UnauthorizedDialog } from '../unauthorized-dialog/unauthorized-dialog.component';
import { JwtService } from './jwt.service';
import { AccountService } from './account.service';
AccountService



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private matDialog: MatDialog,
    private accountService: AccountService
  ) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    return this.accountService.isLoggedIn();
    
  }

  
  

  public logout() {
    this.cookieService.delete('token');
    this.cookieService.delete('user');
    
    this.router.navigateByUrl('/login');
  }

  
}



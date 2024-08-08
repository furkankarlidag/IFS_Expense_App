import { Component, inject } from '@angular/core';
import { NavbarStartComponent } from "../navbar-start/navbar-start.component";
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { get } from 'http';
import { Router } from '@angular/router';

import { userModel } from '../models/userModel';
import { CookieService } from 'ngx-cookie-service';





@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavbarStartComponent,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user = new userModel("","")

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
    
    
  ) { 
    navbar : NavbarStartComponent
  }
  ngOnInit() {
    if(this.cookieService.get('user')){
      this.router.navigate(['/expenses'] );
    }
  }
  onSubmit(form: NgForm) {
    console.log('Your form data:', form.value);
    if (form.invalid) {
      alert('Please enter both username and password.');
      return;
    }
    console.log('Your form data:', form.value);
    console.log('Your cookie data:', this.cookieService.get('user'));
    this.loginUser(form.value.password, form.value.username);
    
  }
  loginUser(password: string, username: string) {
    const apiUrl = 'https://localhost:7067/api/Account/Login';
    const url = `${apiUrl}?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
    //this.cookieService.set('user',username);

    this.http.get(url).subscribe({
      next: (res: any) => {
        if (res) {
          console.log(" login" + res);
          this.user.password = password;
          this.user.username = username;
          const now = new Date();
          console.log('now:', now);
          const expiry = new Date(now.getTime() + 1 * 60 * 60 * 1000); 
          
          this.cookieService.set('user', this.user.username, expiry, '/', undefined, true);
          this.cookieService.set('expiry', expiry.toUTCString(), expiry, '/', undefined, true);
          this.cookieService.set('token', res.token, expiry, '/', undefined, true);

          this.router.navigate(['/expenses'] );
        }
      },
      error: (err) => {
        console.error('HTTP request failed:', err);
        alert('Login failed. Please try again.');
      }
    });
  }
}

import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
import { AuthGuard } from '../services/auth.guard';





@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  @Input() name: string = '';
  username: any;

  constructor(private router: Router,private cookieService : CookieService,private AuthGuard:AuthGuard) {}

  signOut() {
    // Your sign out logic here
    console.log('Signing out...');
    // Example: Remove user data from localStorage and redirect to login page
    this.AuthGuard.logout();
  }

}


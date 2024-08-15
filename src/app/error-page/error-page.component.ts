// src/app/error-page/error-page.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarStartComponent } from '../navbar-start/navbar-start.component';


@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css'],
  standalone: true,
  imports: [NavbarStartComponent]
})
export class ErrorPageComponent implements OnInit {

  constructor(private router: Router,private navba : NavbarStartComponent) {}
  ngOnInit(): void {
    
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}

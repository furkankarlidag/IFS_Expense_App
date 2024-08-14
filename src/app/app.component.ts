import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { Title } from '@angular/platform-browser';
import { filter, map, mergeMap } from 'rxjs/operators';
import { ExpensesComponent } from './expenses/expenses.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { NavbarStartComponent } from './navbar-start/navbar-start.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { JwtHelperService, JWT_OPTIONS} from '@auth0/angular-jwt';
import { AuthGuard } from './services/auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavbarComponent,LoginComponent,ExpensesComponent,AddExpenseComponent,NavbarStartComponent,CommonModule,ReactiveFormsModule
    
  ],
  
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private reactivemodule: CommonModule,
    private authService : AuthGuard
  ) {}

  

  ngOnInit() {
    // setInterval(() => {
    //   if (this.authService.isTokenExpired()) {
    //     this.authService.logout();
    //   }
    // }, 5000);
   

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      mergeMap(route => route.data)
    ).subscribe(event => {
      this.titleService.setTitle(event['title'] || 'IFS Expense App');
    });
    
  }
  
}
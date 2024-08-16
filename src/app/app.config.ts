import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { NavbarStartComponent } from './navbar-start/navbar-start.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { provideHttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { AuthGuard } from './services/auth.guard';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ErrorPageComponent } from './error-page/error-page.component';
import { MatDialog } from '@angular/material/dialog';




export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(),provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(),NavbarComponent,
    LoginComponent,NavbarStartComponent,ExpensesComponent,AddExpenseComponent,CookieService,MatFormFieldModule,MatInputModule,MatSelectModule,MatDatepickerModule,
    MatNativeDateModule,MatButtonModule,ReactiveFormsModule,
    RouterModule,BrowserAnimationsModule,NgModule,BrowserModule,AuthGuard,ErrorPageComponent, provideAnimationsAsync(),MatDialog],
};

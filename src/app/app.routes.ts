import { Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import path from 'path';
import { LoginComponent } from './login/login.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { NavbarStartComponent } from './navbar-start/navbar-start.component';
import { AuthGuard } from './services/auth.guard';


export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full'},

    {path: 'login', component: LoginComponent, data: {title: 'IFS | Sign In'}},

    
    {path: 'expenses', component: ExpensesComponent, data: {title: 'IFS | Expenses'}, canActivate: [AuthGuard]},
    {path: 'add-expense', component: AddExpenseComponent, data: {title: 'IFS | Add Expense'},canActivate: [AuthGuard]},


];

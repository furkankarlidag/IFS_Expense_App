import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { AuthGuard } from './services/auth.guard';
import { ErrorPageComponent } from './error-page/error-page.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, data: { title: 'IFS | Sign In' } },
    { path: 'error', component: ErrorPageComponent, data: { title: 'IFS | Error' } },
    { path: 'expenses', component: ExpensesComponent, data: { title: 'IFS | Expenses' }, canActivate: [AuthGuard] },
    { path: 'add-expense', component: AddExpenseComponent, data: { title: 'IFS | Add Expense' }, canActivate: [AuthGuard] },
    { path: '**', component: ErrorPageComponent, data: { title: 'IFS | Error' } }  
];

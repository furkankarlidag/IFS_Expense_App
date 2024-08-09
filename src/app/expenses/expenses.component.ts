import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClient } from '@angular/common/http';
import { CommonModule,DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { userModel } from '../models/userModel';
import { Customer } from '../models/Customer';
import { expenseCodes } from '../models/expenseCodes';
import { CookieService } from 'ngx-cookie-service';
import { Console } from 'console';
import { concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthGuard } from '../services/auth.guard';
import { HttpHeaders } from '@angular/common/http';







@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [NavbarComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {
  user = new userModel("", "");
  name = '';
  username = '';
  expensesForm: FormGroup;
  expenses: any[] = [];
  customers: { customerId: string, name: string }[] = []; 
  expenseCodes: expenseCodes[] = []; 
  selectedSortColumn: string = ''; 
  sortColumns = [
    { label: 'Expense ID', value: 'ExpenseId' },
    { label: 'Person ID', value: 'PersonId' },
    { label: 'Customer ID', value: 'CustomerId' },
    { label: 'Customer Name', value: 'CustomerName' },
    { label: 'Expense Code', value: 'ExpenseCode' },
    { label: 'Expense Name', value: 'ExpenseName' },
    { label: 'Expense Date', value: 'ExpenseDate' },
    { label: 'Description', value: 'Description' },
    { label: 'Expense Type', value: 'ExpenseType' },
    { label: 'Document No', value: 'DocumentNo' },
    { label: 'Amount', value: 'Amount' },
    { label: 'Status', value: 'Status' }
  ];

  constructor(
    private cookieService: CookieService,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authGuard: AuthGuard,
    @Inject(DOCUMENT) document: Document
  ) {
    
    this.expensesForm = this.fb.group({
      period: [''],
      year: ['']
    });
  }

  ngOnInit() {
      
     //this.getUsernameFromToken(this.cookieService.get('token'));
      
      const currentYear = new Date().getFullYear();
      const currentMonth = (new Date().getMonth() + 1);
      this.getCustomers();
      this.getExpenseCodes();
      this.name = this.cookieService.get('user');
      this.expensesForm.patchValue({
        period: currentMonth,
   
        year: currentYear
      });
      console.log('currentMonth:', currentMonth);
      this.fetchExpenses(currentYear, currentMonth);
      
    }
    
    getUsernameFromToken(token: string) {
      let status : boolean ;
      const apiUrl = 'https://localhost:7067/api/Account/ConfirmToken';
      const url = `${apiUrl}?token=${encodeURIComponent(token)}`;
      console.log('URL:', url);
    
      this.http.get(url).subscribe({
        next: (res: any) => {
          console.log('Raw response:', res);
            status = res.status;
            if(status == true){
            this.name = res.username;
            this.username = res.username;
            }
            else{
              alert('You are not authorized to access this page. Please login again.');
              this.authGuard.logout();
              this.router.navigate(['/login']);
            }
          
        },
        error: (err) => {
          console.error('HTTP request failed:', err);
          alert('Failed to fetch username. Please try again.');
        }
      });
    }
    
    

    fetchExpenses(year: number, period: number) {
    
      const apiUrl = 'https://localhost:7067/api/Expenses';
      const url = `${apiUrl}?username=${encodeURIComponent(this.cookieService.get('user')!)}&year=${encodeURIComponent(year)}&period=${encodeURIComponent(period)}`;
      
      
      const token = this.cookieService.get('token');
      
      
      const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
      });
      
      
      this.http.get(url, { headers }).subscribe({
        next: (res: any) => {
          if (res && res.value) {
            console.log("Raw response:", res);
            this.expenses = res.value;
            console.log("Parsed expenses:", this.expenses);
          } else {
            console.warn('No data found in the response.');
            this.expenses = [];
          }
        },
        error: (err) => {
          console.error('HTTP request failed:', err);
          alert('Failed to fetch expenses. Please try again.');
        }
      });
  }

  getExpenseCodes() {
    const apiUrl = 'https://localhost:7067/api/ExpenseCodes';
    const url = `${apiUrl}`;
  
    const token = this.cookieService.get('token');
      
      
      const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
      });
    this.http.get(url,{headers}).subscribe({
      next: (res: any) => {
        console.log("Raw response:", res);
        if (res && res.value) {
          console.log("Response value:", res.value); // Log the value property
          this.expenseCodes = res.value.map((expenseCode: any) => {
            console.log("Expense code object:", expenseCode); // Log each expense code object
            return {
              Description: expenseCode.Description || expenseCode.description, // Adjust property names if needed
              ExpenseCode: expenseCode.ExpenseCode || expenseCode.code, // Adjust property names if needed
              luName: expenseCode.luName || expenseCode.name // Adjust property names if needed
            };
          });
          console.log("Parsed expense codes:", this.expenseCodes);
        } else {
          console.warn('No data found in the response.');
          this.expenseCodes = [];
        }
      },
      error: (err) => {
        console.error('HTTP request failed:', err);
        alert('Failed to fetch expense codes. Please try again.');
      }
    });
  }
  
  
  
  getCustomers() {
    const apiUrl = 'https://localhost:7067/api/Customers';
    const url = `${apiUrl}`;
  
    const token = this.cookieService.get('token');
      
      
      const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
      });

    this.http.get(url,{headers}).subscribe({
      next: (res: any) => {
        console.log("Raw response:", res);
        if (res && res.value) {
          console.log("Response value:", res.value); // Log the value property
          this.customers = res.value.map((customer: any) => {
            console.log("Customer object:", customer); // Log each customer object
            return {
              customerId: customer.customerId || customer.CustomerId, // Adjust property names as needed
              name: customer.name || customer.Name // Adjust property names as needed
            };
          });
          console.log("Parsed customers:", this.customers);
        } else {
          console.warn('No data found in the response.');
          this.customers = [];
        }
      },
      error: (err) => {
        console.error('HTTP request failed:', err);
        alert('Failed to fetch customers. Please try again.');
      }
    });

  }
  sortTable() {
    if (!this.selectedSortColumn) return;

    const columnIndex = this.sortColumns.findIndex(col => col.value === this.selectedSortColumn);
    if (columnIndex === -1) return;

    const isNumeric = !isNaN(this.expenses[0][this.selectedSortColumn]);
    
    this.expenses.sort((a, b) => {
      const cellA = a[this.selectedSortColumn];
      const cellB = b[this.selectedSortColumn];

      if (isNumeric) {
        return cellA - cellB;
      } else {
        return cellA.localeCompare(cellB);
      }
    });
  }
  searchExpenseCode(code: string): string {
    const expenseCode = this.expenseCodes.find(ec => ec.ExpenseCode === code);
    return expenseCode ? expenseCode.Description : 'Unknown Expense Code';
  }
  searchCustomer(id: string): string {
    const customer = this.customers.find(c => c.customerId === id);
    return customer ? customer.name : 'Unknown Customer';
  }
    

  onSubmit() {
    const { year, period } = this.expensesForm.value;
    this.fetchExpenses(year, period);
  }
}

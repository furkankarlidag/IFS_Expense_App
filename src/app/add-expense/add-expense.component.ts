import { Component, ElementRef, Renderer2, ViewChild, OnInit} from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { CommonModule,DOCUMENT } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { expenseCodes } from '../models/expenseCodes';
import { CookieService } from 'ngx-cookie-service';
import { get } from 'http';






@Component({
  selector: 'app-add-expense',
  standalone: true,
  imports: [NavbarComponent, CommonModule,ReactiveFormsModule],
  templateUrl: './add-expense.component.html',
  styleUrl: './add-expense.component.css'
})
export class AddExpenseComponent {
  AddExpenseForm: FormGroup;
  title = 'IFS | Add Expense';
  name = '';
  username = '';
  customers: { customerId: string, name: string }[] = []; 
  expenseCodes: expenseCodes[] = []; 
  
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.AddExpenseForm = this.fb.group({
      customerId: ['', Validators.required],
      expenseCode: ['', Validators.required],
      amount: ['', Validators.required],
      date: ['', Validators.required],
      expenseType: ['', Validators.required],
      documentNo: ['',],
      description: ['',]
    });
    }
  
  ngOnInit(): void {
    
      this.name = '' ;
      
   
    this.getCustomers();
    this.getExpenseCodes();
    this.username = this.cookieService.get('user');
    this.name = this.cookieService.get('user');
    //this.getUsernameFromToken(this.cookieService.get('token'));
    
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
            this.cookieService.delete('token');
            this.cookieService.delete('user');
            this.cookieService.delete('expiry');
            //this.router.navigate(['/login']);
            window.location.reload();
            
          }
        
      },
      error: (err) => {
        console.error('HTTP request failed:', err);
        alert('Failed to fetch username. Please try again.');
      }
    });
  }
  onSubmit(): void {
    if (this.AddExpenseForm.valid) {
      if(this.AddExpenseForm.get('description')?.value.length > 195){
        alert('Description should not exceed 200 characters.');
        return;
      }

      const apiUrl = 'https://localhost:7067/api/AddExpense';
      const url = `${apiUrl}`;


      const token = this.cookieService.get('token');
      
      
      const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
      });

      const body = {
        personId: this.cookieService.get('user'),
        customerId: this.AddExpenseForm.value.customerId,
        expenseCode: this.AddExpenseForm.value.expenseCode,
        amount: this.AddExpenseForm.value.amount,
        expenseDate: this.AddExpenseForm.value.date,
        expenseTypeDb: this.AddExpenseForm.value.expenseType,
        documentNo: this.AddExpenseForm.value.documentNo,
        description: this.AddExpenseForm.value.description
      };
      
     
      this.http.post(url, body,{headers}).subscribe({
        next: (res: any) => {
          console.log('Response:', res);
          alert('Expense added successfully.');
          //this.router.navigate(['/expenses']);
          this.AddExpenseForm.reset();
        },
        error: (err) => {
          console.error('HTTP request failed:', err);
          alert('Failed to add expense. Please try again.');
        }
      });
    }
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
  
  
  


}


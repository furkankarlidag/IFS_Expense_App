import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  
  private base64UrlDecode(str: string): string {
    
    const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    
    return atob(base64);
  }

  
  public getTokenExpirationDate(token: string): Date | null {
    if (!token) return null;

    
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('JWT token geçersiz.');
    }

    
    const payload = this.base64UrlDecode(parts[1]);
    const decoded = JSON.parse(payload);

    
    if (decoded.exp === undefined) {
      return null;
    }

    
    return new Date(decoded.exp * 1000)!;
  }

 
  public isTokenExpired(token: string): boolean {
    const expirationDate = this.getTokenExpirationDate(token);
    console.log('expirationDate:', expirationDate);
    if (!expirationDate) return true;
    return new Date() > expirationDate;
  }
}

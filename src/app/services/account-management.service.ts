import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const API_URL = environment.API_URL;
const TOKEN_KEY = 'auth_token';

@Injectable({
  providedIn: 'root'
})
export class AccountManagementService {

  tokenKey = localStorage.getItem(TOKEN_KEY);

  constructor(private http: HttpClient) { }

  getAccountDetails(accountNumber: string) {
    return this.http.get<any>(`${API_URL}accounts/${accountNumber}.json?auth=${this.tokenKey}`);
  }

  setAccountBalance(accountNumber: string, accountInfo: Account) {
    return this.http.put<any>(`${API_URL}accounts/${accountNumber}.json?auth=${this.tokenKey}`, accountInfo);
  }

}

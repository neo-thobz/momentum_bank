import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const API_URL = environment.API_URL;
const TOKEN_KEY = 'auth_token';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class AccountManagementService {

  tokenKey = localStorage.getItem(TOKEN_KEY);

  constructor(private http: HttpClient) { }

  getAccountDetails(accountNumber: string) {
    return this.http.get<any>(`${API_URL}accounts/${accountNumber}.json?auth=${this.tokenKey}`);
  }

  setAccountBalance(accountNumber: string, accountInfo: any) {
    return this.http.put<any>(`${API_URL}accounts/${accountNumber}.json?auth=${this.tokenKey}`, accountInfo, httpOptions);
  }

  createNewAccount() {
    console.log('hello world');

    // generate number

    // get list of accounts and format

    // put it up online
  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const API_URL = environment.API_URL;
const TOKEN_KEY = 'auth_token';
const LOCAL_KEY = 'local_id';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class AccountManagementService {

  localKey = sessionStorage.getItem(LOCAL_KEY);
  tokenKey = sessionStorage.getItem(TOKEN_KEY);

  constructor(private http: HttpClient) { }

  getAccountDetails(accountNumber: string) {
    return this.http.get<any>(`${API_URL}accounts/${accountNumber}.json?auth=${this.tokenKey}`);
  }

  setAccountBalance(accountNumber: string, accountInfo: any) {
    return this.http.put<any>(`${API_URL}accounts/${accountNumber}.json?auth=${this.tokenKey}`, accountInfo, httpOptions);
  }

  createNewAccount(accounts: any[], hasOverdraft: boolean) {
    // generate number
    const accountNum = 9876654321;
    let newAccount: any;

    accounts.push(accountNum);
    console.log(accounts);

    if (hasOverdraft) {
      newAccount = {balance: 0, overdraft : 0};
    } else {
      newAccount = {accountNumber: accountNum , balance: 0 };
    }

    this.http.put<any>(`${API_URL}accounts/${accountNum}.json?auth=${this.tokenKey}`, newAccount, httpOptions);

    return this.http.put<any>(`${API_URL}clients/${this.localKey}/accounts.json?auth=${this.tokenKey}`, accounts);
  }

}

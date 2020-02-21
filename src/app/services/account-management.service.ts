import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AlertController } from '@ionic/angular';

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

  constructor(private http: HttpClient, public alertController: AlertController) { }

  getAccountDetails(accountNumber: string) {
    return this.http.get<any>(`${API_URL}/accounts/${accountNumber}.json?auth=${this.tokenKey}`);
  }

  setAccountBalance(accountNumber: string, accountInfo: any) {
    return this.http.put<any>(`${API_URL}/accounts/${accountNumber}.json?auth=${this.tokenKey}`, accountInfo, httpOptions);
  }

  getRandom(length: number): number {
    return Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1));
  }

  async successAlert(msg: string) {
    const alert = await this.alertController.create({
      header: 'Success!',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  createNewAccount(accounts: any[], hasOverdraft: boolean) {

    const accountNum = this.getRandom(10);
    let newAccount: any;

    accounts.push(accountNum);

    if (hasOverdraft) {
      newAccount = {balance: 0, overdraft : 0};
    } else {
      newAccount = {accountNumber: accountNum , balance: 0 };
    }

    this.http.put<any>(`${API_URL}/accounts/${accountNum}.json?auth=${this.tokenKey}`, newAccount).subscribe(res => {
      this.successAlert(`New account ${accountNum} has been created.`);
    }, err => {
      console.log('err: ', err.error);
    });

    return this.http.put<any>(`${API_URL}/clients/${this.localKey}/accounts.json?auth=${this.tokenKey}`, accounts);
  }

}

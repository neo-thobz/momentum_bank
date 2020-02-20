import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const API_URL = environment.API_URL;
const TOKEN_KEY = 'auth_token';
const LOCAL_KEY = 'local_id';

@Injectable({
  providedIn: 'root'
})

export class UserDataService {

  localKey = sessionStorage.getItem(LOCAL_KEY);
  tokenKey = sessionStorage.getItem(TOKEN_KEY);

  constructor(private http: HttpClient) { }

  getClientDetails() {
   return this.http.get<any>(`${API_URL}clients/${this.localKey}.json?auth=${this.tokenKey}`);
  }

}

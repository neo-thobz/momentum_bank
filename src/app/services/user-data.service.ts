import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const API_URL = environment.USERS_URL;
const TOKEN_KEY = 'auth_token';
const LOCAL_KEY = 'local_id';

@Injectable({
  providedIn: 'root'
})

export class UserDataService {

  constructor(private http: HttpClient) { }

  getClientDetails() {
   return this.http.get(`${API_URL}${localStorage.getItem(LOCAL_KEY)}.json?auth=${localStorage.getItem(TOKEN_KEY)}`);
  }

}

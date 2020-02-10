import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL = environment.USERS_URL;
const TOKEN_KEY = 'auth-token';
const LOCAL_KEY = 'local-id';

@Injectable({
  providedIn: 'root'
})

export class UserDataService {

  userDetails = null;

  constructor(private http: HttpClient, private storage: Storage) { }

  searchData() {}

  getClientDetails() {
    return this.http.get(`${API_URL}${LOCAL_KEY}.json?auth=${this.storage.get(TOKEN_KEY)}`);
  }

}

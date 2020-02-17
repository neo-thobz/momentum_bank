import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

const TOKEN_KEY = 'auth_token';
const LOCAL_ID = 'local_id';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  authenticationState = new BehaviorSubject(false);

  constructor(public http: HttpClient, private plat: Platform) {
    this.plat.ready().then(() => {
      this.checkToken();
    });
  }

  login(email: string, password: string) {
    const userData = { email, password, returnSecureToken : true };
    return this.http.post<any>(environment.LOGIN_URL, userData, httpOptions).subscribe( data => {
      localStorage.setItem(TOKEN_KEY, data.idToken);
      localStorage.setItem(LOCAL_ID, data.localId);
      this.authenticationState.next(true);
    }, error => {
      console.log('error: ', error.error);
    });
  }

  logOut() {
    localStorage.clear();
    this.authenticationState.next(false);
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

  checkToken() {
    if (localStorage.getItem(TOKEN_KEY)) {
      this.authenticationState.next(true);
    }
  }
}

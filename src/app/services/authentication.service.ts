import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
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

  constructor(public http: HttpClient, private plat: Platform, public toastController: ToastController) {
    this.plat.ready().then(() => {
      this.checkToken();
    });
  }

  login(email: string, password: string) {
    const userData = { email, password, returnSecureToken : true };
    return this.http.post<any>(environment.LOGIN_URL, userData, httpOptions).subscribe( data => {
      sessionStorage.setItem(TOKEN_KEY, data.idToken);
      sessionStorage.setItem(LOCAL_ID, data.localId);
      this.authenticationState.next(true);
    }, error => {
      this.presentToast();
    });
  }

  logOut() {
    sessionStorage.clear();
    this.authenticationState.next(false);
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

  checkToken() {
    if (sessionStorage.getItem(TOKEN_KEY)) {
      this.authenticationState.next(true);
    }
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Login failed',
      duration: 5000
    });
    toast.present();
  }
}

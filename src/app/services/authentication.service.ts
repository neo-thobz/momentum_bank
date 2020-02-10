import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

authenticationState = new BehaviorSubject(false);

  constructor(public aFauth: AngularFireAuth, private storage: Storage, private plat: Platform) {
    this.plat.ready().then(() => {
      this.checkToken();
    });
  }

    async login(email: string, password: string) {

    try {
        const res = await this.aFauth.auth.signInWithEmailAndPassword(email, password);
        console.log(res);

        this.aFauth.auth.currentUser.getIdToken(true).then((token) => this.storage.set(TOKEN_KEY, token));

        console.log(this.aFauth.auth.currentUser.uid);

        this.authenticationState.next(true);

      } catch (err) {
        console.dir(err);
        return this.authenticationState.next(false);
      }
  }

  async logOut() {
    this.authenticationState.next(false);
    await this.storage.remove(TOKEN_KEY);
    this.aFauth.auth.signOut();
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

  async checkToken() {
    const res = await this.storage.get(TOKEN_KEY);
    if (res) {
      this.authenticationState.next(true);
    }
  }

}

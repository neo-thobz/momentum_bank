import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';

const TOKEN_KEY = 'auth-token';
const LOCAL_KEY = 'local-id';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  authenticationState = new BehaviorSubject(false);

  constructor(public fbAuth: AngularFireAuth, private storage: Storage, private plat: Platform) {
    this.plat.ready().then(() => {
      this.checkToken();
    });
  }

  async login(email: string, password: string) {

    try {
      const res = await this.fbAuth.auth.signInWithEmailAndPassword(email, password);

      this.fbAuth.auth.currentUser.getIdToken(true).then((token) => this.storage.set(TOKEN_KEY, token));

      console.log(this.fbAuth.auth.currentUser.uid);

      this.authenticationState.next(true);

    } catch (err) {
      console.dir(err);
      return this.authenticationState.next(false);
    }
  }

  async logOut() {
    this.authenticationState.next(false);
    await this.storage.remove(TOKEN_KEY);
    this.fbAuth.auth.signOut();
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

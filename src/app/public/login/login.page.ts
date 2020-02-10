import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email = '';
  password = '';

  constructor(private authService: AuthenticationService, public alertController: AlertController) { }

  ngOnInit() {
  }

   userLogin() {
    const {email, password} = this;

    if (email !== '' && password !== '') {
      this.authService.login(email, password);
    } else {
      this.emptyFieldAlert();
    }
  }

  async emptyFieldAlert() {
    const alert = await this.alertController.create({
      header: 'Hello',
      message: 'Please enter an email and password.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async loginFailedAlert() {
    const alert = await this.alertController.create({
      header: 'Sorry',
      message: 'You have entered invalid credentials.',
      buttons: ['OK']
    });

    await alert.present();
  }

}

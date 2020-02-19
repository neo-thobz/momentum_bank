import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  email: string;
  password: string;

  constructor(private authService: AuthenticationService, public alertController: AlertController) { }

  ngOnInit() {
    this.email = '';
    this.password = '';
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
}

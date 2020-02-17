import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  userData: any;
  loading: any;

  constructor(private authService: AuthenticationService, private userService: UserDataService,
              private loadingController: LoadingController) { }

  ngOnInit() { }

  async ionViewWillEnter() {
    await this.presentLoading();
    this.userService.getClientDetails().pipe(
      finalize(async () => {
          await this.loading.dismiss();
      })).subscribe(res => {
        if (res.accounts.hasOwnProperty('name')) {
          this.userData = res.accounts;
        } else {
          this.userData = res;
        }
    }, err => {
      console.log('err: ', err.error);
    });
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
        message: 'loading...'
    });
    await this.loading.present();
  }

  logOut() {
    this.authService.logOut();
  }

}

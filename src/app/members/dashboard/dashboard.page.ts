import { Component, OnInit } from '@angular/core';
import { AccountManagementService } from 'src/app/services/account-management.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})

export class DashboardPage implements OnInit {

  userData: any;

  constructor(private authService: AuthenticationService, private userService: UserDataService,
              private accountService: AccountManagementService) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.userService.getClientDetails().subscribe(res => {
        if (res.accounts.hasOwnProperty('name')) {
          this.userData = res.accounts;
        } else {
          this.userData = res;
        }
    }, err => {
      console.log('err: ', err.error);
    });
  }

  openNewAccount() {
    console.log('going to add account here...');
    this.accountService.createNewAccount();
  }

  logOut() {
    this.authService.logOut();
  }

}

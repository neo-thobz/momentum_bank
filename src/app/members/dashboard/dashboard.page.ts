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
  accountList = [];
  hasOverdraft = false;

  constructor(private authService: AuthenticationService, private userService: UserDataService,
              private accountService: AccountManagementService) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.userService.getClientDetails().subscribe(res => {
        if (res.accounts.hasOwnProperty('name')) {
          this.userData = res.accounts;
          this.accountList = res.accounts.accounts;
        } else {
          this.userData = res;
          this.hasOverdraft = true;
          this.accountList = res.accounts;
        }
    }, err => {
      console.log('err: ', err.error);
    });
  }

  openNewAccount() {
    this.accountService.createNewAccount(this.accountList, this.hasOverdraft).subscribe(res => {
      // still testing
      console.log(res);
    });
  }

  logOut() {
    this.authService.logOut();
  }

}

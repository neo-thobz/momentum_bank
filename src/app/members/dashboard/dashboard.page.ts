import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  userData: any;

  constructor(private authService: AuthenticationService, private userService: UserDataService) { }

  ngOnInit() {
    // this.userService.getClientDetails();
    this.userService.getClientDetails().subscribe(res => {
      console.log('Client Details: ', res);
      this.userData = res;
    });
  }

  logOut() {
    this.authService.logOut();
  }

}

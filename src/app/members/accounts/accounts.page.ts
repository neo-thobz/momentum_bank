import { Component, OnInit } from '@angular/core';
import { AccountManagementService } from 'src/app/services/account-management.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.page.html',
  styleUrls: ['./accounts.page.scss'],
})

export class AccountsPage implements OnInit {

  account = null;

  constructor(private activatedRoute: ActivatedRoute, private accountService: AccountManagementService) { }

  ngOnInit() {}

  ionViewWillEnter() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('id: ', id);
    this.accountService.getAccountDetails(id).subscribe(res => {
      console.log('details: ',  res);
      this.account = res; });
  }

}

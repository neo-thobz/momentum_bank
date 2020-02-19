import { Component, OnInit } from '@angular/core';
import { AccountManagementService } from 'src/app/services/account-management.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.page.html',
  styleUrls: ['./accounts.page.scss'],
})

export class AccountsPage implements OnInit {

  account: any;
  accountNumber = '';
  bankBalance = 0;
  depositAmount = 0;
  withdrawalAmount = 0;
  theDeterminate = 0;
  hasOverDraft = false;

  constructor(private activatedRoute: ActivatedRoute, private accountService: AccountManagementService) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.accountNumber = this.activatedRoute.snapshot.paramMap.get('id');

    this.accountService.getAccountDetails(this.accountNumber).subscribe(res => {
      if (res.hasOwnProperty('overdraft')) {
        this.hasOverDraft = true;
      }

      this.account = res;
    });
  }

  depositCash() {
    // set up the data
    if (this.hasOverDraft) {
      // need to do the logic of adding here
      const data = {balance: '', overdraft: ''};
      this.performTransaction(data);
    } else {
      const data = {accountNumber: this.accountNumber, balance: ''};
      this.performTransaction(data);
      console.log('done... depositing');
    }
  }

  withdrawCash() {
    if (this.hasOverDraft) {
      const data = {balance: '', overdraft: ''};
      this.performTransaction(data);
    } else {
      const data = {accountNumber: this.accountNumber, balance: ''};
      this.performTransaction(data);
    }
  }

  performTransaction(data: any) {
    this.accountService.setAccountBalance(this.accountNumber, data).subscribe(res => {
      console.log(res);
    });
  }

}

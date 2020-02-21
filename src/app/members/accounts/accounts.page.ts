import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AccountManagementService } from 'src/app/services/account-management.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.page.html',
  styleUrls: ['./accounts.page.scss'],
})

export class AccountsPage implements OnInit {

  account: any;
  accountNumber = '';
  depositAmount = 0;
  withdrawalAmount = 0;
  theDeterminate = 0;
  hasOverDraft = false;
  depositOverDraft = false;
  withdrawFromOverDraft = false;
  insufficientFundsMsg = 'You do not have enough funds for that withdrawal';

  constructor(private activatedRoute: ActivatedRoute, private accountService: AccountManagementService,
              public toastController: ToastController) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.accountNumber = this.activatedRoute.snapshot.paramMap.get('id');

    this.accountService.getAccountDetails(this.accountNumber).subscribe(res => {
      if (res !== null) {
        if (res.hasOwnProperty('overdraft')) {
          this.hasOverDraft = true;
        }
        this.account = res;
      } else {
        // go back
        this.presentToast('Unable to load account data');
      }
    });
  }

  depositCash() {
    if (this.hasOverDraft) {
      this.overdraftDeposit();
    } else {
      this.theDeterminate = this.account.balance + this.depositAmount;
      const data = {accountNumber: this.accountNumber, balance: this.theDeterminate};
      this.performTransaction(data);
    }
  }

  overdraftDeposit() {
    if (this.depositOverDraft) {
      this.theDeterminate = this.account.overdraft + this.depositAmount;
      const data = {balance: this.account.balance, overdraft: this.theDeterminate};
      this.performTransaction(data);
    } else {
      this.theDeterminate = this.account.balance + this.depositAmount;
      const data = {balance: this.theDeterminate, overdraft: this.account.overdraft};
      this.performTransaction(data);
    }
  }

  withdrawCash() {
    if (this.hasOverDraft) {
      this.overdraftWithdrawal();
    } else {
      this.theDeterminate = this.account.balance - this.withdrawalAmount;

      if (this.theDeterminate > 0) {
        const data = {accountNumber: this.accountNumber, balance: this.theDeterminate};
        this.performTransaction(data);
      } else {
        this.presentToast(this.insufficientFundsMsg);
      }
    }
  }

  overdraftWithdrawal() {
    if (this.withdrawFromOverDraft) {
      this.theDeterminate = this.account.overdraft - this.depositAmount;

      if (this.theDeterminate > 0) {
        const data = {balance: this.account.balance, overdraft: this.theDeterminate};
        this.performTransaction(data);
      } else {
        this.presentToast(this.insufficientFundsMsg);
      }
    } else {
      this.theDeterminate = this.account.balance - this.depositAmount;

      if (this.theDeterminate > 0) {
        const data = {balance: this.theDeterminate, overdraft: this.account.overdraft};
        this.performTransaction(data);
      } else {
        this.presentToast(this.insufficientFundsMsg);
      }
    }
  }

  performTransaction(data: any) {
    this.accountService.setAccountBalance(this.accountNumber, data).subscribe(res => {
      this.account = res;
      this.presentToast('Transaction was successful');
    },
    err => {
      this.presentToast('There was an error with your request, please try again later');
      console.log(err.error);
    });
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }
}

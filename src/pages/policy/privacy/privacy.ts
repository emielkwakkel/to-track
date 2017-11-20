import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-policy-privacy',
  templateUrl: './privacy.html'
})
export class PolicyPrivacyPage {
  constructor(public viewCtrl: ViewController) {}

  public dismiss() {
    this.viewCtrl.dismiss();
  }
}

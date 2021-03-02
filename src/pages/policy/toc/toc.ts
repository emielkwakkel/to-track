import { Component } from '@angular/core';
import { IonicPage, ViewController } from '@ionic/angular';

@IonicPage()
@Component({
  selector: 'page-policy-toc',
  templateUrl: './toc.html'
})
export class PolicyTOCPage {
  constructor(public viewCtrl: ViewController) {}

  public dismiss() {
    this.viewCtrl.dismiss();
  }
}

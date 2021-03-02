import { Component } from "@angular/core";
import { IonicPage, NavController } from "@ionic/angular";
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

import { AuthenticationService } from '../../../shared/user/authentication.service';

@IonicPage({
    priority: 'high'
})
@Component({
    selector: 'page-overview',
    templateUrl: 'overview.html'
})
export class OverviewPage {
    user: Observable<firebase.User>;
    constructor(
      public navCtrl: NavController,
      private authenticationService: AuthenticationService) {
    }

    createAccount() {
        this.navCtrl.push('CreatePage');
    }

    loginEmail() {
        this.navCtrl.push('LoginPage');
    }

    loginGoogle() {
        this.authenticationService.loginGoogle();
    }
}

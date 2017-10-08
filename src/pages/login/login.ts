import { Component } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

import { AuthenticationService } from '../../shared/user/authentication.service';

@IonicPage({
    priority: 'high'
})
@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {
    user: Observable<firebase.User>;
    constructor(
      public navCtrl: NavController,
      private authenticationService: AuthenticationService) {
    }

    loginGoogle() {
        this.authenticationService.loginGoogle();
    }

    logout() {
        this.authenticationService.logout();
    }
}

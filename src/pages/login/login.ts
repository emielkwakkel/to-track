import { Component } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";
// import { AngularFireAuth } from 'angularfire2/auth';
// import { Router } from '@angular/router';
// import { moveIn } from '../router.animations';

import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

import { AuthenticationService } from '../../user/authentication.service';

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
        console.log('login with Google');
        this.authenticationService.loginGoogle();
    }

    logout() {
        this.authenticationService.logout();
    }
}

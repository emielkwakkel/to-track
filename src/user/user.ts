import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import * as firebase from 'firebase/app';

import { AuthenticationService } from '../shared/user/authentication.service';
import { UserService } from '../shared/user/user.service';

@IonicPage()
@Component({
    selector: 'page-user',
    templateUrl: './user.html'
})
export class UserPage implements OnInit {
    user: firebase.User;

    constructor(
        public navCtrl: NavController,
        private authenticationService: AuthenticationService,
        private userService: UserService) {
    }

    ngOnInit() {
      this.user = this.userService.user;
    }

    public logout() {
        this.authenticationService.logout();
    }
}

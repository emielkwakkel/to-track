import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { AuthenticationService } from '../shared/user/authentication.service';
import { UserService } from '../shared/user/user.service';
import { User } from '../shared/user/user.model';

@IonicPage()
@Component({
    selector: 'page-user',
    templateUrl: './user.html'
})
export class UserPage implements OnInit {
    user: User;
    driver: string = null;

    constructor(
        public navCtrl: NavController,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private storage: Storage) {
    }

    ngOnInit() {
      this.user = this.userService.user;
      this.driver = this.storage.driver;
    }

    public logout() {
        this.authenticationService.logout();
    }
}

import { AuthenticationService } from "./authentication.service";
import { Component, OnInit } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";
import { UserService } from './user.service';
import * as firebase from 'firebase/app';

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

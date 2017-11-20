import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AppVersion } from '@ionic-native/app-version';
import { Platform } from 'ionic-angular';

import { AuthenticationService } from '../../shared/user/authentication.service';
import { UserService } from '../../shared/user/user.service';
import { User } from '../../shared/user/user.model';
import { PolicyPrivacyPage } from '../policy/privacy/privacy';

@IonicPage()
@Component({
    selector: 'page-user',
    templateUrl: './user.html'
})
export class UserPage implements OnInit {
    user: User;
    driver: string = null;
    isMobileWeb: boolean;
    isIOS: boolean;
    isAndroid: boolean;
    isCordova: boolean;
    appName: string;
    appVersionNumber: string;

    constructor(
        public appVersion: AppVersion,
        public navCtrl: NavController,
        public modalCtrl: ModalController,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private storage: Storage,
        private platform: Platform) {
    }

    ngOnInit() {
      this.user = this.userService.user;
      this.driver = this.storage.driver;
      this.isMobileWeb = this.platform.is('mobileweb');
      this.isCordova = this.platform.is('cordova');
      this.isIOS = this.platform.is('ios');
      this.isAndroid = this.platform.is('android');

      // Getting version number is only supported on native iOS and Android.
      if (this.isCordova && !this.isMobileWeb && (this.isIOS || this.isAndroid)) {
        this.appVersion
          .getVersionNumber()
          .then(version => this.appVersionNumber = version);
        this.appVersion
          .getAppName()
          .then(name => this.appName = name);
      }
    }


    public gotoPrivacyPolicy() {
      return this.modalCtrl
        .create(PolicyPrivacyPage)
        .present();
    }
    public logout() {
        this.authenticationService.logout();
    }
}

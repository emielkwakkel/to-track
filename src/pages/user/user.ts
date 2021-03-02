import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, ModalController } from '@ionic/angular';
import { AppVersion } from '@ionic-native/app-version';
import { Platform } from '@ionic/angular';
import * as firebase from 'firebase/app';

import { AuthenticationService } from '../../shared/user/authentication.service';
import { UserService } from '../../shared/user/user.service';
import { User } from '../../shared/user/user.model';
import { PolicyPrivacyPage } from '../policy/privacy/privacy';
import { PolicyTOCPage } from '../policy/toc/toc';

@IonicPage()
@Component({
    selector: 'page-user',
    templateUrl: './user.html'
})
export class UserPage implements OnInit {
    user: User;
    isMobileWeb: boolean;
    isIOS: boolean;
    isAndroid: boolean;
    isCordova: boolean;
    appName: string;
    appVersionNumber: string;
    providerIcon: string;

    constructor(
        public appVersion: AppVersion,
        public navCtrl: NavController,
        public modalCtrl: ModalController,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private platform: Platform) {
    }

    ngOnInit() {
      this.user = this.userService.user;
      this.providerIcon = this.getProviderIcon(this.user.providerId);
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

    private getProviderIcon(providerId) {
      switch (providerId) {
        case 'password': return 'mail'
        case 'facebook': return 'logo-facebook'
        case 'github': return 'logo-github'
        case 'google.com': return 'logo-google'
      }
    }

    public deleteUser() {
      console.log(firebase.auth().currentUser);
      firebase.auth()
        .currentUser
        .delete()
        .then(() => {
          console.log('success');
        })
        .catch(function(error) {
          console.log('error', error);
        });
    }

    public gotoPolicyPrivacy() {
      return this.modalCtrl
        .create(PolicyPrivacyPage)
        .present();
    }

    public gotoPolicyTOC() {
      return this.modalCtrl
        .create(PolicyTOCPage)
        .present();
    }

    public logout() {
        this.authenticationService.logout();
    }
}

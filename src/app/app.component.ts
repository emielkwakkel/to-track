import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AuthenticationService } from '../shared/user/authentication.service';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild('myNav') nav : NavController;
    rootPage: any = 'LoginPage';
    public user: firebase.User;
    public loading: any;

    constructor(
      platform: Platform,
      public statusBar: StatusBar,
      public splashScreen: SplashScreen,
      private afAuth: AngularFireAuth,
      private authenticationService: AuthenticationService,
      public loadingCtrl: LoadingController) {
        this.loading = loadingCtrl.create({
          content: 'Logging in...'
        });
        platform
          .ready()
          .then(() => this.onPlatformReady());
    }

    onPlatformReady() {
      this.loading.present();
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native  things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.authenticationService.getRedirectResult();

      this.afAuth.authState
        .subscribe((user: firebase.User) => this.onUserChange(user));
    }

    onUserChange(user: firebase.User) {
      this.loading.dismiss();

      if (user) {
        // Remove the login page from the nav stack.
        // Now the tabs page is the root of the application.
        this.nav.setRoot('TabsPage');

        // On success  navigate to the tabs page.
        this.nav.push('TabsPage');

      } else {
        this.nav.setRoot('LoginPage');

        // On success  navigate to the login page.
        this.nav.push('LoginPage');
      }
    }
}

import { Component, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { UserService } from '../user/user.service';
import { AuthenticationService } from '../user/authentication.service';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild('myNav') nav : NavController;
    rootPage: any = 'LoginPage';
    private isLoggedIn: Boolean;
    public user: firebase.User;

    constructor(
      platform: Platform,
      public statusBar: StatusBar,
      public splashScreen: SplashScreen,
      private afAuth: AngularFireAuth,
      private userService: UserService,
      private authenticationService: AuthenticationService) {
        platform
          .ready()
          .then(() => this.onPlatformReady());
    }

    onPlatformReady() {
      console.log('onPlatformReady');
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native  things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.authenticationService.getRedirectResult();

      this.afAuth.authState
        .subscribe((user: firebase.User) => this.onUserChange(user));
    }

    onUserChange(user: firebase.User) {
      console.log('onUserChange');


      if (user) {
        console.log("Logged in");

        // Remove the login page from the nav stack.
        // Now the tabs page is the root of the application.
        this.nav.setRoot('TabsPage');

        // On success  navigate to the tabs page.
        this.nav.push('TabsPage');

      } else {
        console.log("Logged out");
        this.nav.setRoot('LoginPage');

        // On success  navigate to the login page.
        this.nav.push('LoginPage');
      }
    }
}

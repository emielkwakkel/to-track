import { Component, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { UserService } from '../user/user.service';

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
      statusBar: StatusBar,
      splashScreen: SplashScreen,
      private afAuth: AngularFireAuth,
      private userService: UserService) {
        // this.navCtrl = this.app.getActiveNav();
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();

            this.afAuth.authState
              .subscribe((user: firebase.User) => {
                if (user == null) {
                  console.log("Logged out");
                  this.isLoggedIn = false;

                  // commented out: keep the user profile on logout
                  // this.userService.user = undefined;
                } else {
                  this.isLoggedIn = true;
                  console.log("Logged in");
                  console.log(user.displayName);
                  this.userService.user = user;

                  // Remove the login page from the nav stack.
                  // Now the tabs page is the root of the application.
                  // this.navCtrl.remove(0);
                  this.nav.setRoot('TabsPage');

                  // On success  navigate to the tabs page.
                  this.nav.push('TabsPage');
                }
              }
            );
        });
    }
}

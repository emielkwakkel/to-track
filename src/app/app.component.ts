import { Component, ViewChild, OnDestroy } from '@angular/core';
import { Platform, NavController, LoadingController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AuthenticationService } from '../shared/user/authentication.service';
import { Geofence } from '@ionic-native/geofence';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    templateUrl: 'app.html'
})
export class MyApp implements OnDestroy {
    @ViewChild('myNav') nav : NavController;
    rootPage: any = 'LoginPage';
    public user: firebase.User;
    private subscription: Subscription
    public loading: any;

    constructor(
      public platform: Platform,
      public statusBar: StatusBar,
      public splashScreen: SplashScreen,
      private router: Router,
      private afAuth: AngularFireAuth,
      private authenticationService: AuthenticationService,
      public loadingCtrl: LoadingController,
      public geofence: Geofence
    ) {
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

      // Initialize Geofences
      this.geofence.initialize()
        .then(() => this.subscribeGeofenceTransitions())
        .catch(err => console.log('error', err));
    }

    private subscribeGeofenceTransitions() {
      this.subscription = this.geofence.onTransitionReceived()
        .subscribe(geofences => {
          geofences.forEach(geofence => {
              console.log('Geofence transition detected', geofence);
          });
        });
    }

    onUserChange(user: firebase.User) {
      this.loading.dismiss();

      if (user) {
        // Remove the login page from the nav stack.
        // Now the tabs page is the root of the application.
        this.router.navigate(['/tabs']);

        // On success  navigate to the tabs page.
        this.router.navigate(['/tabs']);

      } else {
        this.router.navigate(['/overview']);

        // On success  navigate to the login page.
        this.router.navigate(['/overview']);
      }
    }

    ngOnDestroy() {
      this.subscription.unsubscribe();
    }
}

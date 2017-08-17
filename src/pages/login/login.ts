import { Component } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";
// import { AngularFireAuth } from 'angularfire2/auth';
// import { Router } from '@angular/router';
// import { moveIn } from '../router.animations';

import { ToastController } from 'ionic-angular';
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
    error: any;
    user: Observable<firebase.User>;
    constructor(public navCtrl: NavController, public authenticationService: AuthenticationService, public toastCtrl: ToastController) {
    }

    loginGoogle() {
        this.authenticationService.loginGoogle()
            .then(success => this.onLogin(success))
            .catch(error => this.onError(error));
    }

    onLogin(success) {
        console.log('login success', success);

        // Remove the login page from the nav stack.
        // Now the tabs page is the root of the application.
        // this.navCtrl.remove(0);
        this.navCtrl.setRoot('TabsPage');

        // On success  navigate to the tabs page.
        this.navCtrl.push('TabsPage');

    }

    onError(error) {
        this.error = error;
        console.log('error', error);
        this.presentToast(error.message, 3000);
    }

    presentToast(message: string, duration: number) {
        let toast = this.toastCtrl.create({
            message,
            duration
        });
        toast.present();
    }

    logout() {
        this.authenticationService.logout();
    }
}

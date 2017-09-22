import { Component } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";
// import { AngularFireAuth } from 'angularfire2/auth';
// import { Router } from '@angular/router';
// import { moveIn } from '../router.animations';

import { ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

import { AuthenticationService } from '../../user/authentication.service';
import { UserService } from '../../user/user.service';

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
    constructor(
      public navCtrl: NavController,
      public authenticationService: AuthenticationService,
      public userService: UserService,
      public toastCtrl: ToastController) {
    }

    loginGoogle() {
        console.log('login with Google');
        this.authenticationService.loginGoogle()
            .then(success => this.onLogin(success))
            .catch(error => this.onError(error));
    }


    onLogin(result) {
        console.log('login success', result);
        if (result.credential) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const token = result.credential.accessToken;
            console.log('token', token);
            // ...
        }
        console.log('user', result.user)
        // The signed-in user info.
        this.userService.user = result.user;
    }

    onError(error) {
        this.error = error;
        console.log('error', error);
        // Handle Errors here.
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // // The email of the user's account used.
        // const email = error.email;
        // // The firebase.auth.AuthCredential type that was used.
        // const credential = error.credential;
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

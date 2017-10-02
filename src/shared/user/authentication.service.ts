import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { ToastController } from 'ionic-angular';
import { UserService } from './user.service';

@Injectable()
export class AuthenticationService {
    error: any;
    constructor(
        public afAuth: AngularFireAuth,
        public toastCtrl: ToastController,
        public userService: UserService) { }

    public loginGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
        return this.afAuth.auth.signInWithRedirect(provider);
    }

    public getRedirectResult() {
      return this.afAuth.auth
        .getRedirectResult()
            .then(result => this.onLogin(result))
            .catch(error => this.onError(error));
    }

    public logout() {
        console.log('logout');
        return this.afAuth.auth.signOut();
    }

    private onLogin(result) {
        console.log('onLogin!!', result);
        // If defined the user just logged in.
        // If not defined user was already logged in, no need to set the user again.
        if (result.user) {
          console.log('writing user!!');
          this.userService.user = result.user;
        }
    }

    private onError(error) {
        console.log('error', error);
        this.presentToast(error.message, 3000);
    }


    private presentToast(message: string, duration: number) {
        let toast = this.toastCtrl.create({
            message,
            duration
        });
        toast.present();
    }
}

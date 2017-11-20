import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { ToastController, LoadingController } from 'ionic-angular';
import { UserService } from './user.service';

@Injectable()
export class AuthenticationService {
    error: any;
    loading: any;

    constructor(
        private afAuth: AngularFireAuth,
        private toastCtrl: ToastController,
        private userService: UserService,
        public loadingCtrl: LoadingController) {
          this.loading = loadingCtrl.create({
            content: 'Logging in...'
          });
        }

    public loginGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
        this.loading.present();
        return this.afAuth.auth.signInWithRedirect(provider);
    }

    public loginEmail(email: string, password: string) {
      return firebase.auth().signInWithEmailAndPassword(email, password)
    }

    public createAccount(email: string, password: string) {
      return firebase.auth().createUserWithEmailAndPassword(email, password);
    }

    public getRedirectResult() {
      return this.afAuth.auth
        .getRedirectResult()
            .then(result => this.onLogin(result))
            .catch(error => this.onError(error));
    }

    public logout() {
        return this.afAuth.auth.signOut();
    }

    private onLogin(result) {
        // If defined the user just logged in.
        // If not defined user was already logged in, no need to set the user again.
        if (result.user) {
          const user = this.userService.parseFirebaseUser(result.user);
          this.userService.user = user;
        }
    }

    private onError(error) {
        this.loading.dismiss();
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

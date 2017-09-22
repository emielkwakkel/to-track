import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthenticationService {
    constructor(public afAuth: AngularFireAuth) { }

    public loginGoogle() {
        this.afAuth.auth
            .signInWithRedirect(new firebase.auth.GoogleAuthProvider());

        return this.afAuth.auth
          .getRedirectResult();
    }

    public logout() {
        console.log('logout');
        return this.afAuth.auth.signOut();
    }
}

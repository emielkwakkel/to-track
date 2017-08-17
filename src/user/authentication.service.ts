import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthenticationService {
    constructor(public afAuth: AngularFireAuth) { }

    public loginGoogle() {
        return this.afAuth.auth
            .signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }

    public logout() {
        console.log('logout');
        return this.afAuth.auth.signOut();
    }
}

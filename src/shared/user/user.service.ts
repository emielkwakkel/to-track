import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase/app';
import { User } from './user.model';

@Injectable()
export class UserService {
    private _user: User;
    private _database = firebase.database;

    constructor(private storage: Storage) {
    }

    get user(): User {
      const user: firebase.User = firebase.auth().currentUser;

      if (user) return this.parseFirebaseUser(user);
      return;
    }

    set user(user: User) {
        if (user) {
          // Store between page loads
          this._user = user;

          // Store on device
          this.storage.set('user', user)
            .then(() => console.log('succesfully written userdata to local storage'))
            .catch(error => console.log('error writing data', error));

          // Write to storage
          this.writeUserData(user)
            .then(() => {
              console.log('Written user data');
            })
            .catch(error => {
              console.log('Error writing user data');
            })
        } else {
            console.log('Called setter without data');
        }
    }

    writeUserData(user: User) {
        return this._database()
            .ref('users/' + user.uid)
            .set(user);
    }

    public parseFirebaseUser(user: firebase.User) {
      return {
        displayName: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
        phoneNumber: user.phoneNumber,
        photoURL: user.photoURL,
        uid: user.uid,
        providerId: user.providerData[0].providerId
      }
    }
}

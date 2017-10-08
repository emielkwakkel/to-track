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
      // Check if user data is present in the service
      if(!this._user) {
        // If not in the service get it from storage
        this.storage.get('user')
          .then(user => {
            // Set user if data was present in local storage
            if (user) this.user = user;
            // If no user data is loaded get it from firebase
            if (!user) this.user = this.parseFirebaseUser(firebase.auth().currentUser);
          })
          .catch(error => {
            console.log('error getting user', error)
          });
      } else {
        console.log('user not logged in');
      }
      return this._user;
    }

    set user(user: User) {
        if (user) {
          // Store between page loads
          this._user = user;

          // Store on device
          this.storage.remove('user');
          this.storage.set('user', user);

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

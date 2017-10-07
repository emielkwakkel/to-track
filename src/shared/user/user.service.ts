import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase/app';

@Injectable()
export class UserService {
    private _user: firebase.User;
    private _database = firebase.database;

    constructor(private storage: Storage) {
    }

    get user(): firebase.User {
        console.log('get user', this._user)
        if(!this._user) {
          console.log('User not locally stored');
          this.storage.get('user')
            .then(user => {
              console.log('result', user);
              if (user) this.user = user;
              if (!user) this.user = firebase.auth().currentUser;
            })
            .catch(error => {
              console.log('error getting user', error)
            });
        } else {
          console.log('user not logged in');
        }
        return this._user;
    }

    set user(user: firebase.User) {
        console.log('Set user', user);

        if (user) {
          // Store between page loads
          this._user = user;

          // Store on device
          this.storage.remove('user');
          this.storage.set('user', user);

          // Write to storage
          this.writeUserData(
            user.uid,
            user.displayName,
            user.email,
            user.photoURL,
            user.providerData[0].providerId,
            user.phoneNumber
          ).then(() => {
            console.log('Written user data');
          }).catch(error => {
            console.log('Error writing user data');
          })
        } else {
            console.log('Called setter without data');
        }
    }

    writeUserData(uid : string, displayName: string, email : string, photoURL : string, provider: string, phoneNumber : string) {
        return this._database()
            .ref('users/' + uid)
            .set({
                displayName,
                email,
                photoURL,
                provider,
                phoneNumber
            });
    }
}

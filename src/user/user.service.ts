import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';

@Injectable()
export class UserService {
    private _user: firebase.User;
    private _database = firebase.database;

    constructor() {}

    get user(): firebase.User {
        return this._user;
    }

    set user(user: firebase.User) {
        if (user) {
          this._user = user;
          console.log('Set user', user);
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
        return this._database().ref('users/' + uid).set({
            displayName: displayName,
            email: email,
            photoURL: photoURL,
						provider: provider,
						phoneNumber: phoneNumber
        });
    }
}

import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

import { Company } from './company.model';

@Injectable()
export class CompanyService {
    private _companies: any[];
    private uid: string;

    constructor(private _database: AngularFireDatabase) {
      this.uid = firebase.auth().currentUser.uid;
    }

    get companies(): FirebaseListObservable<Company[]>{
      return this._database
        .list(`company/${this.uid}`);
        // .valueChanges();

    }

    addCompany(company: Company) {
      // Write to firebase
      return this.writeCompany(company);
    }

    writeCompany(company : Company) {
        console.log('add company', company);
        return this._database
          .object(`company/${this.uid}/${company.name}`)
          .set(company);
    }

    deleteCompany(company) {
      return this._database
        .object(`company/${this.uid}/${company.$key}`)
        .remove();
    }
}

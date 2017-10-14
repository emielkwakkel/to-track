import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

import { Company } from './company.model';

@Injectable()
export class CompanyService {
    private _companies: any[];
    private uid: string;

    constructor(private _database: AngularFireDatabase) {
      this.uid = firebase.auth().currentUser.uid;
    }

    get companies(): Observable<Company[]>{
      return this._database
        .list<Company[]>(`company/${this.uid}`)
        .valueChanges();

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

    deleteCompany(company: Company) {
      return this._database
        .object(`company/${this.uid}/${company.name}`)
        .remove();
    }
}

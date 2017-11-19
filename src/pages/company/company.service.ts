import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

import { Company } from './company.model';

@Injectable()
export class CompanyService {
    private uid: string;

    constructor(private _database: AngularFireDatabase) {
      this.uid = firebase.auth().currentUser.uid;
    }

    public get companies(): Observable<Company[]>{
      return this._database
        .list<Company[]>(`company/${this.uid}`)
        .valueChanges();
    }

    public addCompany(company: Company) {
      company.key = firebase.database().ref().push().key;

      return this._database
        .object(`company/${this.uid}/${company.key}`)
        .set(company);
    }

    public updateCompany(company: Company) {
      console.log('update', company);
      return this._database
        .object(`company/${this.uid}/${company.key}`)
        .set(company);
    }

    public deleteCompany(company: Company) {
      return this._database
        .object(`company/${this.uid}/${company.key}`)
        .remove();
    }
}

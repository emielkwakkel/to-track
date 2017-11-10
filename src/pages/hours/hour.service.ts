import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Hour } from './hour.model';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HourService {
    private uid: string;

    constructor(private _database: AngularFireDatabase) {
        this.uid = firebase.auth().currentUser.uid;
    }

    get hours(): Observable<Hour[]>{
      return this._database
        .list<Hour[]>(`hours/${this.uid}`)
        .valueChanges();
    }

    public addHour(hour: Hour) {
      hour.key = firebase.database().ref().push().key;
      return this._database
        .object(`hours/${this.uid}/${hour.key}`)
        .set(hour);
    }

    updateHour(hour: Hour) {
      console.log('update', hour);
      return this._database
        .object(`hours/${this.uid}/${hour.key}`)
        .update(hour);
    }

    public deleteHour(hour: Hour) {
      return this._database
        .object(`hours/${this.uid}/${hour.key}`)
        .remove();
    }

    public getDuration(start: moment.Moment, end: moment.Moment) {
        const duration = moment.duration(end.diff(start));
        return duration.asSeconds();
    }
}

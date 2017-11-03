import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Hour } from './hour.model';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HoursService {
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
      return this._database
        .object(`hours/${this.uid}/${hour.start}`)
        .set(hour);
    }

    public deleteHour(hour: Hour) {
      return this._database
        .object(`hours/${this.uid}/${hour.start}`)
        .remove();
    }

    public getDuration(start: moment.Moment, end: moment.Moment) {
        const duration = moment.duration(end.diff(start));
        return duration.asSeconds();
    }
}

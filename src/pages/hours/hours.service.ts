import * as moment from 'moment';
import { Hour } from './hour.model';

export class HoursService {
    private _hours: Hours[];
    constructor() {
        this._hours = [
            {
                start: '2017-08-03 08:00:00',
                end: '2017-08-03 12:00:00',
                client: 'Rabobank',
                duration: 240
            },
            {
                start: '2017-08-03 12:30:00',
                end: '2017-08-03 17:00:00',
                client: 'Rabobank',
                duration: 280
            },
            {
                start: '2017-08-04 08:00:00',
                end: '2017-08-03 12:00:00',
                client: 'Rabobank',
                duration: 240
            },
            {
                start: '2017-08-04 12:30:00',
                end: '2017-08-03 17:00:00',
                client: 'Rabobank',
                duration: 280
            }
        ]
    }

    get hours(): Hours[] {
        return this._hours;
    }

    public getDuration(start: moment.Moment, end: moment.Moment) {
        const duration = moment.duration(end.diff(start));
        return duration.asSeconds();
    }
}

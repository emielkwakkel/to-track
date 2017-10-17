import { Component } from "@angular/core";
import * as moment from 'moment';
import { IonicPage, NavController } from "ionic-angular";
import { HoursService } from "./hours.service";
import { Hours } from "./hours.model";

@IonicPage({
    priority: 'high'
})
@Component({
    selector: 'page-hours',
    templateUrl: 'hours.html'
})
export class HoursPage {
    recording: boolean = false;
    hour: Hours;
    hours: Hours[];
    time: any;
    timer: any;

    constructor(public navCtrl: NavController, private HoursService: HoursService) {
        this.hours = this.HoursService.hours;
    }

    public delete() {
        console.log('delete!');
    }

    public startRecording() {
        this.recording = true;
        this.hour = {
            start: moment(),
            client: 'Rabobank'
        };
        this.time = moment('2015-01-01')
            .startOf('day')
            .seconds(0)
            .format('H:mm:ss');

        this.timer = setInterval(() => {
            const duration = this.HoursService.getDuration(this.hour.start, moment());

            this.time = moment('2015-01-01')
                .startOf('day')
                .seconds(duration)
                .format('H:mm:ss');
        }, 1000)
    }

    public stopRecording() {
        clearInterval(this.timer);
        this.time = null;
        this.recording = false;
        this.hour.end = moment();
        this.hour.duration = this.HoursService.getDuration(this.hour.start, this.hour.end);
        console.log(this.hour)
    }
}

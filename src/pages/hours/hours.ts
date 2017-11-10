import { Component, OnDestroy } from "@angular/core";
import * as moment from 'moment';
import { IonicPage, NavController, ActionSheetController } from "ionic-angular";
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/observable/combineLatest";

import { HoursService } from "./hours.service";
import { Hour } from "./hour.model";
import { CompanyService } from '../company/company.service';
import { Company } from '../company/company.model';

@IonicPage({
    priority: 'high'
})
@Component({
    selector: 'page-hours',
    templateUrl: 'hours.html'
})
export class HoursPage implements OnDestroy {
    recording: boolean = false;
    hour: Hour;
    hours: Hour[];
    time: any;
    timer: any;
    companies: Company[];
    subscriptions: Subscription;
    loading: boolean;

    constructor(
      public navCtrl: NavController,
      private HoursService: HoursService,
      private CompanyService: CompanyService,
      public actionSheetCtrl: ActionSheetController) {
        this.loading = true;

        // Subscribe to both hours and companies
        this.subscriptions = Observable
          // When any observable emits a value, emit the latest value from each
          .combineLatest(
            this.HoursService.hours,
            this.CompanyService.companies
          )
          .subscribe(([hours, companies]) => {
            this.loading = false;
            this.hours = this.extendHours(hours, companies);
            this.companies = companies;
            }
          );
    }

    extendHours(hours, companies) {
      hours.forEach(hour => {
        const company = companies.find(company => company.key === hour.company);
        hour.name = company ?  company.name : '-deleted-';
        hour.title = moment(hour.start).startOf('second').fromNow();
        hour.durationFormatted = moment
          .duration(hour.duration, 'seconds')
          .humanize();
        hour.startFormatted = moment(hour.start).calendar();
        hour.endFormatted = moment(hour.end).format('H:mm A')
      });

      return hours;
    }

    editHour(hour) {
      console.log('edit hour', hour);
    }

    deleteHour(hour) {
      console.log('delete hour', hour);
      this.HoursService.deleteHour(hour);
    }

    selectCompany() {
      if (!this.companies) {
          console.log('No companies yet');
          return;
      }

      if (this.companies.length === 1) {
          console.log('single company');
          this.startRecording(this.companies[0].key);
          return;
      }

      if (this.companies.length > 1) {
          console.log('multiple')
          this.showActionSheet(this.companies);
          return;
      }
    }

    private showActionSheet(companies) {
      const buttons = [{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {}
        }];

      companies.forEach(company => {
        buttons.push({
          text: company.name,
          role: '',
          handler: () => {
            this.startRecording(company.key)
          }
        });
      });

      this.actionSheetCtrl
        .create({
          title: 'Select company',
          buttons
        })
        .present();
    }

    public startRecording(company: string) {
        this.recording = true;
        this.hour = {
            start: moment().format('YYYY-MM-DD hh:mm:ss'),
            company
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
        // Reset time & recording
        this.time = null;
        this.recording = false;

        // Determine time recording has stopped
        this.hour.end = moment().format('YYYY-MM-DD hh:mm:ss');

        // Calculate duration
        this.hour.duration = this.HoursService.getDuration(
          moment(this.hour.start),
          moment(this.hour.end)
        );
        console.log(this.hour)
        // Save hour to database
        this.HoursService.addHour(this.hour)
          .then(() => console.log('success'))
          .catch(error => console.log(error));
    }

    ngOnDestroy() {
      this.subscriptions.unsubscribe();
    }
}

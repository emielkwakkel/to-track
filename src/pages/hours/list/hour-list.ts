import { Component, OnDestroy } from '@angular/core';
import { IonicPage, NavController, ActionSheetController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import * as moment from 'moment';

import { HourService } from '../hour.service';
import { Hour } from '../hour.model';
import { CompanyService } from '../../company/company.service';
import { Company } from '../../company/company.model';

@IonicPage({
    priority: 'high'
})
@Component({
    selector: 'page-hour-list',
    templateUrl: 'hour-list.html'
})
export class HourListPage implements OnDestroy {
    recording: boolean = false;
    hour: Hour;
    hours: Hour[];
    time: any;
    timerInterval: any;
    companies: Company[];
    companyName: string;
    subscriptions: Subscription;
    loading: boolean;

    constructor(
      public navCtrl: NavController,
      private HourService: HourService,
      private CompanyService: CompanyService,
      private actionSheetCtrl: ActionSheetController) {
        this.loading = true;

        // Subscribe to both hours and companies
        this.subscriptions = Observable
          // When any observable emits a value, emit the latest value from each
          .combineLatest(
            this.HourService.hours,
            this.CompanyService.companies
          )
          .subscribe(([hours, companies]) => {
            this.loading = false;
            this.companies = companies;
            this.hours = this.extendHours(hours, companies);
            }
          );
    }

    private extendHours(hours, companies) {
      hours.forEach(hour => {
        hour.companyName = this.getCompanyName(hour.company, companies);
        hour.timeAgo = hour.end ? moment(hour.start).startOf('second').fromNow() : null;
        hour.durationFormatted = hour.duration
          ? moment('2015-01-01')
              .startOf('second')
              .seconds(hour.duration)
              .format('H:mm:ss')
          : null;
        hour.startFormatted = moment(hour.start).calendar();
        hour.endFormatted = hour.end ? moment(hour.end).format('hh:mm A') : null;

        // Check if timer is still running
        if (!hour.end) {
          this.startRecording(hour.company, hour.start, hour.key);
        }
      });

      return hours;
    }

    private getCompanyName(companyKey: string, companies: Company[]) {
      const company = companies.find(company => company.key === companyKey);
      return company ?  company.name : '-deleted-';
    }

    public editHour(hour) {
        this.navCtrl.push('HourEditPage', { hour });
    }

    public deleteHour(hour) {
      this.HourService.deleteHour(hour);
    }

    public selectCompany() {
      // No companies yet
      if (!this.companies) return null;

      // Single company > directly start rercording
      if (this.companies.length === 1) return this.startRecording(this.companies[0].key);

      // Multiple companies > select company first
      if (this.companies.length > 1) return this.showActionSheet(this.companies);
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

    private startRecording(company: string, start?: moment.Moment, key?: string) {
        // start is defined if open recording starts again.
        this.recording = true;
        this.hour = {
            start: start ? start : moment().format('YYYY-MM-DDTHH:mm:ss'),
            company,
            key
        };
        this.startTimer(
          this.hour.company,
          this.hour.start
        );

        if (!start) {
          this.HourService.addHour(this.hour)
            .then(success => console.log('success',success))
            .catch(error => console.log('error', error));
        }
    }

    private startTimer(company: string, start: moment.Moment) {
      this.companyName =  this.getCompanyName(company, this.companies);
      this.time = moment('2015-01-01')
          .startOf('second')
          .seconds(0)
          .format('H:mm:ss');

      this.timerInterval = setInterval(() => {
          const duration = this.HourService.getDuration(start, moment());

          this.time = moment('2015-01-01')
              .startOf('second')
              .seconds(duration)
              .format('H:mm:ss');
      }, 1000)
    }

    public stopRecording() {
        clearInterval(this.timerInterval);
        // Reset time & recording
        this.time = null;
        this.recording = false;

        // Determine time recording has stopped
        this.hour.end = moment().format('YYYY-MM-DDTHH:mm:ss');

        // Calculate duration
        this.hour.duration = this.HourService.getDuration(
          moment(this.hour.start),
          moment(this.hour.end)
        );

        // Update hour
        this.HourService.updateHour(this.hour)
          .then(() => console.log('saved', this.hour))
          .catch(error => console.log(error));
    }

    ngOnDestroy() {
      this.subscriptions.unsubscribe();
    }
}

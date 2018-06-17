import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';

import { Hour } from '../hour.model';
import { HourService } from '../hour.service';
import { Company } from '../../company/company.model';
import { CompanyService } from '../../company/company.service';

@IonicPage()
@Component({
  selector: 'page-hour-edit',
  templateUrl: './hour-edit.html'
})
export class HourEditPage implements OnInit, OnDestroy {
  action: string;
  hour: Hour;
  companies: Company[];
  subscription: Subscription;
  loading: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public HourService: HourService,
    private CompanyService: CompanyService
  ) {
    this.hour = navParams.get('hour');
  }

  ngOnInit() {
    this.loading = true;
    this.subscription = this.CompanyService.companies
      .subscribe(companies => {
        this.loading = false;
        console.log('companies', this.companies);
        this.companies = companies;
      })
  }

  deleteHour(hour) {
    this.action = 'delete';
    this.HourService.deleteHour(hour);
    this.navCtrl.push('HourListPage');
  }

  substractBreak(minutes: number = 0) {
    if (this.hour.breakMinutes >= 15) {
      this.hour.breakMinutes = minutes - 15;
    }
  }

  addBreak(minutes: number = 0) {
    this.hour.breakMinutes = minutes + 15;
  }

  ionViewWillLeave() {
    if (this.action !== 'delete') {
      const saveObject: Hour = {
        company: this.hour.company,
        start: this.hour.start,
        key: this.hour.key,
      }

      if (this.hour.end) {
        const breakSeconds = this.hour.breakMinutes ? this.hour.breakMinutes * 60 : 0;
        // Calculate duration
        this.hour.duration = this.HourService.getDuration(
          moment(this.hour.start),
          moment(this.hour.end),
          breakSeconds,
        );

        saveObject.duration = this.hour.duration;
        saveObject.end = this.hour.end;
      }

      if (this.hour.description) {
        saveObject.description = this.hour.description;
      }

      if (this.hour.breakMinutes || this.hour.breakMinutes === 0) {
        saveObject.breakMinutes = this.hour.breakMinutes;
      }

      return this.HourService.updateHour(saveObject)
        .then(() => console.log('success'))
        .catch(error => console.log('error updating hour data', error));
    }
    return;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

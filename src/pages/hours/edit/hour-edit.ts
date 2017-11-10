import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

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

  ionViewWillLeave() {
    if(this.action !== 'delete') {
      console.log('save', this.hour);

      return this.HourService.updateHour({
        company: this.hour.company,
        start: this.hour.start,
        end: this.hour.end,
        key: this.hour.key,
        duration: this.hour.duration
      })
        .then(() => console.log('success'))
        .catch(error => console.log('error updating hour data', error));
    }
    return;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

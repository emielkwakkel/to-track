import { Component } from '@angular/core';
import { IonicPage, NavParams } from '@ionic/angular';
import { Company } from '../company.model';
import { Location } from '../../../shared/location/location.model';
import { CompanyService } from '../company.service';

@IonicPage()
@Component({
    selector: 'page-company-location',
    templateUrl: 'company-location.html'
})
export class CompanyLocationPage {
    company: Company;
    constructor(private navParams: NavParams, private CompanyService: CompanyService) {
      this.company = this.navParams.get('company');
    }

    public locationChanged(event: Location) {
      // Set new location
      this.company.location = event;
    }

    ionViewWillLeave() {
      // Update company with new location after navigating away
      this.CompanyService.updateCompany(this.company);
    }
}

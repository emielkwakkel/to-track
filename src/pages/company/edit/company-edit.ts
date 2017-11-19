import {Component} from "@angular/core";
import {IonicPage, NavController, NavParams} from "ionic-angular";
import {Company} from '../company.model';
import {CompanyService} from '../company.service';

@IonicPage()
@Component({
  selector: 'page-company-edit',
  templateUrl: './company-edit.html'
})
export class CompanyEditPage {
  action: string;
  company: Company;
  companyBackup: Company;

  constructor(public navCtrl: NavController, public navParams: NavParams, public CompanyService: CompanyService) {
    this.company = navParams.get('company');
    this.companyBackup = this.company;
  }

  public toLocation(company) {
    this.navCtrl.push('CompanyLocationPage', { company })
  }

  public deleteCompany(company) {
    this.action = 'delete';
    this.CompanyService.deleteCompany(company);
    this.navCtrl.push('CompanyListPage');
  }

  public deleteLocation() {
    delete(this.company.location);
    this.company.locationEnabled = false;
  }

  ionViewWillLeave() {
    console.log('will leave', this.company, this.action);
    if(this.action !== 'delete') {
      return this.CompanyService.updateCompany(this.company)
        .then(() => console.log('success'))
        .catch(error => console.log('error updating company data', error));
    }
    return;
  }
}

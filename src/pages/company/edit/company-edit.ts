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
  company: Company;
  companyBackup: Company;

  constructor(public navCtrl: NavController, public navParams: NavParams, public CompanyService: CompanyService) {
    this.company = navParams.get('company');
    this.companyBackup = this.company;
  }

  toLocation(location) {
    this.navCtrl.push('LocationPage', { location })
  }

  addCompany(company) {
    console.log('adding', company);
  }

  deleteCompany(company) {
    this.CompanyService.deleteCompany(company);
    this.navCtrl.push('CompanyListPage');
  }
}

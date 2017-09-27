import {Component, ViewChild} from "@angular/core";
import {IonicPage, NavController, NavParams, Slides} from "ionic-angular";
import {Company} from '../company.model';
import {CompanyService} from '../company.service';

@IonicPage()
@Component({
  selector: 'page-company-add',
  templateUrl: './company-add.html'
})
export class CompanyAddPage {
  @ViewChild(Slides) slides: Slides;
  company: Company;
  companyBackup: Company;

  constructor(public navCtrl: NavController, public navParams: NavParams, public CompanyService: CompanyService) {
    this.company = navParams.get('company');
    this.companyBackup = this.company;
  }

  ngOnInit() {
    this.slides.lockSwipeToNext(true);
    console.log('slides', this.slides)
  }

  toLocation(location) {
    this.navCtrl.push('LocationPage', { location })
  }

  addCompany(company) {
    console.log('adding', company);
  }

  deleteCompany(company) {
    console.log('deleting', company);
  }
}

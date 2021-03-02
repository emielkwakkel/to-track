import { Component, ViewChild } from "@angular/core";
import { IonicPage, NavController, NavParams, Slides } from "@ionic/angular";
import { Company } from '../company.model';
import { CompanyService } from '../company.service';
import { Location } from '../../../shared/location/location.model';

@IonicPage()
@Component({
  selector: 'page-company-add',
  templateUrl: './company-add.html'
})
export class CompanyAddPage {
  @ViewChild(Slides) slides: Slides;
  company: Company;
  location: Location;
  slideIndex: Number;
  slideIsEnd: Boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public companyService: CompanyService
  ) {
  }

  ngOnInit() {
    // this.slides.lockSwipeToNext(true);
    this.slideIndex = 1;
    this.company = {
      key: '',
      name: '',
      locationEnabled: false,
      location: {
        address: null,
        lat: null,
        long: null,
        radius: 100
      }
    }
  }

  slideChanged() {
    this.checkSteps();
  }

  locationChanged(location: Location) {
    this.company.location = location;
  }

  checkSteps() {
    setTimeout(() => {
      this.slideIndex = this.slides.getActiveIndex() + 1;
      this.slideIsEnd = this.slides.isEnd();
    }, 100)
  }

  onNext() {
    this.slides.slideNext(300);
  }

  addCompany(company: Company) {
    this.companyService.addCompany(company)
      .then(() => this.navCtrl.push('CompanyListPage'))
      .catch(error => console.log('error writing company data', error));
  }
}

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
  slideIndex: Number;
  slideIsEnd: Boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public CompanyService: CompanyService) {
    this.company = navParams.get('company');
    this.companyBackup = this.company;
  }

  ngOnInit() {
    // this.slides.lockSwipeToNext(true);
    this.slideIndex = 1;
    this.company = {
      name: '',
      locationEnabled: false
    }
  }

  slideChanged() {
    this.checkSteps();
  }

  checkSteps() {
    setTimeout(() => {
      console.log('enabled', this.company.locationEnabled);
      this.slideIndex = this.slides.getActiveIndex() + 1;
      this.slideIsEnd = this.slides.isEnd();
      console.log('slidend', this.slideIsEnd);

    },100)
  }

  onNext() {
    this.slides.slideNext(300);
  }

  addCompany(company) {
    console.log('adding', company);
  }

  deleteCompany(company) {
    console.log('deleting', company);
  }
}

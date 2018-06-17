import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Company } from '../company.model';
import { CompanyService } from '../company.service';

@IonicPage()
@Component({
  selector: 'page-company-edit',
  templateUrl: './company-edit.html'
})
export class CompanyEditPage {
  private action: string;
  public company: Company;
  private companyForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public CompanyService: CompanyService,
    public formBuild: FormBuilder) {
    this.company = navParams.get('company');
    this.companyForm = this.formBuild.group({
      name: [ this.company.name, [ Validators.required ]],
      locationEnabled: [ this.company.locationEnabled ],
      location: [ this.company.location.address ]
    })
  }

  public toLocation(company) {
    this.company.locationEnabled = true;
    this.companyForm.patchValue({locationEnabled: true});
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
    this.companyForm.patchValue({locationEnabled: false});
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

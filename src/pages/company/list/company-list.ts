import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";
import { Subscription } from 'rxjs/Subscription';
import { List } from 'ionic-angular';

import { CompanyService } from '../company.service';
import { Company } from '../company.model';

@IonicPage({
    priority: 'high'
})
@Component({
    selector: 'page-company-list',
    templateUrl: './company-list.html'
})
export class CompanyListPage implements OnInit, OnDestroy {
    @ViewChild(List) list : List;
    companies: Company[];
    subscription: Subscription;
    loading: boolean;

    constructor(
        public navCtrl: NavController,
        public CompanyService: CompanyService) {
    }

    ngOnInit() {
      this.loading = true;
      this.subscription = this.CompanyService.companies
        .subscribe(companies => {
          this.loading = false;
          this.companies = companies;
        })
    }

    public addCompany() {
        this.navCtrl.push('CompanyAddPage');
    }

    public editCompany(company) {
        console.log('editing company', company);
        this.navCtrl.push('CompanyEditPage', { company });
    }

    public deleteCompany(company) {
        this.CompanyService.deleteCompany(company);
    }

    ionViewWillLeave() {
      this.list.closeSlidingItems();
    }

    ngOnDestroy() {
      this.subscription.unsubscribe();
    }
}

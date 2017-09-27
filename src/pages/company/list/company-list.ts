import { Component, OnInit } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";
import { Company } from '../company.model';
import { CompanyService } from '../company.service';

@IonicPage({
    priority: 'high'
})
@Component({
    selector: 'page-company-list',
    templateUrl: './company-list.html'
})
export class CompanyListPage implements OnInit {
    companies: Company[];

    constructor(
        public navCtrl: NavController,
        public CompanyService: CompanyService) {
    }

    ngOnInit() {
      this.companies = this.CompanyService.companies;
    }

    public addCompany() {
        this.navCtrl.push('CompanyEditPage');
    }

    public editCompany(company) {
        console.log('editing company', company);
        this.navCtrl.push('CompanyEditPage', { company });
    }

    public deleteCompany(company) {
        console.log('deleting', company);
    }
}

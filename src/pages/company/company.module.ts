import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicPageModule } from 'ionic-angular';
import { CompanyListPage } from './list/company-list';
import { CompanyService } from './company.service';

@NgModule({
    declarations: [CompanyListPage],
    imports: [
      IonicPageModule.forChild(CompanyListPage),
      FormsModule
    ],
    entryComponents: [CompanyListPage],
    providers: [CompanyService]
})
export class CompanyPageModule {
}

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicPageModule } from 'ionic-angular';
import { CompanyListPage } from './list/company-list';
import { CompanyService } from './company.service';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    declarations: [ CompanyListPage ],
    imports: [
      IonicPageModule.forChild(CompanyListPage),
      FormsModule,
      SharedModule
    ],
    entryComponents: [ CompanyListPage ],
    providers: [ CompanyService ],
    exports: [ CompanyService ]
})
export class CompanyPageModule {
}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyLocationPage } from './company-location';
import { SharedModule } from '../../../shared/shared.module';
import { CompanyService } from "../company.service";

@NgModule({
    declarations: [CompanyLocationPage],
    imports: [IonicPageModule.forChild(CompanyLocationPage), SharedModule],
    entryComponents: [CompanyLocationPage],
    providers: [CompanyService]
})
export class LocationPageModule {
}

import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { LocationPageModule } from "../../location/location.module";
import { CompanyAddPage } from "./company-add";
import { CompanyService } from "../company.service";
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [CompanyAddPage],
  imports: [
    IonicPageModule.forChild(CompanyAddPage),
    LocationPageModule,
    SharedModule
  ],
  entryComponents: [CompanyAddPage],
  providers: [CompanyService]
})
export class CompanyAddPageModule {
}

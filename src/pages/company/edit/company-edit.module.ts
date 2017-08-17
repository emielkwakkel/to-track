import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {CompanyEditPage} from "./company-edit";
import {CompanyService} from "../company.service";

@NgModule({
  declarations: [CompanyEditPage],
  imports: [IonicPageModule.forChild(CompanyEditPage)],
  entryComponents: [CompanyEditPage],
  providers: [CompanyService]
})
export class CompanyPageModule {
}

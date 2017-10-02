import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { CompanyAddPage } from "./company-add";
import { CompanyService } from "../company.service";
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [CompanyAddPage],
  imports: [ IonicPageModule.forChild(CompanyAddPage), SharedModule ],
  entryComponents: [CompanyAddPage],
  providers: [CompanyService]
})
export class CompanyAddPageModule {
}

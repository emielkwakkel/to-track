import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { CompanyAddPage } from "./company-add";
import { CompanyService } from "../company.service";
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [CompanyAddPage],
  imports: [ RouterModule.forChild(CompanyAddPage), SharedModule ],
  entryComponents: [CompanyAddPage],
  providers: [CompanyService]
})
export class CompanyAddPageModule {
}

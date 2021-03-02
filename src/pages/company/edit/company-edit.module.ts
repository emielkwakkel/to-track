import {NgModule} from "@angular/core";
import { RouterModule } from '@angular/router';
import {CompanyEditPage} from "./company-edit";
import {CompanyService} from "../company.service";

@NgModule({
  declarations: [CompanyEditPage],
  imports: [RouterModule.forChild([ { path: 'company/edit/', component: CompanyEditPage }])],
  entryComponents: [CompanyEditPage],
  providers: [CompanyService]
})
export class CompanyPageModule {
}

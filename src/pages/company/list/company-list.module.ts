import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { CompanyListPage } from "./company-list";
import { CompanyService } from "../company.service";

@NgModule({
    declarations: [CompanyListPage],
    imports: [RouterModule.forChild(CompanyListPage)],
    entryComponents: [CompanyListPage],
    providers: [CompanyService]
})
export class CompanyListPageModule {
}

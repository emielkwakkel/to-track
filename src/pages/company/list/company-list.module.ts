import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { CompanyListPage } from "./company-list";
import { CompanyService } from "../company.service";

@NgModule({
    declarations: [CompanyListPage],
    imports: [IonicPageModule.forChild(CompanyListPage)],
    entryComponents: [CompanyListPage],
    providers: [CompanyService]
})
export class CompanyPageModule {
}

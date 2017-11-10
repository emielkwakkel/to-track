import { NgModule } from "@angular/core";
import { HourListPage } from "./hour-list";
import { IonicPageModule } from "ionic-angular";
import { CompanyService } from '../../company/company.service';
import { HourService } from "../hour.service";

@NgModule({
    declarations: [HourListPage],
    imports: [IonicPageModule.forChild(HourListPage)],
    entryComponents: [HourListPage],
    providers: [HourService, CompanyService]
})
export class HourListPageModule {
}

import { NgModule } from "@angular/core";
import { HoursPage } from "./hours";
import { IonicPageModule } from "ionic-angular";
import { CompanyService } from '../company/company.service';
import { HoursService } from "./hours.service";

@NgModule({
    declarations: [HoursPage],
    imports: [IonicPageModule.forChild(HoursPage)],
    entryComponents: [HoursPage],
    providers: [HoursService, CompanyService]
})
export class HoursPageModule {
}

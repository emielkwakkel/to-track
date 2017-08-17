import { NgModule } from "@angular/core";
import { HoursPage } from "./hours";
import { IonicPageModule } from "ionic-angular";
import { HoursService } from "./hours.service";

@NgModule({
    declarations: [HoursPage],
    imports: [IonicPageModule.forChild(HoursPage)],
    entryComponents: [HoursPage],
    providers: [HoursService]
})
export class HoursPageModule {
}

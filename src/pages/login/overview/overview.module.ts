import { NgModule } from "@angular/core";
import { OverviewPage } from "./overview";
import { IonicPageModule } from "ionic-angular";

@NgModule({
    declarations: [OverviewPage],
    imports: [IonicPageModule.forChild(OverviewPage)],
    entryComponents: [OverviewPage]
})
export class OverviewPageModule {
}

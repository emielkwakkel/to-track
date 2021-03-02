import { NgModule } from "@angular/core";
import { OverviewPage } from "./overview";
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [OverviewPage],
    imports: [RouterModule.forChild(OverviewPage)],
    entryComponents: [OverviewPage]
})
export class OverviewPageModule {
}

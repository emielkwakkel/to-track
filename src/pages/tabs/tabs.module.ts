import { NgModule } from "@angular/core";
import { TabsPage } from "./tabs";
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [TabsPage],
    imports: [RouterModule.forChild(TabsPage)],
    entryComponents: [TabsPage]
})
export class TabsPageModule {

}

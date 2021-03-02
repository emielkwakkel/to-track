import { NgModule } from '@angular/core';
import { IonicPageModule } from '@ionic/angular';
import { PolicyTOCPage } from './toc';

@NgModule({
    declarations: [PolicyTOCPage],
    imports: [RouterModule.forChild(PolicyTOCPage)],
    entryComponents: [PolicyTOCPage],
    exports: [PolicyTOCPage]
})
export class PolicyTOCPageModule {
}

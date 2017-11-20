import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PolicyPrivacyPage } from './privacy';

@NgModule({
    declarations: [PolicyPrivacyPage],
    imports: [IonicPageModule.forChild(PolicyPrivacyPage)],
    entryComponents: [PolicyPrivacyPage],
    exports: [PolicyPrivacyPage]
})
export class PolicyPrivacyPageModule {
}

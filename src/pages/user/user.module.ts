import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserPage } from './user';
import { SharedModule } from '../../shared/shared.module';
import { AppVersion } from '@ionic-native/app-version';
import { PolicyPrivacyPageModule } from '../policy/privacy/privacy.module';

@NgModule({
    declarations: [UserPage],
    imports: [IonicPageModule.forChild(UserPage), SharedModule, PolicyPrivacyPageModule],
    entryComponents: [UserPage],
    providers: [AppVersion]
})
export class UserPageModule {
}

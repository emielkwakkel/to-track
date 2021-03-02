import { NgModule } from '@angular/core';
import { IonicPageModule } from '@ionic/angular';
import { UserPage } from './user';
import { SharedModule } from '../../shared/shared.module';
import { AppVersion } from '@ionic-native/app-version';

@NgModule({
    declarations: [UserPage],
    imports: [RouterModule.forChild(UserPage), SharedModule],
    entryComponents: [UserPage],
    providers: [AppVersion]
})
export class UserPageModule {
}

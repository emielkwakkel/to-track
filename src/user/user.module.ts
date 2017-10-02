import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserPage } from './user';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [UserPage],
    imports: [IonicPageModule.forChild(UserPage), SharedModule],
    entryComponents: [UserPage]
})
export class UserPageModule {
}

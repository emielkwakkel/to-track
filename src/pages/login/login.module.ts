import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicPageModule } from 'ionic-angular';
import { OverviewPage } from './overview/overview';

@NgModule({
    declarations: [ OverviewPage ],
    imports: [
      IonicPageModule.forChild(OverviewPage),
      FormsModule
    ],
    entryComponents: [ OverviewPage ]
})
export class LoginModule {
}

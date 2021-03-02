import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicPageModule } from '@ionic/angular';
import { HourListPage } from './list/hour-list';
import { HourService } from './hour.service';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    declarations: [ HourListPage ],
    imports: [
      RouterModule.forChild(HourListPage),
      FormsModule,
      SharedModule
    ],
    entryComponents: [ HourListPage ],
    providers: [ HourService ],
    exports: [ HourService ]
})
export class HourPageModule {
}

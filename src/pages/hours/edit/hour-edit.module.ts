import {NgModule} from '@angular/core';
import {IonicPageModule} from '@ionic/angular';
import {HourEditPage} from './hour-edit';
import {CompanyService} from '../../company/company.service';
import {HourService} from '../hour.service';

@NgModule({
  declarations: [HourEditPage],
  imports: [RouterModule.forChild(HourEditPage)],
  entryComponents: [HourEditPage],
  providers: [HourService, CompanyService]
})
export class HourEditPageModule {
}

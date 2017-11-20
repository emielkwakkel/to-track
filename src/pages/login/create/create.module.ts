import { NgModule } from '@angular/core';
import { CreatePage } from './create';
import { IonicPageModule } from 'ionic-angular';
import { PolicyPrivacyPageModule } from '../../policy/privacy/privacy.module';

@NgModule({
  declarations: [CreatePage],
  imports: [IonicPageModule.forChild(CreatePage), PolicyPrivacyPageModule],
  entryComponents: [CreatePage]
})
export class CreatePageModule {}

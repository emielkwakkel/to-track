import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SharedLocation } from './location/location';

@NgModule({
  declarations: [ SharedLocation ],
  imports: [ IonicPageModule ],
  entryComponents: [ SharedLocation ],
  exports: [ SharedLocation ]
})
export class SharedModule {}

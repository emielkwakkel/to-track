import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { SharedLocation } from './location/location';

@NgModule({
  declarations: [ SharedLocation ],
  imports: [ IonicPageModule ],
  entryComponents: [ SharedLocation ],
  exports: [ SharedLocation ],
  providers: [Geolocation]
})
export class SharedModule {}

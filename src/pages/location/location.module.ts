import { NgModule } from '@angular/core';
import { LocationPage } from './location';
import { Geolocation } from '@ionic-native/geolocation';
import { IonicPageModule } from 'ionic-angular';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    declarations: [LocationPage],
    imports: [IonicPageModule.forChild(LocationPage), SharedModule],
    entryComponents: [LocationPage],
    providers: [Geolocation]
})
export class LocationPageModule {
}

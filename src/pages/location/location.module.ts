import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocationPage } from './location';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    declarations: [LocationPage],
    imports: [IonicPageModule.forChild(LocationPage), SharedModule],
    entryComponents: [LocationPage]
})
export class LocationPageModule {
}

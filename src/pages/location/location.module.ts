import { NgModule } from '@angular/core';
import { LocationPage } from './location';
import { IonicPageModule } from 'ionic-angular';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    declarations: [LocationPage],
    imports: [IonicPageModule.forChild(LocationPage), SharedModule],
    entryComponents: [LocationPage]
})
export class LocationPageModule {
}

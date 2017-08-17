import { NgModule } from "@angular/core";
import { LocationPage } from "./location";
import { Geolocation } from "@ionic-native/geolocation";
import { IonicPageModule } from "ionic-angular";

@NgModule({
    declarations: [LocationPage],
    imports: [IonicPageModule.forChild(LocationPage)],
    entryComponents: [LocationPage],
    providers: [Geolocation]
})
export class LocationPageModule {
}

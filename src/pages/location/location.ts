import { Component } from "@angular/core";
import { IonicPage, NavParams } from "ionic-angular";

@IonicPage()
@Component({
    selector: 'page-location',
    templateUrl: 'location.html'
})
export class LocationPage {
    location: any;
    constructor(private navParams: NavParams) {
      this.location = this.navParams.get('location');
    }
}

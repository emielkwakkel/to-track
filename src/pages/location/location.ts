import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { Location } from '../../shared/location/location.model';

@IonicPage()
@Component({
    selector: 'page-location',
    templateUrl: 'location.html'
})
export class LocationPage {
    location: Location;
    constructor(private navParams: NavParams) {
      this.location = this.navParams.get('location');
    }
}

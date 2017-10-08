import { Component, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ToastController, LoadingController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

declare const google;

@Component({
    selector: 'shared-location',
    templateUrl: 'location.html'
})
export class SharedLocation implements AfterViewInit {
    @ViewChild('map') mapElement: ElementRef;
    @Input() location: any;
    circle: any;
    map: any;
    marker: any;
    radius: number;
    loading: any;
    autocomplete: any;

    constructor(
      public navParams: NavParams,
      public geolocation: Geolocation,
      public toastCtrl: ToastController,
      public loadingCtrl: LoadingController) {
        this.radius = 150;
        this.location = navParams.get('location');
        this.loading = loadingCtrl.create({
          content: 'Loading maps...'
        });
    }

    ngAfterViewInit() {
        this.loading.present();
        this.geolocation
            .getCurrentPosition()
            .then(position => this.loadMap(position))
            .catch(error => this.onError(error));
    }

    private presentToast(message: string, duration: number = 2000) {
        let toast = this.toastCtrl.create({
            message,
            duration
        });
        toast.present();
    }

    private loadMap(position) {
        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        let mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true,
            zoomControl: true
        };

        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        let input = document.querySelector('ion-input#search input.text-input');
        this.autocomplete = new google.maps.places.Autocomplete(input);

        google.maps.event.addListener(this.autocomplete, 'place_changed', () => this.placeChangedEvent());
        google.maps.event.addListener(this.map, 'click', event => this.mapClickedEvent(event));

        this.loading.dismiss();
    }

    private placeChangedEvent() {
       // retrieve the place object for your use
       let place = this.autocomplete.getPlace();
       this.map.setCenter(place.geometry.location);
       this.addMarker(place.geometry.location);
     }

     private mapClickedEvent(event) {
        this.addMarker(event.latLng);
     }

    private onError(error) {
        this.presentToast(`Error loading maps: ${error}`);
    }


    public addMarker(latLng = this.map.getCenter()) {
        if (this.marker) {
          this.marker.setPosition(latLng);
          this.circle.setCenter(latLng);
        } else {
          this.marker = new google.maps.Marker({
              map: this.map,
              draggable: true,
              animation: google.maps.Animation.DROP,
              position: latLng
          });

          this.circle = new google.maps.Circle({
              strokeColor: '#FF0000',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#FF0000',
              fillOpacity: 0.35,
              map: this.map,
              center: this.marker.getPosition(),
              radius: this.radius
          });
        }


        this.geocodePosition(this.marker.getPosition());

        google.maps.event.addListener(this.marker, 'dragend', () => {
            this.geocodePosition(this.marker.getPosition());
            this.circle.setCenter(this.marker.getPosition())
        });

        const content = '<h4>Information!</h4>';

        this.addInfoWindow(this.marker, content);
    }

    public setCircleRadius(radius) {
        if (this.circle) {
            this.circle.setRadius(radius);
        }
    }

    /**
     * Removes marker and circle from the map and empty the Objects.
     */
    public removeMarker() {
        this.marker.setMap(null);
        this.circle.setMap(null);
        this.marker = null;
        this.circle = null;
    }

    public geocodePosition(latLng) {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode(
          { latLng },
          (results, status) => this.handleGeocodeResults(results, status)
        );
    }

    private handleGeocodeResults(results, status) {
      // Center the map to the new location
      this.map.panTo(results[0].geometry.location);

      // Check status of Geocoding
      if (status == google.maps.GeocoderStatus.OK) {
        this.presentToast(`Address: ${results[0].formatted_address}`);
        return results[0].formatted_address;
      }
      else {
        this.presentToast(`Cannot determine address at this location, reason: ${status}`);
      }
    }

    private addInfoWindow(marker, content) {
        let infoWindow = new google.maps.InfoWindow({
            content: content
        });

        google.maps.event.addListener(marker, 'click', () => {
            infoWindow.open(this.map, marker);
        });
    }

    arePointsNear(checkPoint, centerPoint, meters) {
        const ky = 40000 / 360;
        const kx = Math.cos(Math.PI * centerPoint.lat / 180.0) * ky;
        const dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
        const dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
        return Math.sqrt(dx * dx + dy * dy) <= (meters / 1000);
    }
}

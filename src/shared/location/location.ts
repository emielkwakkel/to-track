import { Component, Input, ElementRef, ViewChild, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { ToastController, LoadingController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Location } from './location.model';

declare const google;

@Component({
    selector: 'shared-location',
    templateUrl: 'location.html'
})
export class SharedLocation implements AfterViewInit {
    @ViewChild('map') mapElement: ElementRef;
    @Input() location: Location;
    @Output() change = new EventEmitter();
    circle: any;
    map: any;
    marker: any;
    loading: any;
    autocomplete: any;
    searchInput: string;

    constructor(
      public geolocation: Geolocation,
      public toastCtrl: ToastController,
      public loadingCtrl: LoadingController) {
        this.loading = loadingCtrl.create({
          content: 'Loading maps...'
        });
    }

    ngAfterViewInit() {
        // Show loading spinner
        this.loading.present();

        // Get current position and load the map
        if (this.location && this.location.lat && this.location.long) {
          this.loadMap(
            this.location.lat,
            this.location.long
          )
        } else {
          this.geolocation
              .getCurrentPosition()
              .then(position => this.loadMap(position.coords.latitude, position.coords.longitude))
              .catch(error => this.onError(error));
        }
    }

    /*
    * Load map creates a new Google map and autocomplete functionality.
    */
    private loadMap(lat, long) {
        // Convert Ionic position to Google Maps latitude / longitude
        const latLng = new google.maps.LatLng(lat, long);

        // Set generic Google Maps options
        const mapOptions = this.getMapOptions(latLng);

        // Create new Google Map
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

        // Add marker to the supplied position
        this.setMarker(latLng)

        // Add autocomplete functionality to the search input
        this.initAutocomplete();

        // Loading of map is finished, dismiss loading spinner.
        this.loading.dismiss();
    }

    private initAutocomplete() {
      // Get input element
      let input = document.querySelector('ion-input#search input.text-input');

      // Use Google maps places library to add autocomplete
      this.autocomplete = new google.maps.places.Autocomplete(input);

      // Bind results of autocomplete to the created Google Map
      this.autocomplete.bindTo('bounds', this.map);

      // Add event listener, which triggers after place is changed.
      google.maps.event.addListener(this.autocomplete, 'place_changed', () => this.placeChangedEvent());
    }

    private placeChangedEvent() {
       // retrieve the place object for your use
       let place = this.autocomplete.getPlace();
       if (place) {
         // Center the map on the place
         this.map.setCenter(place.geometry.location);

         // Add a marker
         this.setMarker(place.geometry.location);
       } else {
         this.presentToast(`Select a location.`);
       }
     }

    private onError(error) {
        this.presentToast(`Error loading maps: ${error}`);
    }

    /**
    * If no specific location is specified set the marker to the center of the map.
    */
    public setMarker(latLng = this.map.getCenter()) {
        // If marker is already added overwrite the position.
        if (this.marker) {
          this.marker.setPosition(latLng);
          this.circle.setCenter(latLng);
        } else {
          // Add new marker
          this.marker = new google.maps.Marker(
            this.getMarkerOptions(this.map, latLng)
          );

          // Draw radius around the marker
          this.circle = new google.maps.Circle(
            this.getCircleOptions(this.map, this.marker.getPosition(), this.location.radius)
          );
        }

        // Get the location data from the position.
        this.geocodePosition(this.marker.getPosition());

        // Add listener to handle dragging markers.
        google.maps.event.addListener(this.marker, 'dragend', () => {
            // If marker is dragged geocode position again
            this.geocodePosition(this.marker.getPosition());

            // Draw circle around the new marker location.
            this.circle.setCenter(this.marker.getPosition())
        });
    }

    public setCircleRadius(radius) {
        this.location.radius = radius;
        this.change.emit(this.location);
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
        // Set location
        this.location = {
          address: results[0].formatted_address,
          lat: results[0].geometry.location.lat(),
          long: results[0].geometry.location.lng(),
          radius: this.circle.getRadius()
        }

        // Emit location to the parent component.
        this.change.emit(this.location);

        // Display geocoded address in toast and input field.
        this.presentToast(`Address: ${results[0].formatted_address}`);
        this.searchInput = results[0].formatted_address;

        return this.location;
      }

      return this.presentToast(`Cannot determine address at this location, reason: ${status}`);
    }

    private getMarkerOptions(map, position) {
      return {
          map,
          position,
          draggable: true,
          animation: google.maps.Animation.DROP
      }
    }

    private getCircleOptions(map, center, radius) {
      return {
          map,
          center,
          radius,
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#FF0000',
          fillOpacity: 0.35
      }
    }

    private getMapOptions(center: object) {
      return {
          center,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          disableDefaultUI: true,
          zoomControl: true
      }
    }

    public arePointsNear(checkPoint, centerPoint, meters) {
        const ky = 40000 / 360;
        const kx = Math.cos(Math.PI * centerPoint.lat / 180.0) * ky;
        const dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
        const dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
        return Math.sqrt(dx * dx + dy * dy) <= (meters / 1000);
    }

    private presentToast(message: string, duration: number = 2000) {
        this.toastCtrl
          .create({ message, duration })
          .present();
    }
}

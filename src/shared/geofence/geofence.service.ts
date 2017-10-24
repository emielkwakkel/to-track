import { Injectable } from '@angular/core';
import { Geofence } from '@ionic-native/geofence';

@Injectable()
export class GeofenceService {
  constructor(private geofence: Geofence) {
    geofence
      .initialize()
      .then(
        () => console.log('Geofence Plugin Ready'),
        (error) => console.log(error)
      );
  }

  public addGeofence(id: string, latitude: number, longitude: number, radius: number, name: string) {
    //options describing geofence
    let fence = {
      id,
      latitude,
      longitude,
      radius,
      transitionType: 3, // Both enter and leave
      notification: {
        id: id + '_notification',
        title: `You entered or left ${name}`,
        text: 'Time will start or stop recording',
        openAppOnClick: true
      }
    }

    this.geofence.addOrUpdate(fence).then(
       () => console.log('Geofence added'),
       (err) => console.log('Geofence failed to add')
     );
  }
}

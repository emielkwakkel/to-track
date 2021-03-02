import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonApp } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';

// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { firebaseConfig } from '../firebase.config';

// Providers
import { Geofence } from '@ionic-native/geofence';
import { AuthenticationService } from '../shared/user/authentication.service';
import { UserService } from "../shared/user/user.service";

@NgModule({
    declarations: [
        MyApp
    ],
    imports: [
        BrowserModule,
        // IonicModule.forRoot(MyApp, {
        //     preloadModules: true
        // }),
        IonicStorageModule.forRoot(),
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireDatabaseModule,
        AngularFireAuthModule
    ],
    bootstrap: [IonApp],
    entryComponents: [
        MyApp
    ],
    providers: [
        // { provide: ErrorHandler, useClass: IonicErrorHandler },
        AuthenticationService,
        UserService,
        Geofence
    ]
})
export class AppModule {
}

import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AgmCoreModule } from '@agm/core';

// Http import
import { HttpModule } from '@angular/http';

// Page imports
import { HomePage } from '../pages/home/home.component';
import { TabsPage } from '../pages/tabs/tabs.component';
import { WeatherDetails } from '../pages/weather-details/weather-details.component';

// Component imports
import { LineDiagram } from '../pages/line-diagram/line-diagram.component';

// Service imports
import { WeatherApi } from '../services/weather-api.service';

// Native imports
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { LocationAccuracy } from '@ionic-native/location-accuracy';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    WeatherDetails,
    LineDiagram
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDp3qy7o0H83g6ZzqdPSAOgPUmWUrsOlYM'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp, 
    HomePage,
    TabsPage,
    WeatherDetails,
    LineDiagram
  ],
  providers: [
    StatusBar,
    SplashScreen,
    WeatherApi,
    HttpModule,
    Geolocation,
    NativeGeocoder,
    LocationAccuracy,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
    

  ]
})
export class AppModule {}

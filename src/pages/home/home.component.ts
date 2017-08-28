import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { ChangeDetectorRef } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';

// Pages impport
import { WeatherDetails } from '../../pages/weather-details/weather-details.component';
import { defaultDiacriticsRemovalMap } from '../../config/default';

// Service import
import { WeatherApi } from '../../services/service';

declare var google: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.component.html',
  providers: [Http]
})
export class HomePage {
  forecasts: any;
  city: string;
  temp: number;
  lat: any;
  long: any;
  currentCity: string;


  constructor(public navCtrl: NavController,public params: NavParams,private weatherApi: WeatherApi, 
    public toaster: ToastController, public geolocation: Geolocation, public geocoder: NativeGeocoder, public ref: ChangeDetectorRef){}

  ionViewDidLoad() {
    this.geolocate();  
  }

  geolocate() {
    let options = {
      enableHighAccuracy: true
    };
    
      this.geolocation.getCurrentPosition(options).then((position: Geoposition) => {
      this.lat = position.coords.latitude;
      this.long = position.coords.longitude;
      let geocoder = new google.maps.Geocoder();
      let latlng = new google.maps.LatLng(this.lat, this.long);
      let request = {
        latLng: latlng
      };   
      geocoder.geocode(request, (results, status) => {     
          if (status == google.maps.GeocoderStatus.OK) {
            if (results[0] != null) {
              let city = results[0].address_components[results[0].address_components.length-4].short_name;                      
              this.currentCity = this.removeDiacritics(city);
              this.getCityWeather(this.currentCity);    
            
            } else {
              alert("No address available");
            }
          }
      });
        
    }).catch((err) => {
      alert(err);
    })
    
  }
  getCityWeather(city) {
    this.weatherApi.getWeather(this.currentCity).then(data => {
      this.forecasts = data;
      this.temp = this.forecasts.current.temp_c;
      this.ref.detectChanges();
      
    });
  }

  removeDiacritics(str) {
    for(var i=0; i<defaultDiacriticsRemovalMap.length; i++) {
        str = str.replace(defaultDiacriticsRemovalMap[i].letters, defaultDiacriticsRemovalMap[i].base);
    }
    return str;
}

  cardTapped($event, forecasts) {
    this.navCtrl.push(WeatherDetails, forecasts);
  }

}

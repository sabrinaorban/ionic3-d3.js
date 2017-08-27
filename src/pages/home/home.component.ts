import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

// Pages impport
import { WeatherDetails } from '../../pages/weather-details/weather-details.component';

// Service import
import { WeatherApi } from '../../services/service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.component.html',
  providers: [Http]
})
export class HomePage {
  forecasts: any;
  city: string;
  temp: number;

  constructor(public navCtrl: NavController,public params: NavParams,private weatherApi: WeatherApi){}

  ionViewDidLoad() {
    this.weatherApi.getWeather().then(data => {
      this.forecasts = data
      this.city = this.forecasts.location.name;
      this.temp = this.forecasts.current.temp_c;
      
    });
  }
  
  cardTapped($event, forecasts) {
    this.navCtrl.push(WeatherDetails, forecasts);
  }

}

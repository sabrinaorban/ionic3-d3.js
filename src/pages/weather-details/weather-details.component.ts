import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
    selector: 'weather-details',
    templateUrl: 'weather-details.component.html'
})
export class WeatherDetails {

  forecast: any;
    
  constructor(public navCtrl: NavController, private navParams:NavParams) {
      this.forecast = this.navParams.data;
  }

   ionViewDidLoad() {}
}



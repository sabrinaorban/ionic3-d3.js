import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { config } from '../config/default';

@Injectable()
export class WeatherApi {

  constructor(private http: Http) {}

  getWeather(city){
    return new Promise(resolve => {
        this.http.get('http://api.apixu.com/v1/forecast.json?key='+ config.weatherApiKey + '&q=' + city)
          .subscribe(res => {
            resolve(res.json())
          });
    });
  }

}



// src/app/components/city-search/city-search.component.ts
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map, switchMap } from 'rxjs/operators';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.scss'],
})
export class CitySearchComponent implements OnInit {
  cityControl = new FormControl();
  filteredCities: Observable<string[]>;
  weatherData: any;
  geolocationData: any;

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.filteredCities = this.cityControl.valueChanges.pipe(
      startWith(''),
      switchMap(value => this.weatherService.getCities(value))
    );

    this.getGeolocation();
  }

  displayFn(city: any): string {
    return city ? city.value : '';
  }

  getWeather(city: any) {
    this.weatherService.getWeather(city.value).subscribe(data => {
      this.weatherData = data;
    });
  }

  getGeolocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.geolocationData = position;
        // You can use the position.coords.latitude and position.coords.longitude to get weather for user's location
      });
    }
  }
}

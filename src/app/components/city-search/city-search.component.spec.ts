import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { WeatherService } from '../../services/weather.service';

declare const ymaps: any;

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.scss'],
})
export class CitySearchComponent implements OnInit, AfterViewInit {
  cityControl = new FormControl();
  filteredCities: Observable<any[]>;
  weatherData: any;
  currentLocationWeather: any;
  map: any;

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.filteredCities = this.cityControl.valueChanges.pipe(
      startWith(''),
      switchMap((value) => this.weatherService.getCities(value))
    );

    // Get user's current location weather
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const coords = position.coords;
        this.weatherService
          .getWeatherByCoords(coords.latitude, coords.longitude)
          .subscribe((data) => {
            this.currentLocationWeather = {
              ...data,
              latitude: coords.latitude,
              longitude: coords.longitude
            };
            this.loadMap(coords.latitude, coords.longitude);
          });
      });
    }

    // Load Yandex Map script
    this.loadYandexMapScript();
  }

  ngAfterViewInit(): void {
    // Initialization moved to ngOnInit to avoid issues with async script loading
  }

  loadYandexMapScript() {
    if (document.getElementById('yandex-map-script')) {
      return;
    }
    const script = document.createElement('script');
    script.id = 'yandex-map-script';
    script.src = 'https://api-maps.yandex.ru/2.1/?apikey=6dbb81e1-fd3a-4232-b8fc-991ae00b8749&lang=ru_RU';  // Укажите ваш API ключ
    script.onload = () => ymaps.ready(this.initMap.bind(this));
    document.head.appendChild(script);
  }

  onCitySelected(city: string) {
    this.weatherService.getWeather(city).subscribe((data) => {
      this.weatherData = data;
    });
  }

  initializeMap(lat: number, lon: number) {
    if (this.map) {
      this.map.setCenter([lat, lon]);
      return;
    }
    this.map = new ymaps.Map('map', {
      center: [lat, lon],
      zoom: 10,
    });
    const placemark = new ymaps.Placemark([lat, lon], {}, {
      preset: 'islands#icon',
      iconColor: '#0095b6',
    });
    this.map.geoObjects.add(placemark);
  }

  initMap() {
    if (this.currentLocationWeather) {
      this.initializeMap(this.currentLocationWeather.latitude, this.currentLocationWeather.longitude);
    }
  }

  loadMap(lat: number, lon: number) {
    if (typeof ymaps !== 'undefined' && ymaps.Map) {
      this.initializeMap(lat, lon);
    } else {
      setTimeout(() => this.loadMap(lat, lon), 1000);
    }
  }
}

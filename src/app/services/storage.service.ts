import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private dadataUrl = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';
  private openWeatherMapUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private dadataToken = '0f09d0e0573c5748e00d4716fdaeb0f4e7c7f192';
  private openWeatherMapKey = '56b30cb255.3443075';

  constructor(private http: HttpClient) {}

  getCities(query: string): Observable<any> {
    const headers = { Authorization: `Token ${this.dadataToken}` };
    return this.http.post(this.dadataUrl, { query }, { headers }).pipe(map((res: any) => res.suggestions));
  }

  getWeather(city: string): Observable<any> {
    return this.http.get(`${this.openWeatherMapUrl}?q=${city}&appid=${this.openWeatherMapKey}&units=metric`).pipe(
      map((data: any) => ({
        temperature: data.main.temp,
        humidity: data.main.humidity,
        wind: data.wind.speed,
        city: data.name,
      }))
    );
  }

  getWeatherByCoords(lat: number, lon: number): Observable<any> {
    return this.http.get(`${this.openWeatherMapUrl}?lat=${lat}&lon=${lon}&appid=${this.openWeatherMapKey}&units=metric`).pipe(
      map((data: any) => ({
        temperature: data.main.temp,
        humidity: data.main.humidity,
        wind: data.wind.speed,
        city: data.name,
        latitude: lat,
        longitude: lon,
      }))
    );
  }
}

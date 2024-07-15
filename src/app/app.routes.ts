import { Routes } from '@angular/router';
import { CitySearchComponent } from './components/city-search/city-search.component';
import { WeatherDisplayComponent } from './components/weather-display/weather-display.component';

export const routes: Routes = [
  { path: '', component: CitySearchComponent },
  { path: 'weather', component: WeatherDisplayComponent }
];

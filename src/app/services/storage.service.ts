import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storageKey = 'savedCities';

  saveCity(city: string): void {
    const cities = this.getSavedCities();
    if (!cities.includes(city)) {
      cities.push(city);
      localStorage.setItem(this.storageKey, JSON.stringify(cities));
    }
  }

  getSavedCities(): string[] {
    const cities = localStorage.getItem(this.storageKey);
    return cities ? JSON.parse(cities) : [];
  }
}

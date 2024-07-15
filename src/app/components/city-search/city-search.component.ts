import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.scss'] // Изменено с .css на .scss
})
export class CitySearchComponent implements OnInit {
  cityControl = new FormControl();
  filteredCities: Observable<string[]>;

  cities: string[] = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];

  ngOnInit() {
    this.filteredCities = this.cityControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.cities.filter(city => city.toLowerCase().includes(filterValue));
  }
}

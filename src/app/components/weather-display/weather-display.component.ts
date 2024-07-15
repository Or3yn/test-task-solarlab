import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-weather-display',
  templateUrl: './weather-display.component.html',
  styleUrls: ['./weather-display.component.scss'],
  standalone: true,
  imports: [NgIf]
})
export class WeatherDisplayComponent {
  @Input() weatherData: any;
}

import { Component, Input } from '@angular/core';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-table',
  standalone: false,

  templateUrl: './country-table.component.html',
  styles: `
    img {
      width: 25px;
      margin-right: 10px;
    }`
})
export class CountryTableComponent {
  @Input()
  public isLoading: boolean = false;

  @Input()
  public countries: Country[] = [];
}

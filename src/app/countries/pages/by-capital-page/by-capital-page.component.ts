import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'country-by-capital-page',
  standalone: false,

  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent implements OnInit{
  public countries: Country[] = []
  public initialValue: string = ''

  public isLoading: boolean = false

  constructor(private countriesService: CountriesService) { }

  ngOnInit(): void {
    this.countries = this.countriesService.cashStore.byCapital.countries
    this.initialValue = this.countriesService.cashStore.byCapital.term
  }

  searchByCapital(term: string) {

    this.isLoading = true

    this.countriesService.searchCapital(term)
      .subscribe(countries => {
        this.countries = countries
        this.isLoading = false
      });

  }
}

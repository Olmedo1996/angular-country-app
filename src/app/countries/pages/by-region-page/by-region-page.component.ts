import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'app-by-region-page',
  standalone: false,

  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent implements OnInit {
  public countries: Country[] = []
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']
  public selectedRigion?: Region
  public isLoading: boolean = false

  constructor(private countriesService: CountriesService) { }

  ngOnInit(): void {
    this.countries = this.countriesService.cashStore.byRegion.countries
    this.selectedRigion = this.countriesService.cashStore.byRegion.term
  }

  public searchByRegion(term: Region) {
    this.isLoading = true
    this.selectedRigion = term

    this.countriesService.searchRegion(term)
      .subscribe(countries => {
        this.countries = countries
        this.isLoading = false
      }
    )
  }
}

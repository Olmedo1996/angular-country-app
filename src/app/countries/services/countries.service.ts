import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, map, Observable, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CashStore } from '../interfaces/cash-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({ providedIn: 'root' })
export class CountriesService {

  private apiUrl = 'https://restcountries.com/v3.1/';
  public cashStore: CashStore = {
    byCapital: {
      term: '',
      countries: []
    },
    byCountry: {
      term: '',
      countries: []
    },
    byRegion: {
      term: '',
      countries: []
    },
  }

  constructor(private httpClient: HttpClient) {
    this.loadFromLocalStorage()
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('cashStore', JSON.stringify(this.cashStore))
  }

  private loadFromLocalStorage(): void {
    let cashStore = localStorage.getItem('cashStore')
    if (!cashStore) return;
    this.cashStore = JSON.parse(cashStore)
  }

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.httpClient.get<Country[]>(url)
      .pipe(
        catchError(_ => of([]))
        // ,
        // delay(200)
      );
  }


  searchCountryByAlphaCode(code: string): Observable<Country | null> {
    const url = `${this.apiUrl}alpha/${code}`
    return this.httpClient.get<Country[]>(url)
      .pipe(
        map((country) => country[0] || null),
        catchError(_ => of(null))
      );
  }

  searchCapital(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}capital/${term}`

    return this.getCountriesRequest(url)
      .pipe(
        tap(countries =>
          this.cashStore.byCapital = { term, countries }
        ),
        tap(
          () => this.saveToLocalStorage()
        )
      );
  }

  searchCountry(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}name/${term}`

    return this.getCountriesRequest(url)
      .pipe(
        tap(countries =>
          this.cashStore.byCountry = { term, countries }
        ),
        tap(
          () => this.saveToLocalStorage()
        )
      );
  }

  searchRegion(term: Region): Observable<Country[]> {
    const url = `${this.apiUrl}region/${term}`

    return this.getCountriesRequest(url)
      .pipe(
        tap(countries =>
          this.cashStore.byRegion = { term, countries }
        ),
        tap(
          () => this.saveToLocalStorage()
        )
      );
  }
}

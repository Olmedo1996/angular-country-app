import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, map, Observable, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl = 'https://restcountries.com/v3.1/';

  constructor(private httpClient: HttpClient) { }

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.httpClient.get<Country[]>(url)
      .pipe(
        catchError(_ => of([])),
        delay(1000)
      );
  }


  searchCountryByAlphaCode(code: string):Observable<Country | null> {
    const url = `${this.apiUrl}alpha/${code}`
    return this.httpClient.get<Country[]>(url)
      .pipe(
        map((country) => country[0] || null),
        catchError(_ => of(null))
      );
  }

  searchCapital(term: string):Observable<Country[]> {
    const url = `${this.apiUrl}capital/${term}`

    return this.getCountriesRequest(url);
  }

  searchCountry(term: string):Observable<Country[]> {
    const url = `${this.apiUrl}name/${term}`

    return this.getCountriesRequest(url);
  }

  searchRegion(term: string):Observable<Country[]> {
    const url = `${this.apiUrl}region/${term}`

    return this.getCountriesRequest(url);
  }
}

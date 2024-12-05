import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl = 'https://restcountries.com/v3.1/';

  constructor(private httpClient: HttpClient) { }

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
    return this.httpClient.get<Country[]>(url)
      .pipe(
        catchError(_ => of([]))
      );
  }

  searchCountry(term: string):Observable<Country[]> {
    const url = `${this.apiUrl}name/${term}`
    return this.httpClient.get<Country[]>(url)
      .pipe(
        catchError(_ => of([]))
      );
  }

  searchRegion(term: string):Observable<Country[]> {
    const url = `${this.apiUrl}region/${term}`
    return this.httpClient.get<Country[]>(url)
      .pipe(
        catchError(_ => of([]))
      );
  }
}

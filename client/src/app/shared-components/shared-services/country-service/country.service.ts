import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class CountryService {
  private baseURL = 'https://restcountries.com/v3.1/all';

  constructor(private http: HttpClient) {}

  public getAllCountries(): Observable<any> {
    return this.http.get<any>(this.baseURL);
  }
}

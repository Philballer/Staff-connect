import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProfile, IUserCountry } from 'src/app/User/interfaces/user.interface';
import { IDeleteResponse } from 'src/app/User/services/user.service';

@Injectable()
export class ProfileService {
  private base_URL = 'http://localhost:5500/api/profiles';

  constructor(private http: HttpClient) {}

  public getProfile(id: string): Observable<IProfile> {
    return this.http.get<IProfile>(`${this.base_URL}/${id}`);
  }

  public deleteProfile(id: string): Observable<IDeleteResponse> {
    const delete_URL = `${this.base_URL}/${id}`;
    return this.http.delete<IDeleteResponse>(delete_URL);
  }

  public getUserCountry(country: string): Observable<IUserCountry[]> {
    const URL = `https://restcountries.com/v3.1/name/${country}`;
    return this.http.get<IUserCountry[]>(URL);
  }
}

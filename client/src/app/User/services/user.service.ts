import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/user.interface';
import { Observable } from 'rxjs';

export interface IResponse {
  data: IUser[];
  limit: number;
  total: number;
  found?: number;
}

export interface IDeleteResponse {
  message: string;
  userId: string;
}

@Injectable()
export class UserService {
  private server_URL = 'http://localhost:5000/api/users';

  constructor(private http: HttpClient) {}

  public getAllUsers(page: number): Observable<IResponse> {
    const paginationURl = `${this.server_URL}?page=${page}`;
    return this.http.get<IResponse>(paginationURl);
  }

  public searchUser(query: string): Observable<IResponse> {
    const searchURL = `${this.server_URL}?keyword=${query}`;
    return this.http.get<IResponse>(searchURL);
  }

  public createUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(this.server_URL, user);
  }

  public updateUser(user: IUser, userId: string): Observable<IUser> {
    const put_URL = `${this.server_URL}/${userId}`;
    return this.http.put<IUser>(put_URL, user);
  }

  public deleteUser(userId: string): Observable<IDeleteResponse> {
    const deleteUrl = `${this.server_URL}/${userId}`;
    return this.http.delete<IDeleteResponse>(deleteUrl);
  }
}

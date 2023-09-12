import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/user.interface';
import { Observable } from 'rxjs';

interface IResponse {
  limit: number;
  total: number;
  data: IUser[];
}

interface IDeleteResponse {
  message: string;
  userId: string;
}

@Injectable()
export class UserService {
  private server_URL = 'http://localhost:5000/users';

  constructor(private http: HttpClient) {}

  public getAllUsers(): Observable<IResponse> {
    return this.http.get<IResponse>(this.server_URL);
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

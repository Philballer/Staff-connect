import { Inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Observable, of } from 'rxjs';

// const getTitle = (route: ActivatedRouteSnapshot): Observable<string> {

// }

export const titleResolver: ResolveFn<string> = (
  route: ActivatedRouteSnapshot
) => {
  console.log('resolver activated', route);
  return of('New Title');
};

export enum TitleEnum {
  Home = 'Staff Connect - Home',
  About = 'Staff Connect - About',
  NotFound = 'Staff Connect - Error 404 Page not found',
  Search = 'Staff Connect - Search',
  Login = 'Staff Connect - login or sing up',
}

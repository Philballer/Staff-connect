import { Component, Input, OnInit } from '@angular/core';
import { IProfile, IUser } from 'src/app/User/interfaces/user.interface';
import { Observable, of } from 'rxjs';
import {
  IDateDisplayer,
  formatDate,
} from 'src/app/shared-components/helpers/date-displayer';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css'],
})
export class PersonalInfoComponent implements OnInit {
  @Input()
  public profile: IProfile;

  @Input()
  public user$: Observable<IUser>;

  @Input()
  public userDetails: IUser;

  @Input()
  public isProfileLoading: boolean = false;

  @Input()
  public isUserDetailsLoading: boolean = false;

  public ageDetails: IDateDisplayer;

  public ngOnInit(): void {
    this.user$.subscribe((data) => {
      if (data) {
        this.userDetails = data;
        this.ageDetails = formatDate(data.birthday);
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProfileState } from '../../store/reducer';
import {
  selectCountryDetails,
  selectLoading,
  selectProfileData,
} from '../../store/selectors';
import { Observable } from 'rxjs';
import {
  IProfile,
  IUser,
  IUserCountry,
} from 'src/app/User/interfaces/user.interface';
import { LoadProfile, LoadUSerCountry } from '../../store/actions';
import { ActivatedRoute } from '@angular/router';
import { UserState } from 'src/app/User/store/reducer';
import {
  selectActiveProfileUserDetails,
  selectUserLoading,
} from 'src/app/User/store/selectors';
import { GetOneUser } from 'src/app/User/store/actions';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-profile-container',
  templateUrl: './profile-container.component.html',
  styleUrls: ['./profile-container.component.css'],
})
export class ProfileContainerComponent implements OnInit {
  public profile: IProfile;

  public userDetails$: Observable<IUser>;

  public loading$: Observable<boolean>;

  public userDetailsLoading$: Observable<boolean>;

  public userCountryDetails$: Observable<IUserCountry>;

  constructor(
    private profileStore: Store<{ profile: ProfileState }>,
    private userStore: Store<{ userDetails: UserState }>,
    private location: Location,
    private route: ActivatedRoute,
    private titleService: Title
  ) {
    this.profileStore.select(selectProfileData).subscribe((data: IProfile) => {
      this.profile = data;
      if (data) {
        this.userStore.dispatch(new GetOneUser(data.userID));
      }
    });
    this.userStore.select(selectActiveProfileUserDetails).subscribe((data) => {
      if (data) {
        this.userStore.dispatch(
          LoadUSerCountry({ countryName: data.nationality })
        );
        this.titleService.setTitle(
          `Profile - ${data.firstName} ${data.lastName} `
        );
      }
    });
    this.loading$ = this.profileStore.select(selectLoading);
    this.userDetails$ = this.userStore.select(selectActiveProfileUserDetails);
    this.userCountryDetails$ = this.profileStore.select(selectCountryDetails);
    this.userDetailsLoading$ = this.userStore.select(selectUserLoading);
    // pass the the data passed from the navigation to my user variable
  }

  public ngOnInit(): void {
    const profileID = this.route.snapshot.paramMap.get('id');
    this.profileStore.dispatch(LoadProfile({ id: profileID }));
  }

  public onFriendButtonClick(event: any): void {
    console.log(event);
  }

  public onGoBackClick(): void {
    this.location.back();
  }
}

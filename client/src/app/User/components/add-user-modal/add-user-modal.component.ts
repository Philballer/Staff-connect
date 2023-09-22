import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserListContainerComponent } from '../containers/user-list-container/user-list-container.component';
import { IUser } from '../../interfaces/user.interface';
import { SubscriptionList } from 'src/app/shared-components/subscription-list/subscription-list';
import { CountryService } from 'src/app/shared-components/shared-services/country-service/country.service';
import { Store } from '@ngrx/store';
import { UserState } from '../../store/reducer';
import * as fromActions from '../../store/actions';

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.css'],
})
export class AddUserModalComponent implements OnInit, OnDestroy {
  private subscriptions: SubscriptionList = new SubscriptionList();

  public userData: IUser = {} as IUser;

  public countries = [];

  public selected: boolean = true;

  public genderSelected: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<UserListContainerComponent>,
    private countryService: CountryService,
    private store: Store<{ users: UserState }>
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(this.store.select('users').subscribe());

    this.subscriptions.add(
      this.countryService.getAllCountries().subscribe(
        (data) =>
          (this.countries = data.sort((a: any, b: any) => {
            let fa = a.name.common.toLowerCase();
            let fb = b.name.common.toLowerCase();
            if (fa < fb) {
              return -1;
            }
            if (fa > fb) {
              return 1;
            }
            return 0;
          }))
      )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public onClose(): void {
    this.dialogRef.close();
  }

  public submitForm(): void {
    const newUserForm: IUser = {
      ...this.userData,
      birthday: new Date(this.userData.birthday),
    };
    this.store.dispatch(new fromActions.CreateUser(newUserForm));
    this.dialogRef.close();
  }

  //todo: would have to check this part later
  public disableSelectOption() {
    this.selected = false;
    this.genderSelected = true;
  }
}

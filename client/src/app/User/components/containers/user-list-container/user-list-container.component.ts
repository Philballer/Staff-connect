import { Component, OnInit, OnDestroy } from '@angular/core';
import { IUser } from 'src/app/User/interfaces/user.interface';
import { SubscriptionList } from 'src/app/shared-components/subscription-list/subscription-list';
import { MatDialog } from '@angular/material/dialog';
import { AddUserModalComponent } from '../../add-user-modal/add-user-modal.component';
import { Store } from '@ngrx/store';
import { UserState } from 'src/app/User/store/reducer';
import { DeleteUser, LoadUsers, SearchUser } from 'src/app/User/store/actions';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-list-container',
  templateUrl: './user-list-container.component.html',
  styleUrls: ['./user-list-container.component.css'],
})
export class UserListContainerComponent implements OnInit, OnDestroy {
  public users: IUser[];

  public loading: boolean = false;

  public paginationOccurred: boolean = false;

  public searchValue: string;

  private subscriptionList = new SubscriptionList();

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private store$: Store<{ users: UserState }>
  ) {}

  public ngOnInit(): void {
    this.subscriptionList.add(
      this.store$.select('users').subscribe((res: UserState) => {
        this.users = res.data;
        this.loading = res.loading;
        this.paginationOccurred = res.userPaginated;
      })
    );
    this.store$.dispatch(new LoadUsers());
  }

  public ngOnDestroy(): void {
    this.subscriptionList.unsubscribe();
  }

  public onAddBtnClick(): void {
    const modalProperties = {
      width: '30%',
      data: {},
    };
    const dialogRef = this.dialog.open(AddUserModalComponent, modalProperties);
    dialogRef; //does nothing here
  }

  public onUserListClick(user: IUser): void {
    this.router.navigate([`/profile/${user.profile._id}`], { state: user });
    //passed the user as a state here
  }

  public onUserSearch(searchValue: string): void {
    this.searchValue = searchValue;
    if (searchValue === '' || searchValue.length === 0) {
      this.store$.dispatch(new LoadUsers());
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/home/staff/search'], {
        queryParams: { keyword: searchValue },
      });

      this.store$.dispatch(new SearchUser(searchValue));
    }
  }

  public onDeleteUserClick(user: IUser): void {
    this.store$.dispatch(new DeleteUser(user));
  }

  public reloadUsers(): void {
    //use later to go back to exact location
    // const currentURL = this.location.path();

    this.store$.dispatch(new LoadUsers());
    this.router.navigate(['/home']);
  }
}

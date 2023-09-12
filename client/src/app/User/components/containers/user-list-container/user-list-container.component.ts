import { Component, OnInit, OnDestroy } from '@angular/core';
import { IUser } from 'src/app/User/interfaces/user.interface';
import { SubscriptionList } from 'src/app/shared-components/subscription-list/subscription-list';
import { MatDialog } from '@angular/material/dialog';
import { AddUserModalComponent } from '../../add-user-modal/add-user-modal.component';
import { Store } from '@ngrx/store';
import { UserState } from 'src/app/User/store/reducer';
import { DeleteUser, LoadUsers } from 'src/app/User/store/actions';

@Component({
  selector: 'app-user-list-container',
  templateUrl: './user-list-container.component.html',
  styleUrls: ['./user-list-container.component.css'],
})
export class UserListContainerComponent implements OnInit, OnDestroy {
  public users: IUser[];

  private subscriptionList = new SubscriptionList();

  constructor(
    private dialog: MatDialog,
    private store: Store<{ users: UserState }>
  ) {}

  ngOnInit(): void {
    this.subscriptionList.add(
      this.store.select('users').subscribe((res) => (this.users = res.data))
    );
    this.store.dispatch(new LoadUsers());
  }

  ngOnDestroy(): void {
    this.subscriptionList.unsubscribe();
  }

  public onAddBtnClick(): void {
    const modalProperties = {
      width: '500px',
      data: {},
    };
    const dialogRef = this.dialog.open(AddUserModalComponent, modalProperties);
    dialogRef; //does nothing here
  }

  public onUserListClick(user: IUser): void {
    console.log(user);
  }

  public onDeleteUserClick(user: IUser): void {
    this.store.dispatch(new DeleteUser(user));
  }
}

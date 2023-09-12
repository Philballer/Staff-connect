import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IUser } from '../../interfaces/user.interface';
import { IDatableNode } from '../../interfaces/datatable.interface';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent {
  @Input()
  public users: IUser[];

  @Output()
  private userDelete = new EventEmitter<IUser>();

  @Output()
  private onAdd = new EventEmitter<void>();

  @Output()
  private userClick = new EventEmitter<IUser>();

  public tableHeaders: string[];

  public constructor() {
    this.tableHeaders = ['Name', 'Email', 'Gender', 'DOB', 'Nationality'];
  }

  public onAddUser(): void {
    this.onAdd.emit();
  }

  public onUserClick(user: IUser): void {
    this.userClick.emit(user);
  }

  public onUserDelete(user: IUser): void {
    this.userDelete.emit(user);
  }
}

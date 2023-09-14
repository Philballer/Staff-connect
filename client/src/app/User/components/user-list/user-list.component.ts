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

  @Input()
  public loading: boolean = false;

  @Input()
  public paginationOccurred: boolean = false;

  @Output()
  public userDelete = new EventEmitter<IUser>();

  @Output()
  public onAdd = new EventEmitter<void>();

  @Output()
  public userClick = new EventEmitter<IUser>();

  @Output()
  public userSearch = new EventEmitter<string>();

  @Output()
  public searchbarClosed = new EventEmitter<void>();

  public tableHeaders: string[];

  public showSearchbar: boolean = false;

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

  public onSearch(searchValue: string): void {
    this.userSearch.emit(searchValue);
  }

  public handleSearchbarDisplay(): void {
    this.showSearchbar = !this.showSearchbar;
    if (!this.showSearchbar) this.searchbarClosed.emit();
  }
}

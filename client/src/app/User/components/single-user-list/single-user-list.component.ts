import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IUser } from '../../interfaces/user.interface';

@Component({
  selector: 'app-single-user-list',
  templateUrl: './single-user-list.component.html',
  styleUrls: ['./single-user-list.component.css'],
})
export class SingleUserListComponent implements OnInit {
  @Input()
  public user: IUser;

  public age: number;

  public userReadableBirthday: string;

  @Output()
  private onDelete = new EventEmitter<IUser>();

  @Output()
  private onUserClick = new EventEmitter<IUser>();

  ngOnInit(): void {
    if (this.user.birthday) {
      this.formatDate(this.user.birthday);
    }
  }

  public formatDate(dateString: Date): void {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = new Intl.DateTimeFormat('en', { month: 'long' }).format(date);
    const year = date.getFullYear();

    const daySuffix = this.getDaySuffix(day);

    this.userReadableBirthday = `${day}${daySuffix} ${month} ${year}`;

    this.calculateAge(this.user.birthday);

    this.age = this.calculateAge(this.user.birthday);
  }

  private getDaySuffix(day: number): string {
    if (day >= 11 && day <= 13) {
      return 'th';
    }
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  }

  private calculateAge(birthday: Date): number {
    const birthDate = new Date(birthday);

    const currentDate = new Date();

    let age = currentDate.getFullYear() - birthDate.getFullYear();

    // Adjust age if birth month hasn't occurred yet this year
    if (currentDate.getMonth() < birthDate.getMonth()) {
      age--;
    }
    // Adjust age if it's the birth month but the birth day hasn't occurred yet
    else if (
      currentDate.getMonth() === birthDate.getMonth() &&
      currentDate.getDate() < birthDate.getDate()
    ) {
      age--;
    }

    return age;
  }

  public deleteUser(): void {
    this.onDelete.emit(this.user);
  }

  public userClick(): void {
    this.onUserClick.emit(this.user);
  }
}

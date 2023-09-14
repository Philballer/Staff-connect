import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { IUser } from '../../interfaces/user.interface';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css'],
})
export class DatatableComponent implements OnInit, OnChanges {
  @Input()
  public headers: string[];

  @Input()
  public data: IUser[] = [];

  @Input()
  public dataLoading: boolean = false;

  // stops pagination component from not displaying when the user paginates and data.length < 8
  @Input()
  public navigatedThroughPagination?: boolean = false;

  @Output()
  private onUserClick = new EventEmitter<IUser>();

  @Output()
  private onDelete = new EventEmitter<IUser>();

  public ages: number[] = [];

  public readableBirthdays: string[] = [];

  public componentLoaded: boolean = false;

  public ngOnInit(): void {
    setTimeout(() => {
      this.componentLoaded = true;
    }, 100);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && !changes['data'].firstChange)
      //to make sure data changed
      this.formatDate(this.data);
  }

  public formatDate(users: IUser[]): void {
    users.map((user) => {
      const date = new Date(user.birthday);
      const day = date.getDate();
      const month = new Intl.DateTimeFormat('en', { month: 'long' }).format(
        date
      );
      const year = date.getFullYear();
      const daySuffix = this.getDaySuffix(day);

      this.readableBirthdays.push(`${day}${daySuffix} ${month} ${year}`);
    });

    this.calculateAges(users);
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

  private calculateAges(users: IUser[]): void {
    users.map((user) => {
      const birthDate = new Date(user.birthday);
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

      this.ages.push(age);
    });
  }

  public userClick(user: IUser): void {
    this.onUserClick.emit(user);
  }

  public deleteUser(user: IUser): void {
    this.onDelete.emit(user);
  }
}

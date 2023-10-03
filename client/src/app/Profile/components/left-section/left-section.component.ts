import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { IProfile, IUser } from 'src/app/User/interfaces/user.interface';
import { IDateDisplayer } from 'src/app/shared-components/helpers/date-displayer';

@Component({
  selector: 'app-left-section',
  templateUrl: './left-section.component.html',
  styleUrls: ['./left-section.component.css'],
})
export class LeftSectionComponent implements OnChanges {
  @Input()
  public profile: IProfile;

  @Input()
  public userDetails: IUser;

  @Input()
  public isLoading: boolean = false;

  @Input()
  public detailsLoading: boolean = false;

  @Output()
  public onGoBackClick = new EventEmitter<void>();

  @Output()
  public onFriendButtonClick = new EventEmitter<{
    command: string;
    id: string;
  }>();

  @Output()
  public removeFriend = new EventEmitter<string>();

  public isFriend: boolean = false;

  public profileCreationDay: IDateDisplayer;

  constructor() {}

  public ngOnChanges(changes: SimpleChanges): void {}

  public toggleFriendship(command: string): void {
    this.onFriendButtonClick.emit({ command: command, id: this.profile._id });
    this.isFriend = !this.isFriend;
  }

  public goBack(): void {
    this.onGoBackClick.emit();
  }
}

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IProfile, IUser } from 'src/app/User/interfaces/user.interface';

@Component({
  selector: 'app-left-section',
  templateUrl: './left-section.component.html',
  styleUrls: ['./left-section.component.css'],
})
export class LeftSectionComponent {
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

  constructor() {}

  public toggleFriendship(command: string): void {
    this.onFriendButtonClick.emit({ command: command, id: this.profile._id });
    this.isFriend = !this.isFriend;
  }

  public goBack(): void {
    this.onGoBackClick.emit();
  }
}

import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { IUser } from 'src/app/User/interfaces/user.interface';

@Component({
  selector: 'app-friends-list-thumbnails',
  templateUrl: './friends-list-thumbnails.component.html',
  styleUrls: ['./friends-list-thumbnails.component.css'],
})
export class FriendsListThumbnailsComponent implements OnInit {
  @Input()
  public usersFriends: any[];

  @Input()
  public userDetails: IUser;

  @Input()
  public isLoading: boolean = false;

  @Output()
  public friendClicked = new EventEmitter<string>();

  @Output()
  public addFriendClicked = new EventEmitter<string>();

  @Output()
  public messageFriendClicked = new EventEmitter<string>();

  constructor() {
    this.usersFriends = [
      {
        name: 'Philip Supreme',
        avatar:
          'https://www.langan.com/wp-content/uploads/2020/01/Berroteran-Luis-600x600-1.jpg',
        isFriend: false,
      },
      {
        name: 'Roony Craig',
        avatar:
          'https://medicine.missouri.edu/sites/default/files/styles/square/public/2023-08/Rooney_Craig-16%20600x600.jpg?itok=11QKDpTa',
        isFriend: false,
      },
      {
        name: 'Philip Supreme',
        avatar:
          'https://www.langan.com/wp-content/uploads/2020/01/Berroteran-Luis-600x600-1.jpg',
        isFriend: false,
      },
      {
        name: 'Philip Supreme',
        avatar:
          'https://www.langan.com/wp-content/uploads/2020/01/Berroteran-Luis-600x600-1.jpg',
        isFriend: false,
      },
      {
        name: 'Philip Supreme',
        avatar:
          'https://www.langan.com/wp-content/uploads/2020/01/Berroteran-Luis-600x600-1.jpg',
        isFriend: false,
      },
      {
        name: 'Philip Supreme',
        avatar:
          'https://www.langan.com/wp-content/uploads/2020/01/Berroteran-Luis-600x600-1.jpg',
        isFriend: false,
      },
      // {
      //   name: 'Philip Supreme',
      //   avatar:
      //     'https://www.langan.com/wp-content/uploads/2020/01/Berroteran-Luis-600x600-1.jpg',
      //   isFriend: false,
      // },
      // {
      //   name: 'Philip Supreme',
      //   avatar:
      //     'https://www.langan.com/wp-content/uploads/2020/01/Berroteran-Luis-600x600-1.jpg',
      //   isFriend: false,
      // },
      // {
      //   name: 'Philip Supreme',
      //   avatar:
      //     'https://www.langan.com/wp-content/uploads/2020/01/Berroteran-Luis-600x600-1.jpg',
      //   isFriend: false,
      // },
    ];
  }

  public ngOnInit(): void {}

  public onFriendClick(id: string): void {
    this.friendClicked.emit(id);
  }
  public onAddFriendClick(id: string): void {
    this.addFriendClicked.emit(id);
  }
  public onMessageFriendClick(id: string): void {
    this.messageFriendClicked.emit(id);
  }
}

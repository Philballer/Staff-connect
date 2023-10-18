import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsListThumbnailsComponent } from './friends-list-thumbnails.component';

describe('FriendsListThumbnailsComponent', () => {
  let component: FriendsListThumbnailsComponent;
  let fixture: ComponentFixture<FriendsListThumbnailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FriendsListThumbnailsComponent]
    });
    fixture = TestBed.createComponent(FriendsListThumbnailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { UserListContainerComponent } from './user-list-container.component';
import { UserListComponent } from '../../user-list/user-list.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserState } from 'src/app/User/store/reducer';

describe('UserListContainerComponent', () => {
  let spectator: Spectator<UserListContainerComponent>;
  let store: Store<{ users: UserState }>;

  const create = createComponentFactory({
    component: UserListContainerComponent,
    imports: [MatDialogModule],
    declarations: [],
    providers: [MatDialog, Router, ActivatedRoute],
    shallow: true,
  });

  beforeEach(async () => {
    spectator = create();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

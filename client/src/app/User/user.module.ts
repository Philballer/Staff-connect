import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserListComponent } from './components/user-list/user-list.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { UserListContainerComponent } from './components/containers/user-list-container/user-list-container.component';
import { UserService } from './services/user.service';
import { SingleUserListComponent } from './components/single-user-list/single-user-list.component';
import { AddUserModalComponent } from './components/add-user-modal/add-user-modal.component';
import { DatatableComponent } from './components/datatable/datatable.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from './store/reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/effects';
import { DatatablePaginationComponent } from './components/datatable-pagination/datatable-pagination.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    StoreModule.forFeature('users', reducer),
    EffectsModule.forFeature([UserEffects]),
  ],
  declarations: [
    UserListComponent,
    UserInfoComponent,
    UserListContainerComponent,
    SingleUserListComponent,
    AddUserModalComponent,
    DatatableComponent,
    DatatablePaginationComponent,
  ],
  providers: [UserService],
  exports: [
    UserListComponent,
    UserInfoComponent,
    UserListContainerComponent,
    SingleUserListComponent,
    MatDialogModule,
    AddUserModalComponent,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class UserModule {}

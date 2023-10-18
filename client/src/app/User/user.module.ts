import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedComponentsModule } from '../shared-components/shared-components.module';

import { DatatableComponent } from './components/datatable/datatable.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { UserListContainerComponent } from './components/containers/user-list-container/user-list-container.component';
import { AddUserModalComponent } from './components/add-user-modal/add-user-modal.component';
import { DatatablePaginationComponent } from './components/datatable-pagination/datatable-pagination.component';
import { UserService } from './services/user.service';
import { UserEffects } from './store/effects';
import { reducer } from './store/reducer';

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
    AddUserModalComponent,
    DatatableComponent,
    DatatablePaginationComponent,
  ],
  providers: [UserService],
  exports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    ReactiveFormsModule,
  ],
})
export class UserModule {}

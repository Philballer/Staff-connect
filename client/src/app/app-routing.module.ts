import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListContainerComponent } from './User/components/containers/user-list-container/user-list-container.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: UserListContainerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

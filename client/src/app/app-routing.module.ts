import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListContainerComponent } from './User/components/containers/user-list-container/user-list-container.component';
import { UserListComponent } from './User/components/user-list/user-list.component';
import { AboutComponent } from './shared-components/about/about.component';

const homeChildrenRoutes: Routes = [
  { path: 'staff/search', component: UserListComponent },
  { path: 'staff/page/:page', component: UserListComponent },
];

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: UserListContainerComponent,
    children: [...homeChildrenRoutes],
  },
  { path: 'about', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

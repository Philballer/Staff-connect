import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListContainerComponent } from './User/components/containers/user-list-container/user-list-container.component';
import { UserListComponent } from './User/components/user-list/user-list.component';
import { AboutComponent } from './shared-components/about/about.component';
import { ProfileContainerComponent } from './Profile/components/profile-container/profile-container.component';
import { PageNotFoundComponent } from './shared-components/page-not-found/page-not-found.component';
import { TitleEnum } from './shared-components/title-resolver/title-resolver';
import { AuthRoutingModule } from './Auth/auth-routing.module';

const homeChildrenRoutes: Routes = [
  {
    path: 'staff/search',
    component: UserListComponent,
    title: TitleEnum.Search,
  },
  { path: 'staff/page/:page', component: UserListComponent },
];

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: UserListContainerComponent,
    children: [...homeChildrenRoutes],
    title: TitleEnum.Home,
  },
  { path: 'about', component: AboutComponent, title: TitleEnum.About },
  {
    path: 'profile/:id',
    component: ProfileContainerComponent,
  },
  { path: '**', component: PageNotFoundComponent, title: TitleEnum.NotFound },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), AuthRoutingModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}

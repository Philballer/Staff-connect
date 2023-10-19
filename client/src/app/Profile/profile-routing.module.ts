import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileContainerComponent } from './components/profile-container/profile-container.component';

const routes: Routes = [
  {
    path: 'profile/:id',
    component: ProfileContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { TitleEnum } from '../shared-components/title-resolver/title-resolver';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent, title: TitleEnum.Login },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}

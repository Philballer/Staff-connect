import { NgModule } from '@angular/core';
import { ProfileContainerComponent } from './components/profile-container/profile-container.component';
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import { LeftSectionComponent } from './components/left-section/left-section.component';
import { StoreModule } from '@ngrx/store';
import { profileReducer } from './store/reducer';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { ProfileEffects } from './store/effects';
import { ProfileService } from './services/profile.services';
import { SharedComponentsModule } from '../shared-components/shared-components.module';

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    SharedComponentsModule,
    StoreModule.forFeature('profile', profileReducer),
    EffectsModule.forFeature([ProfileEffects]),
  ],
  declarations: [
    ProfileContainerComponent,
    PersonalInfoComponent,
    LeftSectionComponent,
  ],
  providers: [ProfileService],
  exports: [StoreModule],
})
export class ProfileModule {}

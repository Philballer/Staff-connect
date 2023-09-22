import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { NavbarComponent } from './navbar/navbar.component';
import { ToasterService } from './shared-services/toaster-service/toaster.services';
import { CountryService } from './shared-services/country-service/country.service';
import { BaseButtonComponent } from './base-button/base-button.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { BaseIconComponent } from './base-icon/base-icon.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { AboutComponent } from './about/about.component';

@NgModule({
  imports: [CommonModule, MatIconModule, MatTooltipModule, FormsModule],
  declarations: [
    NavbarComponent,
    BaseButtonComponent,
    SpinnerComponent,
    SearchbarComponent,
    BaseIconComponent,
    AboutComponent,
  ],
  exports: [
    NavbarComponent,
    BaseButtonComponent,
    SpinnerComponent,
    MatIconModule,
    SearchbarComponent,
    BaseIconComponent,
    MatTooltipModule,
    AboutComponent,
  ],
  providers: [ToasterService, CountryService],
})
export class SharedComponentsModule {}

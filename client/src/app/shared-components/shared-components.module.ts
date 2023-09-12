import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { NavbarComponent } from './navbar/navbar.component';
import { ToasterService } from './shared-services/toaster-service/toaster.services';
import { CountryService } from './shared-services/country-service/country.service';

@NgModule({
  imports: [CommonModule, MatIconModule],
  declarations: [NavbarComponent],
  exports: [NavbarComponent, MatIconModule],
  providers: [ToasterService, CountryService],
})
export class SharedComponentsModule {}

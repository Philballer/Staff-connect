import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent {
  public currentYear: number;

  constructor() {
    const date = new Date();
    this.currentYear = date.getFullYear();
  }
}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-base-icon',
  templateUrl: './base-icon.component.html',
  styleUrls: ['./base-icon.component.css'],
})
export class BaseIconComponent {
  @Input()
  public iconClass: string;

  @Input()
  public toolTip?: string;

  @Input()
  public cursorPointer?: boolean = true;
}

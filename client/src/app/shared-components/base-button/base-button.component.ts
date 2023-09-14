import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-base-button',
  templateUrl: './base-button.component.html',
  styleUrls: ['./base-button.component.css'],
})
export class BaseButtonComponent {
  @Input()
  public buttonLabel: string;

  @Input()
  public inputtedClass: string;

  @Input()
  public iconClass: string;

  @Input()
  public tooltip?: string;

  @Output()
  public onClick = new EventEmitter<void>();

  public pending: boolean = false;

  public handleButtonClick(): void {
    this.onClick.emit();
  }
}

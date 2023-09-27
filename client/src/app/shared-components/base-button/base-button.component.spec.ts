import { BaseButtonComponent } from './base-button.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { MatTooltipModule } from '@angular/material/tooltip';

describe('BaseButtonComponent', () => {
  let spectator: Spectator<BaseButtonComponent>;
  let button: HTMLElement;

  const createComponent = createComponentFactory({
    component: BaseButtonComponent,
    imports: [MatTooltipModule],
    providers: [],
  });

  function queryElements(): void {
    button = spectator.query('[data-testid="button"]');
  }

  beforeEach(() => {
    spectator = createComponent();
    queryElements();
  });

  it('should create the component', () => {
    expect(spectator).toBeTruthy();
  });

  it('should display the correct the label', () => {
    const buttonLabel = 'Add User';
    spectator.setInput('buttonLabel', buttonLabel);
    expect(button).toContainText(buttonLabel);
  });

  it('should have the inputted classes together with the tool-tip class', () => {
    const inputClass = 'w-100';
    spectator.setInput('inputtedClass', inputClass);
    expect(button).toHaveClass(inputClass);
  });

  it('should emit the Onclick event when clicked', () => {
    const emitSpy = spyOn(spectator.component.onClick, 'emit');
    button.click();
    spectator.detectChanges();
    expect(emitSpy).toHaveBeenCalledTimes(1);
  });

  it('should display button icon dynamically depending on the pending boolean', () => {
    const inputIconClass = 'fa fa-home';
    const pendingIconClass = 'fa fa-spin fa-spinner';
    spectator.setInput('iconClass', inputIconClass);
    const icon = spectator.query('[data-testid="button-icon"]');
    expect(icon).toHaveClass(inputIconClass);

    spectator.setInput('pending', true);
    spectator.detectChanges();

    expect(icon).toHaveClass(pendingIconClass);
  });
});

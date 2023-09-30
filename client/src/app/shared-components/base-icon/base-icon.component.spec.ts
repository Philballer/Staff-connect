import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { BaseIconComponent } from './base-icon.component';
import { MatTooltipModule } from '@angular/material/tooltip';

describe('BaseIconComponent', () => {
  let spectator: Spectator<BaseIconComponent>;
  let icon: HTMLElement;

  const create = createComponentFactory({
    component: BaseIconComponent,
    imports: [MatTooltipModule],
    providers: [],
  });

  function queryElements(): void {
    icon = spectator.query('[data-testid="icon"]');
  }

  beforeEach(() => {
    spectator = create();
    queryElements();
  });

  it('should have the input icon class', () => {
    const iconClass = 'fa test';
    spectator.setInput('iconClass', iconClass);
    spectator.detectChanges();
    expect(icon).toHaveClass(iconClass);
  });

  it('should have a dynamic pointer depending on the input variable', () => {
    spectator.setInput('cursorPointer', false);
    spectator.detectChanges();
    expect(icon).toHaveStyle({ cursor: 'default' });
    // change the variable to true
    spectator.setInput('cursorPointer', true);
    expect(icon).toHaveStyle({ cursor: 'pointer' });
    expect(icon).not.toHaveStyle({ cursor: 'default' });
  });
});

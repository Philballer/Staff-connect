import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { BaseIconComponent } from './base-icon.component';

describe('BaseIconComponent', () => {
  let spectator: Spectator<BaseIconComponent>;
  let icon: HTMLElement;

  const create = createComponentFactory(BaseIconComponent);

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
});

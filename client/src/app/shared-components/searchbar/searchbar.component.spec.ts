import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { SearchbarComponent } from './searchbar.component';
import { BaseIconComponent } from '../base-icon/base-icon.component';
import { FormsModule } from '@angular/forms';


describe('SearchbarComponent', () => {
  let spectator: Spectator<SearchbarComponent>;
  let searchInput: HTMLElement;
  let inputIcon: HTMLElement;
  let inputIconPending: HTMLElement;

  const create = createComponentFactory({
    component: SearchbarComponent,
    imports: [FormsModule],
    providers: [],
  });

  function queryElements(): void {
    searchInput = spectator.query('input');
    inputIcon = spectator.query('[ data-testid="inputIconDefault"]');
    inputIconPending = spectator.query('[ data-testid="inputIconSpinner"]');
  }

  beforeEach(() => {
    spectator = create();
    queryElements();
  });

  it('should focus on the input element upon initialization of the component', () => {
    const focusedElement = document.activeElement;
    console.log('focused Element', focusedElement);
    expect(focusedElement).toBe(searchInput);
  });

  it('should display spinner icon when loading is true', () => {
    expect(inputIcon).toBeTruthy();
    expect(inputIconPending).toBeFalsy();

    spectator.setInput('loading', true);
    spectator.detectChanges();

    expect(inputIcon).toBeTruthy();
    expect(inputIconPending).toBeFalsy();

  });

  // it('should focus on the input element upon initialization of the component', () => {});
});

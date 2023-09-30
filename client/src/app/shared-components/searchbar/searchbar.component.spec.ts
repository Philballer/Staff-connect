import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { SearchbarComponent } from './searchbar.component';
import { BaseIconComponent } from '../base-icon/base-icon.component';
import { FormsModule } from '@angular/forms';

describe('SearchbarComponent', () => {
  let spectator: Spectator<SearchbarComponent>;
  let searchInput: HTMLElement;
  let inputIcon: BaseIconComponent;
  let inputIconPending: BaseIconComponent;

  const create = createComponentFactory({
    component: SearchbarComponent,
    imports: [FormsModule],
    providers: [],
  });

  function queryElements(): void {
    searchInput = spectator.query('input');
    // inputIcon = spectator.query(BaseIconComponent) as BaseIconComponent;
  }

  beforeEach(() => {
    queryElements();
  });

  // it('should focus on the input element upon initialization of the component', () => {});
});

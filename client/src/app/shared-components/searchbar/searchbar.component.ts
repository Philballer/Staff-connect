import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css'],
})
export class SearchbarComponent implements OnInit, OnDestroy {
  @ViewChild('inputElement', { static: true })
  inputElement: ElementRef;

  @Input()
  public loading: boolean = false;

  @Output()
  public onSearch = new EventEmitter<string>();

  public inputValue: string;

  public inputFocus: boolean = false;

  public noEntry: boolean = true;

  public ngOnInit(): void {
    this.inputElement.nativeElement.focus();
  }

  public ngOnDestroy(): void {
    this.inputValue = '';
  }

  public inputClicked(): void {
    this.inputFocus = true;
  }

  public handleInput(): void {
    this.onSearch.emit(this.inputValue);
    this.inputValue = '';
    this.inputElement.nativeElement.blur(); // to remove focus
  }

  // To handle the changes while typing
  public handleInputChange(event: any): void {
    this.inputValue = event.target.value;
    if (this.inputValue === '') this.loading = false;

    this.onSearch.emit(this.inputValue);
  }
}

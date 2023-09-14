import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserState } from '../../store/reducer';
import { LoadUsers } from '../../store/actions';
import { IUser } from '../../interfaces/user.interface';
import { SubscriptionList } from 'src/app/shared-components/subscription-list/subscription-list';

@Component({
  selector: 'app-datatable-pagination',
  templateUrl: './datatable-pagination.component.html',
  styleUrls: ['./datatable-pagination.component.css'],
})
export class DatatablePaginationComponent implements OnInit, OnDestroy {
  public currentPage: number = 1; //selectedNumber has realtime value of page not this

  public selectedNumber: number = 1;

  public data: IUser[] = [];

  public numberOfPages: number;

  public pageNumbersArray: number[] = [];

  public pageLimit: number;

  public totalEntries: number;

  public firstButtonDisabled: boolean = false;

  private subscriptionList: SubscriptionList = new SubscriptionList();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<{ users: UserState }>
  ) {}

  public ngOnInit(): void {
    this.subscriptionList.add(
      this.store.select('users').subscribe((res: UserState) => {
        this.data = res.data;
        this.pageLimit = res.pageLimit;
        this.totalEntries = res.totalFromQuery;
      })
    );

    this.calcNumberOfPages(this.pageLimit, this.totalEntries);
  }

  public ngOnDestroy(): void {
    this.subscriptionList.unsubscribe();
  }

  public handlePageClick(pageNumber: number): void {
    if (
      this.currentPage === 1 &&
      pageNumber === 1 &&
      !this.firstButtonDisabled
    ) {
      this.firstButtonDisabled = true;
      return;
    }
    if (!this.firstButtonDisabled) this.firstButtonDisabled = true;

    // this line stops the page from reloading
    if (pageNumber === this.selectedNumber) return;
    this.selectedNumber = pageNumber;
    if (pageNumber === 1) this.currentPage = 1;

    setTimeout(() => {
      this.store.dispatch(new LoadUsers(pageNumber));
    }, 300);
  }

  public handleLastPageClick(num: number): void {
    if (num === this.currentPage) {
      setTimeout(() => {
        this.store.dispatch(new LoadUsers(num));
      }, 300);
    } else {
      this.currentPage = num;
      this.selectedNumber = num;

      setTimeout(() => {
        this.store.dispatch(new LoadUsers(num));
      }, 300);
    }
  }

  public calcNumberOfPages(pageLimit: number, totalFound: number): void {
    const answer = Math.ceil(totalFound / pageLimit);
    this.numberOfPages = answer;
    this.pageNumbersArray = this.generateNumberArray(answer);
  }

  public generateNumberArray(n: number): number[] {
    if (n < 1) {
      return [];
    }
    return Array.from({ length: n }, (_, i) => i + 1);
  }

  // function takes paginator buttons backwards
  public traverseButtons(number: number): void {
    if (!this.firstButtonDisabled) this.firstButtonDisabled = true;
    if (number - 1 === this.numberOfPages || number === 0) {
      return;
    }
    this.currentPage = number;
    this.selectedNumber = number;

    setTimeout(() => {
      this.store.dispatch(new LoadUsers(number));
    }, 300);
  }
}

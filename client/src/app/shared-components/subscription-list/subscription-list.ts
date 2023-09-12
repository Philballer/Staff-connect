import { Subscription } from 'rxjs';

export class SubscriptionList {
  private subscriptions: Subscription[] = [];

  public unsubscribe(): void {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

  public add(sub?: Subscription): void {
    if (sub) this.subscriptions.push(sub);
  }

  public get length(): number {
    return this.subscriptions.length;
  }
}

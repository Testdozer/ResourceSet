import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/index";
import { OpenProjectAction } from "../../core.module/ipc-actions/open-project.action";
import { DeleteHistoryItemAction } from "../actions/delete-history-item.action";
import { historyItemsSelector } from "../selectors/history-items.selector";
import { HistoryItem } from "../store/history.item";

@Component({
  selector: "app-project-history-container",
  template: `
    <app-history-item
      *ngFor="let item of history$ | async; trackBy: trackByFn"
      [item]="item"
      (openItem)="openProject(item)"
      (deleteItem)="onDelete(item)"></app-history-item>`,
  styles: [`:host {
    display: block;
   }`],
})
export class ProjectHistoryContainer {
  public history$: Observable<HistoryItem[]>;

  constructor(private store: Store<any>) {
    this.history$ = store.pipe(historyItemsSelector);
  }

  public openProject(item: HistoryItem): void {
    this.store.dispatch(new OpenProjectAction({path: item.path}));
  }

  public onDelete(item: HistoryItem) {
    this.store.dispatch(new DeleteHistoryItemAction({path: item.path}));
  }

  public trackByFn(index: number, item: HistoryItem): string {
    return item.path;
  }
}

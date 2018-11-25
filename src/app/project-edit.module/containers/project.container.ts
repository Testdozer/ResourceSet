import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { dataSetSelector } from "../selectors/data-set.selector";
import { IProjectStore } from "../store/project.store";

@Component({
  template: `
    <app-project-grid [dataSet]="dataSet$ | async">
    </app-project-grid>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectContainer {

  public dataSet$ = this.store.pipe(dataSetSelector);

  constructor(private store: Store<IProjectStore>) {

  }
}

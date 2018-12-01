import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { dataSetSelector } from "../selectors/data-set.selector";
import { languagesSelector } from "../selectors/languages.selector";
import { IProjectStore } from "../store/project.store";

@Component({
  template: `
    <app-project-grid [dataSource]="dataSource$ | async"
                      [languages]="languages$ | async">
    </app-project-grid>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectContainer {

  public dataSource$ = this.store.pipe(dataSetSelector);
  public languages$ = this.store.pipe(languagesSelector);

  constructor(private store: Store<IProjectStore>) {

  }
}

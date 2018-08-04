import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { OpenProjectAction } from "../../core.module/actions/open-project.action";

@Component({
  template: `
    <app-project-selector (selectFolderRequested)="openProject($event)"></app-project-selector>`
})
export class ProjectHistoryContainer {
  constructor(private store: Store<any>) {
  }

  public openProject({path}): void {
    this.store.dispatch(new OpenProjectAction({path}));
  }
}

import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { SelectFolderAction } from "../actions/select-folder.action";

@Component({
  template: `
    <app-project-selector (selectFolderRequested)="selectFolder()"></app-project-selector>`
})
export class ProjectSelectorContainer {
  constructor(private store: Store<any>) {
  }

  public selectFolder(): void {
    this.store.dispatch(new SelectFolderAction());
  }
}

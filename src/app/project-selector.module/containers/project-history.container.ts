import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { OpenProjectAction } from "../../core.module/actions/open-project.action";

@Component({
  selector: "app-project-history-container",
  template: `
    <app-project-selector-history></app-project-selector-history>`,
  styles: [`:host {
    display: block;
  }`]
})
export class ProjectHistoryContainer {
  constructor(private store: Store<any>) {
  }

  public openProject({path}): void {
    this.store.dispatch(new OpenProjectAction({path}));
  }
}

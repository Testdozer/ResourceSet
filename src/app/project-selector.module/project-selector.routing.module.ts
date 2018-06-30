import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ProjectSelectorContainer } from "./containers/project-selector.container";

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forChild([
      {
        component: ProjectSelectorContainer,
        path: ""
      }])
  ]
})
export class ProjectSelectorRoutingModule {
}

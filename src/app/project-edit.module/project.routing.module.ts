import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ProjectContainer } from "./containers/project.container";

export const PROJECT_PATH = "project";

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forChild([
      {
        component: ProjectContainer,
        path: PROJECT_PATH
      }])
  ]
})
export class ProjectRoutingModule {
}

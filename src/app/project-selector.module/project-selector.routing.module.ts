import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ProjectSelectorPageComponent } from "./components/project-selector.page/project-selector.page.component";

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forChild([
      {
        component: ProjectSelectorPageComponent,
        path: ""
      }])
  ]
})
export class ProjectSelectorRoutingModule {
}

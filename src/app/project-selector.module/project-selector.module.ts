import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ProjectSelectorComponent } from "./components/project-selector/project-selector.component";
import { ProjectSelectorContainer } from "./containers/project-selector.container";
import { ProjectSelectorRoutingModule } from "./project-selector.routing.module";

@NgModule({
  imports: [
    CommonModule,
    ProjectSelectorRoutingModule
  ],
  declarations: [
    ProjectSelectorContainer,
    ProjectSelectorComponent
  ]
})
export class ProjectSelectorModule {
}

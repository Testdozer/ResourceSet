import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { TranslateModule } from "@ngx-translate/core";
import { ProjectSelectorComponent } from "./components/project-selector/project-selector.component";
import { ProjectSelectorContainer } from "./containers/project-selector.container";
import { SelectFolderEffect } from "./effects/select-folder.effect";
import { ProjectSelectorRoutingModule } from "./project-selector.routing.module";

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ProjectSelectorRoutingModule,
    EffectsModule.forFeature([SelectFolderEffect])
  ],
  declarations: [
    ProjectSelectorContainer,
    ProjectSelectorComponent
  ]
})
export class ProjectSelectorModule {
}

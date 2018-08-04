import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { TranslateModule } from "@ngx-translate/core";
import { ProjectSelectorComponent } from "./components/project-selector/project-selector.component";
import { ProjectHistoryContainer } from "./containers/project-history.container";
import { ProjectSelectorContainer } from "./containers/project-selector.container";
import { SelectFolderEffect } from "./effects/select-folder.effect";
import { PROJECT_SELECTOR_FEATURE_NAME } from "./project-selector.feature-name";
import { ProjectSelectorRoutingModule } from "./project-selector.routing.module";
import { projectSelectorReducerMap } from "./reducers/reducers.map";

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ProjectSelectorRoutingModule,
    EffectsModule.forFeature([SelectFolderEffect]),
    StoreModule.forFeature(PROJECT_SELECTOR_FEATURE_NAME, projectSelectorReducerMap)
  ],
  declarations: [
    ProjectSelectorContainer,
    ProjectSelectorComponent,
    ProjectHistoryContainer
  ]
})
export class ProjectSelectorModule {
}

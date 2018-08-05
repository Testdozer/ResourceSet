import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "../shared.module/shared.module";
import { ProjectSelectorHistoryComponent } from "./components/project-selector.history/project-selector.history.component";
import { ProjectSelectorPageComponent } from "./components/project-selector.page/project-selector.page.component";
import { ProjectSelectorComponent } from "./components/project-selector/project-selector.component";
import { ProjectHistoryContainer } from "./containers/project-history.container";
import { ProjectSelectorContainer } from "./containers/project-selector.container";
import { AddHistoryItemEffect } from "./effects/add-history-item.effect";
import { SelectFolderEffect } from "./effects/select-folder.effect";
import { PROJECT_SELECTOR_FEATURE_NAME } from "./project-selector.feature-name";
import { ProjectSelectorRoutingModule } from "./project-selector.routing.module";
import { projectSelectorReducerMap } from "./reducers/reducers.map";

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ProjectSelectorRoutingModule,
    EffectsModule.forFeature([SelectFolderEffect, AddHistoryItemEffect]),
    StoreModule.forFeature(PROJECT_SELECTOR_FEATURE_NAME, projectSelectorReducerMap),
    SharedModule
  ],
  declarations: [
    ProjectSelectorPageComponent,
    ProjectSelectorContainer,
    ProjectSelectorComponent,
    ProjectHistoryContainer,
    ProjectSelectorHistoryComponent
  ],
  entryComponents: [
    ProjectSelectorPageComponent
  ]
})
export class ProjectSelectorModule {
}

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "../shared.module/shared.module";
import { LoadProjectAction } from "./actions/load-project.action";
import { GridComponent } from "./components/grid.component/grid.component";
import { ProjectContainer } from "./containers/project.container";
import { PROJECT_FEATURE_NAME } from "./project.feature-name";
import { ProjectRoutingModule } from "./project.routing.module";
import { projectReducerMap } from "./reducers/reducers.map";

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    ProjectRoutingModule,
    EffectsModule.forFeature([]),
    StoreModule.forFeature(PROJECT_FEATURE_NAME, projectReducerMap, {
      initialState: {
        keys: [
          "a"
        ],
        languages: ["en"]
      }
    }),
    SharedModule
  ],
  declarations: [
    ProjectContainer,
    GridComponent
  ],
  providers: [
    {provide: LoadProjectAction, useValue: undefined}
  ],
  entryComponents: [
    ProjectContainer
  ]
})
export class ProjectModule {
}

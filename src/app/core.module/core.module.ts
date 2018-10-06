import { NgModule, Optional, SkipSelf } from "@angular/core";
import { RouterModule } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { TranslateModule } from "@ngx-translate/core";
import { LoadProjectAction } from "../project-edit.module/actions/load-project.action";
import { SharedModule } from "../shared.module/shared.module";
import { AddHistoryItemAction } from "./actions/add-history-item.action";
import { OpenProjectAction } from "./actions/open-project.action";
import { AppComponent } from "./containers/app.component/app.component";
import { NotFoundPageComponent } from "./containers/not-found-page.component";
import { MessageBusEffect } from "./effects/message-bus/message-bus.effect";
import { OpenProjectEffect } from "./effects/open-project/open-project.effect";
import { StartUpEffect } from "./effects/start-up/start-up.effect";

export const COMPONENTS = [
  AppComponent,
  NotFoundPageComponent
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule,
    EffectsModule.forFeature([StartUpEffect, MessageBusEffect, OpenProjectEffect]),
    TranslateModule.forChild()
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
  providers: [
    {provide: AddHistoryItemAction, useFactory: () => undefined},
    {provide: OpenProjectAction, useFactory: () => undefined},
    {provide: LoadProjectAction, useFactory: () => undefined}
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        "CoreModule is already loaded. Import it in the AppModule only");
    }
  }
}

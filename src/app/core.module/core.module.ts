import { NgModule, Optional, SkipSelf } from "@angular/core";
import { RouterModule } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "../shared.module/shared.module";
import { AppComponent } from "./containers/app.component/app.component";
import { NotFoundPageComponent } from "./containers/not-found-page.component";
import { StartUpEffect } from "./effects/start-up/start-up.effect";

export const COMPONENTS = [
  AppComponent,
  NotFoundPageComponent
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule,
    EffectsModule.forFeature([StartUpEffect]),
    TranslateModule.forChild()
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
  providers: []
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        "CoreModule is already loaded. Import it in the AppModule only");
    }
  }
}

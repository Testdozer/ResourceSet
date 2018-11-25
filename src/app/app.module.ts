import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { EffectsModule } from "@ngrx/effects";
import { RouterStateSerializer, StoreRouterConnectingModule } from "@ngrx/router-store";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import "reflect-metadata";
import "zone.js/dist/zone-mix";
import { environment } from "../environments/environment";
import "../polyfills";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./core.module/containers/app.component/app.component";
import { CoreModule } from "./core.module/core.module";
import { metaReducers } from "./core.module/reducers/meta.reducer";
import { reducers } from "./core.module/reducers/router.reducer";
import { ElectronService } from "./core.module/services/electron.service";
import { ProjectModule } from "./project-edit.module/project.module";
import { CustomRouterStateSerializer } from "./shared/custom-router-state-serializer";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),
    StoreModule.forRoot(reducers, {metaReducers}),
    StoreRouterConnectingModule.forRoot({
      stateKey: "router"
    }),
    StoreDevtoolsModule.instrument({
      name: "NgRx DevTools",
      logOnly: environment.production
    }),
    EffectsModule.forRoot([]),
    CoreModule,
    ProjectModule,
    AppRoutingModule
  ],
  providers: [
    ElectronService,
    {provide: RouterStateSerializer, useClass: CustomRouterStateSerializer}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

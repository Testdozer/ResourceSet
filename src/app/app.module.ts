import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import "reflect-metadata";
import "zone.js/dist/zone-mix";
import "../polyfills";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FooterComponent } from "./components/footer/footer.component";
import { HomeComponent } from "./components/home/home.component";
import { TableComponent } from "./components/table/table.component";
import { ToolbarComponent } from "./components/toolbar/toolbar.component";
import { WebviewDirective } from "./shared/directives/webview.directive";
import { ElectronService } from "./shared/providers/electron.service";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WebviewDirective,
    ToolbarComponent,
    TableComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    FlexLayoutModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    })
  ],
  providers: [ElectronService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

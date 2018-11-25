import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NotFoundPageComponent } from "./core.module/containers/not-found-page.component";

export const PROJECT_SELECTOR = "project-selector";

@NgModule({
  imports: [RouterModule.forRoot([
    {path: "", redirectTo: PROJECT_SELECTOR, pathMatch: "full"},
    {
      path: PROJECT_SELECTOR,
      loadChildren: "./project-selector.module/project-selector.module#ProjectSelectorModule"
    },
    {path: "**", component: NotFoundPageComponent}
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

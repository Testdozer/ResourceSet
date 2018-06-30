import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NotFoundPageComponent } from "./core.module/containers/not-found-page.component";

const PROJECT_SELECTOR = "project-selector";
const routes: Routes = [
  {
    path: PROJECT_SELECTOR,
    loadChildren: "./project-selector.module/project-selector.module#ProjectSelectorModule"
  },
  {path: "**", component: NotFoundPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

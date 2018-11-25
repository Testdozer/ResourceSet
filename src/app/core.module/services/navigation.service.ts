import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { PROJECT_SELECTOR } from "../../app-routing.module";
import { PROJECT_PATH } from "../../project-edit.module/project.routing.module";

@Injectable({
  providedIn: "root"
})
export class Navigation {
  private selector = ["/", PROJECT_SELECTOR];
  private project = ["/", PROJECT_PATH];

  constructor(private router: Router) {

  }

  public toProjectSelector() {
    this.router.navigate(this.selector);
  }

  public toProject() {
    this.router.navigate(this.project);
  }
}

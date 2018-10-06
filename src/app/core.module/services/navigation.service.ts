import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { PROJECT_SELECTOR } from "../../app-routing.module";

@Injectable({
  providedIn: "root"
})
export class Navigation {
  constructor(private router: Router) {

  }

  public toProjectSelector() {
    this.router.navigate(["/", PROJECT_SELECTOR]);
  }

  public toProject() {
    throw new Error("Not implemented");
    // this.router.navigate(["/", PROJECT_SELECTOR]);
  }
}

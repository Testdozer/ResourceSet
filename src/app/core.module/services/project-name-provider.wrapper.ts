import { Injectable } from "@angular/core";
import { Observable, observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ProjectNameProviderWrapper {

  public get (directory: string): Observable<string> {
    return new Observable<string>(observer => {
      const projectNameFactory = window.require("electron").remote.require("./app/main-process/project-name-provider.factory");
      const projectName = projectNameFactory().get(directory);
      if (projectName !== undefined) {
        observer.next(projectName);
      }
      observer.complete();
    });
  }
}

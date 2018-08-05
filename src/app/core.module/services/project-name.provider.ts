import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ProjectNameProvider {

  public get(directory: string): Observable<string> {
    return new Observable<string>(observer => {
      const electronFs = window.require("electron").remote.require("fs");
      const electronPath = window.require("electron").remote.require("path");

      for (let i = 0; i < directory.split(electronPath.sep).length; i++) {
        const params = [directory];
        for (let j = 0; j < i ; j++) {
          params.push("..");
        }

        const workDir = electronPath.join(...params);
        const fileName = electronPath.join(workDir, "package.json");

        if (electronFs.existsSync(fileName)) {
          const manifest = JSON.parse(electronFs.readFileSync(fileName, "utf8"));
          observer.next(manifest.name);
          break;
        }
      }

      observer.complete();
    });
  }
}

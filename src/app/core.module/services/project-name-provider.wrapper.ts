import { Injectable, NgZone } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ProjectNameProviderWrapper {

  constructor( private zone: NgZone) {
  }

  public get (directory: string): Observable<string> {
    return new Observable<string>(observer => {
      window.require("electron").ipcRenderer.once("projectName:reply", (event, arg) => {
        this.zone.run(() => {
          observer.next(arg);
          observer.complete();
        });
      });
      window.require("electron").ipcRenderer.send("projectName", directory);
    });
  }
}

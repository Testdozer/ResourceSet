import { Injectable, NgZone } from "@angular/core";
import { Observable } from "rxjs";
import {ipcRendererChannelName} from "@app/shared/ipc-names";

@Injectable({
  providedIn: "root"
})
export class MessageBus {

  constructor(private zone: NgZone) {
  }

  public get (directory: string): Observable<string> {
    return new Observable<string>(observer => {
      window.require("electron").ipcRenderer.once(ipcRendererChannelName, (event, action) => {
        this.zone.run(() => {
          observer.next(arg);
          observer.complete();
        });
      });
      window.require("electron").ipcRenderer.send("projectName", directory);
    });
  }
}

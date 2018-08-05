import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { DialogElectron } from "./electron/dialog.electron";

@Injectable({
  providedIn: "root"
})
export class SelectFolderService {

  constructor(private dialog: DialogElectron) {

  }

  public select(): Observable<string> {
    return new Observable<string>(observer => {
      // of("test of").subscribe(value => {
      //   observer.next(value);
      //   observer.complete();
      // });

      this.dialog.showOpenDialog({properties: ["openDirectory"]}, paths => {
        if (paths !== undefined) {
          observer.next(paths[0]);
        }
        observer.complete();
      });
    });
  }
}

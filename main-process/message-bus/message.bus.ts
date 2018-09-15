import {Action} from "@ngrx/store";
import { ipcMain } from "electron";
import {Injectable} from "injection-js";
import {Observable} from "rxjs";
import {ipcMainChannelName, ipcRendererChannelName} from "../../src/app/shared/ipc-names";

@Injectable()
export class MessageBus {
  constructor(private ipc: typeof ipcMain) {
  }

  public messages$(): Observable<{ action: Action, sender: (action?: Action) => void }> {
    return new Observable<{ action: Action, sender: (action?: Action) => void }>(observer => {
      this.ipc.on(ipcMainChannelName, (event, inputAction) => {
          observer.next({action: inputAction, sender: (action?: Action) => event.sender.send(ipcRendererChannelName, action)});
        }
      );
    });
  }
}

import {Injectable, NgZone} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {Action} from "@ngrx/store";
import {Observable} from "rxjs";
import {switchMap} from "rxjs/operators";
import {ipcMainChannelName, ipcRendererChannelName} from "../../../shared/ipc-names";
import { AddHistoryItemAction } from "../../ipc-actions/add-history-item.action";
import { OpenProjectAction } from "../../ipc-actions/open-project.action";

@Injectable()
export class MessageBusEffect {

  constructor(private zone: NgZone,
              private action$: Actions) {
  }

  @Effect({dispatch: true})
  public effect$(): Observable<Action> {
    return this.action$.pipe(
      ofType<OpenProjectAction>(OpenProjectAction.type),
      switchMap(action => {
        return new Observable<Action>(observer => {
          window.require("electron").ipcRenderer.once(ipcRendererChannelName, (event, response: AddHistoryItemAction) => {
            this.zone.run(() => {
              observer.next(new AddHistoryItemAction(response.payload));
              observer.complete();
            });
          });
          window.require("electron").ipcRenderer.send(ipcMainChannelName, action);
        });
      })
    );
  }
}

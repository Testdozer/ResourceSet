import { Injectable, NgZone } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { ipcMainChannelName } from "../../../shared/ipc-names";
import { GuidProvider } from "../../services/guid.provider";
import { IpcMainDispatchableActionProvider } from "../../services/ipc-main.dispatchable-action.provider";
import { SerializableActionDeserializer } from "../../services/serializable-action.deserializer/serializable-action.deserializer";

@Injectable()
export class MessageBusEffect {

  constructor(private zone: NgZone,
              private action$: Actions,
              private guid: GuidProvider,
              private store: Store<any>,
              private deserializer: SerializableActionDeserializer,
              private ipcMainDispatchableActionProvider: IpcMainDispatchableActionProvider) {
  }

  @Effect({dispatch: false})
  public effect$(): Observable<Action> {
    return this.action$.pipe(
      ofType(...this.ipcMainDispatchableActionProvider.get()),
      tap(action => {
        const ipcRendererChannelName = this.guid.new();
        window.require("electron").ipcRenderer.once(ipcRendererChannelName, (event, response: Action) => {
          this.zone.run(() => {
            if (response) {
              this.store.dispatch(this.deserializer.deserialize(response));
            }
          });
        });
        window.require("electron").ipcRenderer.send(ipcMainChannelName, {
          channel: ipcRendererChannelName,
          action
        });
      })
    );
  }
}

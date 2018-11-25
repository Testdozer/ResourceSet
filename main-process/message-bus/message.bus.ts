import { Action } from "@ngrx/store";
import { ipcMain } from "electron";
import { Injectable } from "injection-js";
import { Observable } from "rxjs";
import { SerializableActionDeserializer } from "../../src/app/core.module/services/serializable-action.deserializer/serializable-action.deserializer";
import { ipcMainChannelName } from "../../src/app/shared/ipc-names";
import { Message } from "./message";

@Injectable()
export class MessageBus {
  constructor(
    private ipc: typeof ipcMain,
    private deserializer: SerializableActionDeserializer) {
  }

  public messages$(): Observable<Message> {
    return new Observable<Message>(observer => {
      this.ipc.on(ipcMainChannelName, (event, arg: { action: Action, channel: string }) => {
          const act = this.deserializer.deserialize(arg.action);
          observer.next(new Message(act, (action?: Action) => event.sender.send(arg.channel, action)));
        }
      );
    });
  }
}

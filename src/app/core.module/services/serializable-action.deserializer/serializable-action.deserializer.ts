import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { get } from "../../../shared/serializable-actions/serializable-actions.registration";
import { SerializableActionException } from "./serializable-action.exception";

@Injectable({
  providedIn: "root"
})
export class SerializableActionDeserializer {

  public deserialize(action: any): Action {
    for (const info of get()) {
      if (info.type === action.type) {
        const instance = new info.action((action as any).payload);
        return instance as Action;
      }
    }

    throw new SerializableActionException();
  }
}

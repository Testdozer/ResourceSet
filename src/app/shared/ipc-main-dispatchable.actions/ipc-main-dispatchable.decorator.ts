import { Action } from "@ngrx/store";
import { add } from "./ipc-main-dispatchable.registration";

export function IpcMainDispatchableAction<T extends Action>(): ClassDecorator {
  return (target): void => {
    add((target as any).type);
  };
}

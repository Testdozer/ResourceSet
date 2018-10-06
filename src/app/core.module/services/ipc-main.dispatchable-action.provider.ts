import { Injectable } from "@angular/core";
import { get } from "../../shared/ipc-main-dispatchable.actions/ipc-main-dispatchable.registration";

@Injectable(
  {
    providedIn: "root"
  }
)
export class IpcMainDispatchableActionProvider {
  public get(): string[] {
    return get();
  }
}

import { Action } from "@ngrx/store";

export class StartAction implements Action {
  public static readonly type = "[App] StartUp";
  public readonly type = StartAction.type;
}

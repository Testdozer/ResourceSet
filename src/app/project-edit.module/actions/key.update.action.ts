import { Action } from "@ngrx/store";

export class KeyUpdateAction implements Action {
  public static type = "[Key] Update";
  public readonly type = KeyUpdateAction.type;

  constructor(public payload: { current: string, updated: string }) {

  }
}

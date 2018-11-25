import { Action } from "@ngrx/store";

export class KeysReadSuccessAction implements Action {
  public static type = "[Keys] Read Success";
  public readonly type = KeysReadSuccessAction.type;

  constructor(public payload: { keys: string[] }) {

  }
}

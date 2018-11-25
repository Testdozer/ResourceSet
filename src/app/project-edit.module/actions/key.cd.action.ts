import { Action } from "@ngrx/store";
import { CdOperators } from "./cd-operators";

export class KeyCdAction implements Action {
  public static type = "[Key] CD";
  public readonly type = KeyCdAction.type;

  constructor(public payload: { key: string, operator: CdOperators }) {

  }
}

import { Action } from "@ngrx/store";
import { CdOperators } from "./cd-operators";

export class LanguageCdAction implements Action {
  public static type = "[Language] CD";
  public readonly type = LanguageCdAction.type;

  constructor(public payload: { language: string, operator: CdOperators }) {

  }
}

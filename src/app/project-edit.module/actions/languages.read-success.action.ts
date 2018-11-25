import { Action } from "@ngrx/store";

export class LanguagesReadSuccessAction implements Action {
  public static type = "[Languages] Read Success";
  public readonly type = LanguagesReadSuccessAction.type;

  constructor(public payload: { languages: string[] }) {

  }
}

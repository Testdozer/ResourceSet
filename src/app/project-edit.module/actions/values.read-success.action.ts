import { Action } from "@ngrx/store";
import { ValueItem } from "../store/value.item";

export class ValuesReadSuccessAction implements Action {
  public static type = "[Values] Read Success";
  public readonly type = ValuesReadSuccessAction.type;

  constructor(public payload: { values: ValueItem[] }) {

  }
}

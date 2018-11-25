import { Action } from "@ngrx/store";
import { ValueItem } from "../store/value.item";

export class ValueUpdateAction implements Action {
  public static type = "[Value] Update";
  public readonly type = ValueUpdateAction.type;

  constructor(public payload: { item: ValueItem }) {

  }
}

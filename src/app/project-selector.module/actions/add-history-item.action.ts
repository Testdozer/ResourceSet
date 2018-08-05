import { Action } from "@ngrx/store";

export class AddHistoryItemAction implements Action {
  public static type = "[Project Selector] Add History Item";
  public readonly type = AddHistoryItemAction.type;

  constructor(public payload: { path: string, name: string }) {

  }
}

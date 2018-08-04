import { Action } from "@ngrx/store";

export class DeleteHistoryItemAction implements Action {
  public static type = "[Project Selector] Delete History Item";
  public readonly type = DeleteHistoryItemAction.type;

  constructor(public payload: { path: string }) {

  }
}

import { Action } from "@ngrx/store";

export class DeleteHistoryItem implements Action {
  public static type = "[Project Selector] Delete History Item";
  public readonly type = DeleteHistoryItem.type;

  constructor(public payload: { path: string }) {

  }
}

import { Action } from "@ngrx/store";

export enum ProjectSelectorActionTypes {
  SelectFolder = "[Project Selector] Select Folder",
  DeleteHistoryItem = "[Project Selector] Delete History Item"
}

export class SelectFolder implements Action {
  public readonly type = ProjectSelectorActionTypes.SelectFolder;
}

export class DeleteHistoryItem implements Action {
  public readonly type = ProjectSelectorActionTypes.DeleteHistoryItem;

  constructor(public payload: { path: string }) {

  }
}

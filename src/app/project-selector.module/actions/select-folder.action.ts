import { Action } from "@ngrx/store";

export class SelectFolderAction implements Action {
  public static readonly type = "[Project Selector] Select Folder";
  public readonly type = SelectFolderAction.type;
}

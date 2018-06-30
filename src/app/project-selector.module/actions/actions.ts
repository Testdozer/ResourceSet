import { Action } from "@ngrx/store";

export enum ProjectSelectorActionTypes {
  SelectFolder = "[Project Selector] Select Folder"
}

export class SelectFolder implements Action {
  public readonly type = ProjectSelectorActionTypes.SelectFolder;
}

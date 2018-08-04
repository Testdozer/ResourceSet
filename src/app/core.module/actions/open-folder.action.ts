import { Action } from "@ngrx/store";

export class OpenFolderAction implements Action {
  public static readonly type = "[App] OpenFolder";
  public readonly type = OpenFolderAction.type;

  constructor(public payload: { path: string }) {

  }
}

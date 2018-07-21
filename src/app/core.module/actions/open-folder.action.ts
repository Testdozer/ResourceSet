import { Action } from "@ngrx/store";
import { AppActionTypes } from "./actions";

export class OpenFolderAction implements Action {
  public readonly type = AppActionTypes.OpenFolder;

  constructor(public payload: { path: string }) {

  }
}

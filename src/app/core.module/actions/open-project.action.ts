import { Action } from "@ngrx/store";
import { AppActionTypes } from "./actions";

export class OpenProjectAction implements Action {
  public readonly type = AppActionTypes.OpenProject;

  constructor(public payload: { path: string }) {

  }
}

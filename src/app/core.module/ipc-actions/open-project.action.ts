import { Action } from "@ngrx/store";

export class OpenProjectAction implements Action {
  public static readonly type = "[App] OpenProject";
  public readonly type = OpenProjectAction.type;

  constructor(public payload: { path: string }) {

  }
}

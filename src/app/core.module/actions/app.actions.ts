import {Action} from "@ngrx/store";

export enum AppActionTypes {
  Start = "[Start] Action",
}

export class Start implements Action {
  public readonly type = AppActionTypes.Start;
}

import { Action } from "@ngrx/store";
import { AppActionTypes } from "./actions";

export class Start implements Action {
  public readonly type = AppActionTypes.Start;
}

import { Action } from "@ngrx/store";

export class Message {
  constructor(
    public action: Action,
    public dispatch: (action?: Action) => void) {

  }
}

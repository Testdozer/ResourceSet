import { Action } from "@ngrx/store";
import { KeyCdAction } from "../actions/key.cd.action";
import { KeyUpdateAction } from "../actions/key.update.action";
import { KeysReadSuccessAction } from "../actions/keys.read-success.action";

export function keysReducer(state = [], action: Action): string[] {
  if (action instanceof KeysReadSuccessAction) {
    return [...action.payload.keys];
  }

  if (action instanceof KeyCdAction && action.payload.operator === "create") {
    return [...state, action.payload.key];
  }

  if (action instanceof KeyCdAction && action.payload.operator === "delete") {
    const indexOf = state.indexOf(action.payload.key);
    delete state[indexOf];
    return [...state];
  }

  if (action instanceof KeyUpdateAction) {
    const indexOf = state.indexOf(action.payload.current);
    state[indexOf] = action.payload.updated;
    return [...state];
  }

  return state;
}

import { Action } from "@ngrx/store";
import { LanguageCdAction } from "../actions/language.cd.action";
import { LanguagesReadSuccessAction } from "../actions/languages.read-success.action";

export function languagesReducer(state = [], action: Action): string[] {
  if (action instanceof LanguagesReadSuccessAction) {
    return [...action.payload.languages];
  }

  if (action instanceof LanguageCdAction && action.payload.operator === "create") {
    return [...state, action.payload.language];
  }

  if (action instanceof LanguageCdAction && action.payload.operator === "delete") {
    const indexOf = state.indexOf(action.payload.language);
    delete state[indexOf];
    return [...state];
  }

  return state;
}

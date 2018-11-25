import { ActionReducerMap } from "@ngrx/store";
import { IProjectState } from "../store/project.state";
import { keysReducer } from "./keys.reducer";
import { languagesReducer } from "./languages.reducer";
import { valuesReducer } from "./values.reducer";

export const projectReducerMap: ActionReducerMap<IProjectState> = {
  languages: languagesReducer,
  keys: keysReducer,
  values: valuesReducer
};

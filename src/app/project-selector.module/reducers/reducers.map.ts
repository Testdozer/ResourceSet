import { ActionReducerMap } from "@ngrx/store";
import { IProjectSelectorState } from "../store/project-selector.state";
import { historyReducer } from "./history.reducer";

export const projectSelectorReducerMap: ActionReducerMap<IProjectSelectorState> = {
  history: historyReducer
};

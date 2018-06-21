import { routerReducer, RouterReducerState } from "@ngrx/router-store";
import { ActionReducerMap } from "@ngrx/store";
import { IRouterStateUrl } from "../../shared/custom-router-state-serializer";

export interface IRouterState {
  router: RouterReducerState<IRouterStateUrl>;
}

export const reducers: ActionReducerMap<IRouterState> = {
  router: routerReducer
};

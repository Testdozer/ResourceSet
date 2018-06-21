import { ActionReducer, MetaReducer } from "@ngrx/store";
import { storeFreeze } from "ngrx-store-freeze";
import { environment } from "../../../environments/environment";
import { IRouterState } from "./router.reducer";

export function logger(reducer: ActionReducer<IRouterState>): ActionReducer<IRouterState> {
  return (state: IRouterState, action: any): IRouterState => {
    console.log("state", state);
    console.log("action", action);

    return reducer(state, action);
  };
}

/**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose
 * the root meta-reducer. To add more meta-reducers, provide an array of meta-reducers
 * that will be composed to form the root meta-reducer.
 */
export const metaReducers: MetaReducer<IRouterState>[] = !environment.production
  ? [logger, storeFreeze]
  : [];

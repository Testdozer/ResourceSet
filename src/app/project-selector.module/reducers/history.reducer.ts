import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { AppActionTypes } from "../../core.module/actions/actions";
import { OpenProjectAction } from "../../core.module/actions/open-project.action";
import { DeleteHistoryItem, ProjectSelectorActionTypes } from "../actions/actions";
import { HistoryItem } from "../store/history.item";

const adapter: EntityAdapter<HistoryItem> = createEntityAdapter<HistoryItem>({
  selectId: employee => employee.path,
  sortComparer: false
});

const initialState = adapter.getInitialState();

export function reducer(state = initialState, action: OpenProjectAction | DeleteHistoryItem): EntityState<HistoryItem> {
  if (action.type === AppActionTypes.OpenProject) {
    return adapter.addOne(action.payload, {...state});
  }

  if (action.type === ProjectSelectorActionTypes.DeleteHistoryItem) {
    return adapter.removeOne(action.payload.path, {...state});
  }

  return state;
}

import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { OpenProjectAction } from "../../core.module/actions/open-project.action";
import { DeleteHistoryItemAction } from "../actions/delete-history-item.action";
import { HistoryItem } from "../store/history.item";

const adapter: EntityAdapter<HistoryItem> = createEntityAdapter<HistoryItem>({
  selectId: employee => employee.path,
  sortComparer: false
});

const initialState = adapter.getInitialState();

export function historyReducer(state = initialState, action: OpenProjectAction | DeleteHistoryItemAction): EntityState<HistoryItem> {
  // if (action instanceof OpenProjectAction) {
  //   return adapter.addOne(action.payload, {...state});
  // }

  if (action instanceof DeleteHistoryItemAction) {
    return adapter.removeOne(action.payload.path, {...state});
  }

  return state;
}

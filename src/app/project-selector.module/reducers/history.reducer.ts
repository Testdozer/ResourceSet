import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { OpenProjectAction } from "../../core.module/actions/open-project.action";
import { DeleteHistoryItemAction } from "../actions/delete-history-item.action";
import { HistoryItem } from "../store/history.item";

export const historyItemEntityAdapter: EntityAdapter<HistoryItem> = createEntityAdapter<HistoryItem>({
  selectId: employee => employee.path,
  sortComparer: false
});

const initialState = historyItemEntityAdapter.getInitialState();

export function historyReducer(state = initialState, action: OpenProjectAction | DeleteHistoryItemAction): EntityState<HistoryItem> {
  // if (action instanceof OpenProjectAction) {
  //   return historyItemEntityAdapter.addOne(action.payload, {...state});
  // }

  if (action instanceof DeleteHistoryItemAction) {
    return historyItemEntityAdapter.removeOne(action.payload.path, {...state});
  }

  return state;
}

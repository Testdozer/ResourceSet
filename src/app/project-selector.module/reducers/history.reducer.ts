import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { Action } from "@ngrx/store";
import { AddHistoryItemAction } from "../../core.module/ipc-actions/add-history-item.action";
import { DeleteHistoryItemAction } from "../actions/delete-history-item.action";
import { HistoryItem } from "../store/history.item";

export const historyItemEntityAdapter: EntityAdapter<HistoryItem> = createEntityAdapter<HistoryItem>({
  selectId: historyItem => historyItem.path,
  sortComparer: false
});

const initialState = historyItemEntityAdapter.getInitialState();

export function historyReducer(state = initialState, action: Action): EntityState<HistoryItem> {
  if (action instanceof AddHistoryItemAction) {
    return historyItemEntityAdapter.addOne(action.payload, {...state});
  }

  if (action instanceof DeleteHistoryItemAction) {
    return historyItemEntityAdapter.removeOne(action.payload.path, {...state});
  }

  return state;
}

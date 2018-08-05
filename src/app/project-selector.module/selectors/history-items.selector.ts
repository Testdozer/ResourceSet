import { select } from "@ngrx/store";
import { projectSelectorHistoryProjector } from "../projectors/project-selector.history.projector";
import { historyItemEntityAdapter } from "../reducers/history.reducer";

export const historyItemsSelector = select(historyItemEntityAdapter.getSelectors(projectSelectorHistoryProjector).selectAll);

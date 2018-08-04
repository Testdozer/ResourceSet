import { EntityState } from "@ngrx/entity";
import { HistoryItem } from "./history.item";

export interface IProjectSelectorState {
  history: EntityState<HistoryItem>;
}

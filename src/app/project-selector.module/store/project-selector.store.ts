import { EntityState } from "@ngrx/entity";
import { HistoryItem } from "./history.item";

export interface IProjectSelectorStore {
  history: EntityState<HistoryItem>;
}

import { EntityState } from "@ngrx/entity";
import { ValueItem } from "./value.item";

export interface IProjectState {
  languages: string[];
  keys: string[];
  values: EntityState<ValueItem>;
}

import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";
import { ValueItem } from "../store/value.item";
import { valueItemIdBuilder } from "./value-item.id-builder";

export const valuesEntityAdapter: EntityAdapter<ValueItem> = createEntityAdapter<ValueItem>({
  selectId: item => valueItemIdBuilder(item.language, item.key),
  sortComparer: false
});

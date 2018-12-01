import { createSelector, select } from "@ngrx/store";
import { keysProjector } from "../projectors/keys.projector";
import { languagesProjector } from "../projectors/languages.projector";
import { valuesProjector } from "../projectors/values.projector";
import { valueItemIdBuilder } from "../reducers/value-item.id-builder";
import { valuesEntityAdapter } from "../reducers/values.entity-adapter";
import { RowItem } from "./row-item";

function* projector(languages, keys, values): IterableIterator<RowItem> {
  for (const key of keys) {
    const dictionary = {};
    for (const language of languages) {
      const id = valueItemIdBuilder(language, key);
      dictionary[language] = values[id] ? values[id].value : "";
    }
    yield new RowItem(key, dictionary);
  }
}

export const dataSetSelector = select(createSelector(
  languagesProjector,
  keysProjector,
  valuesEntityAdapter.getSelectors(valuesProjector).selectEntities,
  (languages, keys, values) => [...projector(languages, keys, values)]
));

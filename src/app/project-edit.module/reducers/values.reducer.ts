import { EntityState } from "@ngrx/entity";
import { Action } from "@ngrx/store";
import { KeyCdAction } from "../actions/key.cd.action";
import { KeyUpdateAction } from "../actions/key.update.action";
import { LanguageCdAction } from "../actions/language.cd.action";
import { ValueUpdateAction } from "../actions/value.update.action";
import { ValuesReadSuccessAction } from "../actions/values.read-success.action";
import { ValueItem } from "../store/value.item";
import { valuesEntityAdapter } from "./values.entity-adapter";

const initialState = valuesEntityAdapter.getInitialState();

export function valuesReducer(state = initialState, action: Action): EntityState<ValueItem> {
  if (action instanceof ValuesReadSuccessAction) {
    return valuesEntityAdapter.addAll(action.payload.values, {...state});
  }

  if (action instanceof LanguageCdAction && action.payload.operator === "delete") {
    const {selectAll} = valuesEntityAdapter.getSelectors();
    for (const item of selectAll(state)) {
      if (item.language === action.payload.language) {
        const id = valuesEntityAdapter.selectId(item) as any;
        state = valuesEntityAdapter.removeOne(id, state);
      }
    }

    return state;
  }

  if (action instanceof KeyCdAction && action.payload.operator === "delete") {
    const {selectAll} = valuesEntityAdapter.getSelectors();
    for (const item of selectAll(state)) {
      if (item.key === action.payload.key) {
        const id = valuesEntityAdapter.selectId(item) as any;
        state = valuesEntityAdapter.removeOne(id, state);
      }
    }

    return state;
  }

  if (action instanceof KeyUpdateAction) {
    const {selectAll} = valuesEntityAdapter.getSelectors();
    for (const item of selectAll(state)) {
      if (item.key === action.payload.current) {
        const id = valuesEntityAdapter.selectId(item) as any;
        state = valuesEntityAdapter.updateOne({
          id,
          changes: {
            key: action.payload.updated
          }
        }, state);
      }
    }

    return state;
  }

  if (action instanceof ValueUpdateAction) {
    const id = valuesEntityAdapter.selectId(action.payload.item) as any;
    return valuesEntityAdapter.updateOne({
      id,
      changes: {
        value: action.payload.item.value
      }
    }, state);
  }

  return state;
}

import { Dictionary } from "@ngrx/entity/src/models";
import { cold } from "jasmine-marbles";
import { Mock } from "moq.ts";
import { dataMock } from "../../../unit-tests.components/data-mock";
import { HistoryItem } from "../store/history.item";
import { IProjectSelectorStore } from "../store/project-selector.store";
import { historyItemsSelector } from "./history-items.selector";

describe("History items selector", () => {

  it("Returns item", () => {
    const path = "path to folder";
    const name = "project name";

    const item = dataMock<HistoryItem>({name, path});

    const dictionary = new Mock<Dictionary<HistoryItem>>()
      .setup(instance => instance[path])
      .returns(item)
      .object();

    const store = dataMock<IProjectSelectorStore>({
      projectSelector: {
        history: {
          ids: [path],
          entities: dictionary
        }
      }
    });

    const store$ = cold("a|", {a: store});

    const actual = store$.pipe(historyItemsSelector);
    expect(actual).toBeObservable(cold("a|", {a: [item]}));
  });
});

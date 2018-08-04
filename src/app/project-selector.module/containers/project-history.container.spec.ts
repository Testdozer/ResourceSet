import { Store } from "@ngrx/store";
import { cold } from "jasmine-marbles";
import { Mock } from "moq.ts";
import { createInjector, get, resolve } from "../../../unit-tests.components/mocks/createInjector";
import { Is } from "../../../unit-tests.components/moq/equal";
import { OpenProjectAction } from "../../core.module/actions/open-project.action";
import { DeleteHistoryItemAction } from "../actions/delete-history-item.action";
import { historyItemsSelector } from "../selectors/history-items.selector";
import { HistoryItem } from "../store/history.item";
import { IProjectSelectorStore } from "../store/project-selector.store";
import { ProjectHistoryContainer } from "./project-history.container";
import { ProjectSelectorContainer } from "./project-selector.container";

describe("Project history container", () => {

  beforeEach(() => {
    createInjector(ProjectHistoryContainer);
  });

  it("Should be resolved", () => {
    const actual = get<ProjectSelectorContainer>();
    expect(actual).toEqual(jasmine.any(ProjectHistoryContainer));
  });

  it("Exposes history state", () => {
    const items$ = cold("|");

    resolve<Store<IProjectSelectorStore>>(Store)
      .setup(instance => instance.pipe(historyItemsSelector))
      .returns(items$);

    const component = get<ProjectHistoryContainer>();
    const actual = component.history$;

    expect(actual).toBe(items$);
  });

  it("Dispatches Open Project action", () => {
    const path = "path to folder";
    const item = new Mock<HistoryItem>()
      .setup(instance => instance.path)
      .returns(path)
      .object();

    const component = get<ProjectHistoryContainer>();
    component.openProject(item);

    const expected = new OpenProjectAction({path});
    resolve<Store<any>>(Store)
      .verify(instance => instance.dispatch(Is.Eq(expected)));
  });

  it("Dispatches delete history item action", () => {
    const path = "path to folder";
    const item = new Mock<HistoryItem>()
      .setup(instance => instance.path)
      .returns(path)
      .object();

    const component = get<ProjectHistoryContainer>();
    component.onDelete(item);

    const expected = new DeleteHistoryItemAction({path});
    resolve<Store<any>>(Store)
      .verify(instance => instance.dispatch(Is.Eq(expected)));
  });

  it("Returns path as unique identifier for trackBy function", () => {
    const path = "path to folder";
    const item = new Mock<HistoryItem>()
      .setup(instance => instance.path)
      .returns(path)
      .object();

    const component = get<ProjectHistoryContainer>();
    const actual = component.trackByFn(0, item);

    expect(actual).toBe(path);
  });
});

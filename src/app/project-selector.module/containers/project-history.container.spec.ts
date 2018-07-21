import { Store } from "@ngrx/store";
import { cold } from "jasmine-marbles";
import { createInjector, get, resolve } from "../../../unit-tests.components/mocks/createInjector";
import { Is } from "../../../unit-tests.components/moq/equal";
import { OpenProjectAction } from "../../core.module/actions/open-project.action";
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

  // it("Exposes history state", () => {
  //   const items$ = cold("|");
  //
  //   resolve<Store<IEmployeeExpensesState>>(Store)
  //     .setup(instance => instance.pipe(expenseFilteredEntitiesSelector))
  //     .returns(items$);
  //
  //   const component = get<ProjectHistoryContainer>();
  //   const actual = component.history$;
  //
  //   expect(actual).toBe(items$);
  // });

  it("Dispatches Open Project action", () => {
    const path = "path to folder";

    const component = get<ProjectHistoryContainer>();
    component.openProject({path});

    const expected = new OpenProjectAction({path});
    resolve<Store<any>>(Store)
      .verify(instance => instance.dispatch(Is.Eq(expected)));
  });
});

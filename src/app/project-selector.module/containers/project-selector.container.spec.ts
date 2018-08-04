import { Store } from "@ngrx/store";
import { createInjector, get, resolve } from "../../../unit-tests.components/mocks/createInjector";
import { Is } from "../../../unit-tests.components/moq/equal";
import { SelectFolderAction } from "../actions/select-folder.action";
import { ProjectSelectorContainer } from "./project-selector.container";

describe("Project selector container", () => {

  beforeEach(() => {
    createInjector(ProjectSelectorContainer);
  });

  it("Should be resolved", () => {
    const actual = get<ProjectSelectorContainer>();
    expect(actual).toEqual(jasmine.any(ProjectSelectorContainer));
  });

  it("Dispatches select folder action", () => {
    const component = get<ProjectSelectorContainer>();
    component.selectFolder();

    const expected = new SelectFolderAction();
    resolve<Store<any>>(Store)
      .verify(instance => instance.dispatch(Is.Eq(expected)));
  });
});

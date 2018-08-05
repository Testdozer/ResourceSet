import { Actions } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { cold } from "jasmine-marbles";
import { createInjector, get, resolve } from "../../../unit-tests.components/mocks/createInjector";
import { OpenProjectAction } from "../../core.module/actions/open-project.action";
import { AddHistoryItemAction } from "../actions/add-history-item.action";
import { ProjectNameProvider } from "./../../core.module/services/project-name.provider";
import { AddHistoryItemEffect } from "./add-history-item.effect";

describe("Add history item effect", () => {

  beforeEach(() => {
    createInjector(AddHistoryItemEffect);
  });

  it("Should be resolved", () => {
    const actual = get<AddHistoryItemEffect>();
    expect(actual).toEqual(jasmine.any(AddHistoryItemEffect));
  });

  it("Dispatches add history item on open project action", () => {

    const path = "path to folder";
    const name = "project name";
    const actions$ = cold("a", {a: new OpenProjectAction({path})});

    resolve<Actions>(Actions)
      .setup(instance => instance.pipe)
      .returns(actions$.pipe.bind(actions$));

    resolve<ProjectNameProvider>(ProjectNameProvider)
      .setup(instance => instance.get(path))
      .returns(cold("a|", {a: name}));

    const effect = get<AddHistoryItemEffect>();
    expect(effect.onOpenProject$()).toBeObservable(cold("a", {a: new AddHistoryItemAction({name, path})}));
  });
});

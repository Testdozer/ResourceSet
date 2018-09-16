import { Actions } from "@ngrx/effects";
import { cold } from "jasmine-marbles";
import { createInjector, get, resolve } from "../../../unit-tests.components/mocks/createInjector";
import { OpenProjectAction } from "../../core.module/ipc-actions/open-project.action";
import { SelectFolderService } from "../../core.module/services/select-folder.service";
import { SelectFolderAction } from "../actions/select-folder.action";
import { SelectFolderEffect } from "./select-folder.effect";

describe("Select folder effect", () => {

  beforeEach(() => {
    createInjector(SelectFolderEffect);
  });

  it("Should be resolved", () => {
    const actual = get<SelectFolderEffect>();
    expect(actual).toEqual(jasmine.any(SelectFolderEffect));
  });

  it("Dispatches open project path when a folder has been selected", () => {

    const path = "path to folder";
    const actions$ = cold("a", {a: new SelectFolderAction()});

    resolve<Actions>(Actions)
      .setup(instance => instance.pipe)
      .returns(actions$.pipe.bind(actions$));

    resolve<SelectFolderService>(SelectFolderService)
      .setup(instance => instance.select())
      .returns(cold("a|", {a: path}));

    const effect = get<SelectFolderEffect>();
    expect(effect.onSelectFolder$()).toBeObservable(cold("a", {a: new OpenProjectAction({path})}));
  });

  it("Does not dispatch any actions when folder has not been selected", () => {

    const actions$ = cold("a", {a: new SelectFolderAction()});

    resolve<Actions>(Actions)
      .setup(instance => instance.pipe)
      .returns(actions$.pipe.bind(actions$));

    resolve<SelectFolderService>(SelectFolderService)
      .setup(instance => instance.select())
      .returns(cold("|"));

    const effect = get<SelectFolderEffect>();
    expect(effect.onSelectFolder$()).toBeObservable(cold(""));
  });
});

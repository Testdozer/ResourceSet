import { Actions } from "@ngrx/effects";
import { cold } from "jasmine-marbles";
import { createInjector, get, resolve } from "../../../../unit-tests.components/mocks/createInjector";
import { OpenProjectAction } from "../../actions/open-project.action";
import { Navigation } from "../../services/navigation.service";
import { OpenProjectEffect } from "./open-project.effect";

describe("Open project effect", () => {

  beforeEach(() => {
    createInjector(OpenProjectEffect);
  });

  it("Should be resolved", () => {
    const actual = get<OpenProjectEffect>();
    expect(actual).toEqual(jasmine.any(OpenProjectEffect));
  });

  it("Navigates to the project screen", () => {

    const path = "path";
    const actions$ = cold("a", {a: new OpenProjectAction({path})});

    resolve<Actions>(Actions)
      .setup(instance => instance.pipe)
      .returns(actions$.pipe.bind(actions$));

    const effect = get<OpenProjectEffect>();

    expect(effect.onOpenProject$()).toBeObservable(cold("a", {a: new OpenProjectAction({path})}));
    resolve<Navigation>(Navigation)
      .verify(instance => instance.toProject());
  });
});

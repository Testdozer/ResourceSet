import { Actions } from "@ngrx/effects";
import { cold } from "jasmine-marbles";
import { createInjector, get, resolve } from "../../../../unit-tests.components/mocks/createInjector";
import { StartAction } from "../../actions/start.action";
import { Navigation } from "../../services/navigation.service";
import { StartUpEffect } from "./start-up.effect";

describe("Start up effect", () => {

  beforeEach(() => {
    createInjector(StartUpEffect);
  });

  it("Should be resolved", () => {
    const actual = get<StartUpEffect>();
    expect(actual).toEqual(jasmine.any(StartUpEffect));
  });

  it("Navigates to the project selector screen", () => {

    const actions$ = cold("a", {a: new StartAction()});

    resolve<Actions>(Actions)
      .setup(instance => instance.pipe)
      .returns(actions$.pipe.bind(actions$));

    const effect = get<StartUpEffect>();

    expect(effect.onStartUp$()).toBeObservable(cold("a", {a: new StartAction()}));
    resolve<Navigation>(Navigation)
      .verify(instance => instance.toProjectSelector());
  });
});

import { createInjector, get } from "../../../unit-tests.components/mocks/createInjector";
import { SelectFolderEffect } from "./select-folder.effect";

describe("Select folder effect", () => {

  beforeEach(() => {
    createInjector(SelectFolderEffect);
  });

  it("Should be resolved", () => {
    const actual = get<SelectFolderEffect>();
    expect(actual).toEqual(jasmine.any(SelectFolderEffect));
  });

  // it("Navigates to the project selector screen", () => {
  //
  //   const actions$ = cold("a", {a: new Start()});
  //
  //   resolve<Actions>(Actions)
  //     .setup(instance => instance.pipe)
  //     .returns(actions$.pipe.bind(actions$));
  //
  //   const effect = get<StartUpEffect>();
  //
  //   expect(effect.onStartUp$()).toBeObservable(cold("a", {a: new Start()}));
  //   resolve<Navigation>(Navigation)
  //     .verify(instance => instance.toProjectSelector());
  // });
});

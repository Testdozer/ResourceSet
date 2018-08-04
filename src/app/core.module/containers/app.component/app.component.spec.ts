import { Store } from "@ngrx/store";
import { TranslateService } from "@ngx-translate/core";
import { createInjector, get, resolve } from "../../../../unit-tests.components/mocks/createInjector";
import { Is } from "../../../../unit-tests.components/moq/equal";
import { StartAction } from "../../actions/start.action";
import { IRouterState } from "../../reducers/router.reducer";
import { AppComponent } from "./app.component";

describe("App container", () => {

  beforeEach(() => {
    createInjector(AppComponent);
  });

  it("Should be resolved", () => {
    const actual = get<AppComponent>();
    expect(actual).toEqual(jasmine.any(AppComponent));
  });

  it("Sets EN as default language for UI", () => {
    const component = get<AppComponent>();

    resolve<TranslateService>(TranslateService)
      .verify(instance => instance.setDefaultLang("en"));
  });

  it("Dispatches start up action", () => {
    const component = get<AppComponent>();

    const expected = new StartAction();
    resolve<Store<IRouterState>>(Store)
      .verify(instance => instance.dispatch(Is.Eq(expected)));
  });
});

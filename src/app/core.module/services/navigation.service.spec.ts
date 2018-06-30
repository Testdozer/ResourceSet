import { Router } from "@angular/router";
import { createInjector, get, resolve } from "../../../unit-tests.components/mocks/createInjector";
import { Is } from "../../../unit-tests.components/moq/equal";
import { PROJECT_SELECTOR } from "../../app-routing.module";
import { Navigation } from "./navigation.service";

describe("Navigation service", () => {

  beforeEach(() => {
    createInjector(Navigation);
  });

  it("Should be resolved", () => {
    const actual = get<Navigation>();
    expect(actual).toEqual(jasmine.any(Navigation));
  });

  it("Navigates to the project selector", () => {
    const service = get<Navigation>();
    service.toProjectSelector();

    resolve<Router>(Router)
      .verify(instance => instance.navigate(Is.Eq(["/", PROJECT_SELECTOR])));
  });
});

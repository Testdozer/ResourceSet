import { Injectable } from "@angular/core";
import { Actions } from "@ngrx/effects";
import { Times } from "moq.ts";
import { IMockedObject } from "../moq/moq";
import { createInjector } from "./createInjector";

describe("Mock injector", () => {
  class Dependency {

  }

  /* tslint:disable:max-classes-per-file */
  @Injectable()
  class Resolvable {
    constructor(public dependency: Dependency) {
    }
  }

  /* tslint:enable:max-classes-per-file */

  it("Resolves a component without dependencies", () => {
    /* tslint:disable:max-classes-per-file */
    @Injectable()
    class EmptyResolvable {
    }

    /* tslint:enable:max-classes-per-file */

    const injector = createInjector(EmptyResolvable);

    const actual = injector.get(EmptyResolvable);

    expect(actual).toEqual(jasmine.any(EmptyResolvable));
  });

  it("Resolves a component with a dependency", () => {
    const injector = createInjector(Resolvable);

    const actual = injector.get(Resolvable) as Resolvable;

    expect(actual).toEqual(jasmine.any(Resolvable));
  });

  it("Mocks dependency with moq.ts mocks", () => {
    const injector = createInjector(Resolvable);

    const actual = injector.get(Resolvable) as Resolvable;

    const mockedDependency = (actual.dependency as IMockedObject<Dependency>).mock;
    expect(mockedDependency.name).toEqual(Dependency.name);
  });

  it("Mocks dependency with providers", () => {
    const expected = new Dependency();

    const injector = createInjector(Resolvable, [{provide: Dependency, useValue: expected}]);

    const actual = (injector.get(Resolvable) as Resolvable).dependency;

    expect(expected).toEqual(actual);
  });

  it("Mocks dependency as singleton", () => {
    const injector = createInjector(Resolvable);

    const actual = injector.get(Resolvable) as Resolvable;
    const dependency = injector.get(Dependency);
    (dependency as () => void)();

    const mockedObject = (actual.dependency as IMockedObject<Dependency>);
    mockedObject.mock.verify((instance: () => void) => instance(), Times.Once());
  });
});

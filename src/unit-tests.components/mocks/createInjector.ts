import { Injector } from "@angular/core";
import { InjectionToken } from "@angular/core/src/di/injection_token";
import { StaticProvider } from "@angular/core/src/di/provider";
import { constructDependencies, ReflectiveDependency } from "@angular/core/src/di/reflective_provider";
import { IMock } from "moq.ts";
import { LooseMock } from "../moq/loose-mock";
import { IMockedObject } from "../moq/moq";

export let injector: Injector;
export let testedToken: any;

export function createInjector(constructor: any, additionalProviders: StaticProvider[] = []): Injector {

  testedToken = constructor;
  const constructorStaticProvider = {provide: testedToken, useClass: constructor, deps: []};
  const providers = [constructorStaticProvider] as any[];
  const dependencies = constructDependencies(constructor, undefined);
  dependencies.forEach((dependency: ReflectiveDependency) => {
    const keyDisplayName = dependency.key.displayName;
    const mock = new LooseMock<any>(keyDisplayName);
    const provider = {provide: dependency.key.token, useValue: mock.object()};
    providers.push(provider);
    constructorStaticProvider.deps.push(dependency.key.token);
  });
  injector = Injector.create({providers: [...providers, ...additionalProviders]});
  return injector;
}

export function resolve<T>(token: any): IMock<T> {
  const object = injector.get(token as any as InjectionToken<T>);
  return (object as any as IMockedObject<T>).mock;
}

export function get<T>(): T {
  return injector.get(testedToken  as any as InjectionToken<T>);
}

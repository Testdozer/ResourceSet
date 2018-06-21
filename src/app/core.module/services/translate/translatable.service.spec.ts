import { TranslateService } from "@ngx-translate/core";
import { cold } from "jasmine-marbles";
import { createInjector, get, resolve } from "../../../../unit-tests.components/mocks/createInjector";
import { StrictMock } from "../../../../unit-tests.components/moq/strict-mock";
import { ITranslatable } from "../../../shared/translate/translatable";
import { TranslatableService } from "./translatable.service";

describe("Translate service for translatable", () => {

  beforeEach(() => {
    createInjector(TranslatableService);
  });

  it("Should be resolved", () => {
    const actual = get<TranslatableService>();
    expect(actual).toEqual(jasmine.any(TranslatableService));
  });

  it("Translates async a translatable", () => {
    const key = "key";
    const translated = "translated";
    const params = [];

    const translatable = new StrictMock<ITranslatable>()
      .setup(instance => instance.key)
      .returns(key)
      .setup(instance => instance.params)
      .returns(params)
      .object();

    resolve<TranslateService>(TranslateService)
      .setup(instance => instance.get(key, params))
      .returns(cold("s|", {s: translated}));

    const service = get<TranslatableService>();
    const actual = service.get(translatable);

    expect(actual).toBeObservable(cold("c|", {c: translated}));
  });

  it("Translates async a string", () => {
    const key = "key";
    const translated = "translated";

    resolve<TranslateService>(TranslateService)
      .setup(instance => instance.get(key, undefined))
      .returns(cold("s", {s: translated}));

    const service = get<TranslatableService>();
    const actual = service.get(key);

    expect(actual).toBeObservable(cold("c", {c: translated}));
  });

  it("Translates async array of translatable and string", () => {
    const key1 = "key1";
    const key2 = "key2";
    const translated1 = "translated1";
    const translated2 = "translated2";
    const params = [];

    const translatable1 = new StrictMock<ITranslatable>()
      .setup(instance => instance.key)
      .returns(key1)
      .setup(instance => instance.params)
      .returns(params)
      .object();

    resolve<TranslateService>(TranslateService)
      .setup(instance => instance.get(key1, params))
      .returns(cold("s|", {s: translated1}))
      .setup(instance => instance.get(key2, undefined))
      .returns(cold("-s|", {s: translated2}));

    const service = get<TranslatableService>();
    const actual = service.get(translatable1, key2);

    expect(actual).toBeObservable(cold("cs|", {c: translated1, s: translated2}));
  });
});

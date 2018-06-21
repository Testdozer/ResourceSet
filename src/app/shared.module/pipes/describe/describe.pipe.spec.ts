import { cold } from "jasmine-marbles";
import { createInjector, get, resolve } from "../../../../unit-tests.components/mocks/createInjector";
import { DescriptionProvider } from "../../../core.module/services/description.provider/description.provider";
import { TranslatableService } from "../../../core.module/services/translate/translatable.service";
import { DescribePipe } from "./describe.pipe";

describe("Describe pipe", () => {

  beforeEach(() => {
    createInjector(DescribePipe);
  });

  it("Should be resolved", () => {
    const actual = get<DescribePipe>();
    expect(actual).toEqual(jasmine.any(DescribePipe));
  });

  it("Returns translated description", () => {
    const description = "description";
    const translatable = {key: "key"};
    const value = {};
    const observable = cold("s|", {s: value});

    resolve<DescriptionProvider>(DescriptionProvider)
      .setup(instance => instance.get(value))
      .returns(translatable);
    resolve<TranslatableService>(TranslatableService)
      .setup(instance => instance.get(translatable))
      .returns(cold("s|", {s: description}));

    const pipe = get<DescribePipe>();
    const actual = pipe.transform(observable);

    expect(actual).toBeObservable(cold("c|", {c: description}));
  });

  it("Returns value when value does not have a description", () => {
    const value = {};
    const observable = cold("s|", {s: value});

    resolve<DescriptionProvider>(DescriptionProvider)
      .setup(instance => instance.get(value))
      .returns(undefined);

    const pipe = get<DescribePipe>();
    const actual = pipe.transform(observable);

    expect(actual).toBeObservable(cold("c|", {c: value}));
  });
});

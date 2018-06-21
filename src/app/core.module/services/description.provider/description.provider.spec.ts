import { createInjector, get } from "../../../../unit-tests.components/mocks/createInjector";
import { REGISTERED_DESCRIPTIONS } from "../../../shared/descriptable/descriptions.registration";
import { DescriptionProvider } from "./description.provider";

describe("Description provider", () => {

  beforeEach(() => {
    createInjector(DescriptionProvider);
    REGISTERED_DESCRIPTIONS.splice(0, REGISTERED_DESCRIPTIONS.length);
  });

  afterAll(() => {
    REGISTERED_DESCRIPTIONS.splice(0, REGISTERED_DESCRIPTIONS.length);
  });

  it("Should be resolved", () => {
    const actual = get<DescriptionProvider>();
    expect(actual).toEqual(jasmine.any(DescriptionProvider));
  });

  it("Returns translatable for classes when description key is a string", () => {
    class Test {
    }

    const description = "key";
    REGISTERED_DESCRIPTIONS.push({object: Test, description});

    const provider = get<DescriptionProvider>();
    const test = new Test();
    const actual = provider.get(test);

    expect(actual).toEqual({key: description, params: test});
  });

  it("Returns translatable for classes when description key is a description factory", () => {
    const value = "value";

    class Test {
      public value = value;
    }

    const description = (instance: Test) => {
      return {key: instance.value};
    };

    REGISTERED_DESCRIPTIONS.push({object: Test, description});

    const provider = get<DescriptionProvider>();
    const test = new Test();
    const actual = provider.get(test);

    expect(actual).toEqual({key: value});
  });

  it("Returns translatable for object when description key is a string", () => {
    class Test {
    }

    const test = new Test();
    const description = "key";

    REGISTERED_DESCRIPTIONS.push({object: test, description});
    const provider = get<DescriptionProvider>();
    const actual = provider.get(test);

    expect(actual).toEqual({key: description, params: test});
  });

  it("Returns translatable for object when description key is a description factory", () => {
    const value = "value";

    class Test {
      public value = value;
    }

    const test = new Test();

    const description = (instance: Test) => {
      return {key: instance.value};
    };

    REGISTERED_DESCRIPTIONS.push({object: test, description});
    const provider = get<DescriptionProvider>();
    const actual = provider.get(test);

    expect(actual).toEqual({key: value});
  });

  it("Returns undefined when there is no registered description", () => {
    const provider = get<DescriptionProvider>();
    const actual = provider.get({});

    expect(actual).toBeUndefined();
  });
});

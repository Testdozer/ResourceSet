import { AsDescriptable } from "./descriptable.decorator";
import { REGISTERED_DESCRIPTIONS } from "./descriptions.registration";

describe("Desctiptable decorator", () => {

  it("Registers a translation key", () => {
    class Test {
    }

    const description = "translation key";

    AsDescriptable(description)(Test);

    expect(REGISTERED_DESCRIPTIONS).toContain({object: Test, description});
  });

  it("Registers a description provider", () => {
    class Test {
    }

    const description = (instance: Test) => {
      return {key: "translation key"};
    };

    AsDescriptable<Test>(description)(Test);

    expect(REGISTERED_DESCRIPTIONS).toContain({object: Test, description});
  });
});

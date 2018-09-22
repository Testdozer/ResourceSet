import { Action } from "@ngrx/store";
import { createInjector, get } from "../../../../unit-tests.components/mocks/createInjector";
import { add, clear } from "../../../shared/serializable-actions/serializable-actions.registration";
import { SerializableActionDeserializer } from "./serializable-action.deserializer";

describe("Bad request mapper", () => {

  beforeEach(() => {
    createInjector(SerializableActionDeserializer);
    clear();
  });

  afterAll(() => {
    clear();
  });

  it("Should be resolved", () => {
    const actual = get<SerializableActionDeserializer>();
    expect(actual).toEqual(jasmine.any(SerializableActionDeserializer));
  });

  it("Returns instance of mapped type", () => {
    class TestAction implements Action {
      public static type = "[UnitTests] Test action";
      public readonly type = TestAction.type;

      constructor(public payload: { name: string }) {

      }
    }

    add(TestAction, TestAction.type);

    const provider = get<SerializableActionDeserializer>();
    const actual = provider.deserialize({type: TestAction.type});

    expect(actual).toEqual(jasmine.any(TestAction));
  });

  it("Throws exception when action has not found", () => {
    // const badRequestKey = "key";
    //
    // const provider = get<SerializableActionDeserializer>();
    // const actual = provider.deserialize(badRequestKey);
    //
    // expect(actual).toEqual(new SerializableActionDeserializer());
  });
});

import { Action } from "@ngrx/store";
import { createInjector, get } from "../../../../unit-tests.components/mocks/createInjector";
import { add, clear } from "../../../shared/serializable-actions/serializable-actions.registration";
import { SerializableActionDeserializer } from "./serializable-action.deserializer";
import { SerializableActionException } from "./serializable-action.exception";

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
    const name = "name";

    class TestAction implements Action {
      public static type = "[UnitTests] Test action";
      public readonly type = TestAction.type;

      constructor(public payload: { name: string }) {

      }
    }

    add(TestAction, TestAction.type);

    const deserializer = get<SerializableActionDeserializer>();
    const actual = deserializer.deserialize({type: TestAction.type, payload: {name}});

    const expected = new TestAction({name});
    expect(actual).toEqual(expected);
  });

  it("Throws exception when action has not found", () => {
    const provider = get<SerializableActionDeserializer>();
    let actual;
    try {
      provider.deserialize({type: "action key"});
    } catch (e) {
      actual = e;
    }

    expect(actual).toEqual(new SerializableActionException());
  });
});

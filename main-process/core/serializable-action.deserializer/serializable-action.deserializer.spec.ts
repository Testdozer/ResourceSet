import { createInjector, get } from "../../../../unit-tests.components/mocks/createInjector";
import { add, clear } from "../../../shared/map-to-bad-requests/map-to-bad-request.registrations";
import { UnspecifiedBadRequestError } from "../../errors/unspecified-bad-request.error";
import { SerializableActionSerializer } from "./bad-request.mapper";

describe("Bad request mapper", () => {

  beforeEach(() => {
    createInjector(SerializableActionSerializer);
    clear();
  });

  afterAll(() => {
    clear();
  });

  it("Should be resolved", () => {
    const actual = get<SerializableActionSerializer>();
    expect(actual).toEqual(jasmine.any(SerializableActionSerializer));
  });

  it("Returns instance of mapped type", () => {
    class Test {
    }

    const badRequestKey = "key";
    add(Test, badRequestKey);

    const provider = get<SerializableActionSerializer>();
    const actual = provider.get(badRequestKey);

    expect(actual).toEqual(jasmine.any(Test));
  });

  it("Returns common bad request error when map is not registered", () => {
    const badRequestKey = "key";

    const provider = get<SerializableActionSerializer>();
    const actual = provider.get(badRequestKey);

    expect(actual).toEqual(new UnspecifiedBadRequestError());
  });
});

import {Mock} from "moq.ts";
import {IMockedObject} from "./moq";

export class MockedObjectMock<T> extends Mock<T> {
    constructor(name?: string) {
        super(name);
        this.setup(instance => (instance as any as IMockedObject<T>).mock).returns(this);
    }
}

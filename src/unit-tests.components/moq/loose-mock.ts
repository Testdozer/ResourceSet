import { MockBehavior } from "moq.ts";
import {MockedObjectMock} from "./mocked-object.mock";

export class LooseMock<T> extends MockedObjectMock<T> {
    constructor(name?: string) {
        super(name);
        this.setBehaviorStrategy(MockBehavior.Loose);
    }
}

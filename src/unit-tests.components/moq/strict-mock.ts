import {MockedObjectMock} from "./mocked-object.mock";

export class StrictMock<T> extends MockedObjectMock<T> {
    constructor(name?: string) {
        super(name);
    }
}

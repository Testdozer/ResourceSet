import {IMock} from "moq.ts";

export interface IMockedObject<T> {
    mock: IMock<T>;
}

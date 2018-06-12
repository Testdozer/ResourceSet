import { IMock, It, NamedMethodExpression } from "moq.ts";
import { Observable } from "rxjs";

export function setupPipe<T>(mock: IMock<Observable<T>>, mapTo: Observable<T>) {
  mock
    .setup(instance => It.Is((call: NamedMethodExpression) => call.name === "pipe" && call.arguments.length > 0))
    .callback((...args) => mapTo.pipe.apply(mapTo, args));
}
